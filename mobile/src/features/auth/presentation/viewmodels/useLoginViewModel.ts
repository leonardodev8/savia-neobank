/**
  Login view model. Owns the authentication flow and exposes a flat, screen-shaped object
  The screen uses this directly and does not interact with use cases, repositories, or navigation
**/
import { useRouter } from "expo-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AppError, ErrorCodes } from "@/core/errors/AppError";
import { Routes } from "@/core/navigation/routes";
import { useAuthStore } from "@/store/authStore";
import { authRepository } from "@/features/auth/data/repositories/auth.repository";
import { biometricAuthenticator } from "@/features/auth/data/sources/biometric.source";
import { makeBiometricLoginUseCase } from "@/features/auth/domain/usecases/biometricLogin.usecase";
import type { BiometricKind } from "@/features/auth/domain/repositories/IBiometricAuthenticator";
import type { Session } from "@/features/auth/domain/entities/Session";

// Remembered returning user shown before re-authentication
// TODO: Load from MMKV cache after login
const REMEMBERED_USER = {
  initials: "LB",
  fullName: "Leonardo Buleje",
  maskedAccount: "**** **** 4821",
} as const;

// Label and hint per biometric type (Spanish)
const BIOMETRIC_COPY: Record<BiometricKind, { label: string; hint: string }> = {
  facial: { label: "Face ID", hint: "Mira tu teléfono para continuar" },
  fingerprint: { label: "huella", hint: "Apoya tu dedo para continuar" },
  iris: { label: "iris", hint: "Mira tu teléfono para continuar" },
  none: { label: "biometría", hint: "Usa tu código de 6 dígitos" },
};

export type LoginBiometric = {
  kind: BiometricKind;
  // True if the device has and can use biometrics
  available: boolean;
  // "Ingresar con Face ID"
  actionText: string;
  // "Mira tu teléfono para continuar"
  hint: string;
};

export type LoginViewModel = {
  user: typeof REMEMBERED_USER;
  biometric: LoginBiometric;
  isAuthenticating: boolean;
  error: AppError | null;
  onBiometricPress: () => void;
  onUseCodePress: () => void;
};

const biometricLogin = makeBiometricLoginUseCase(
  biometricAuthenticator,
  authRepository,
);

export const useLoginViewModel = (): LoginViewModel => {
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);

  // Read the device's biometric support once; it won't change this session
  const capability = useQuery({
    queryKey: ["auth", "biometric-capability"],
    queryFn: () => biometricAuthenticator.getCapability(),
    staleTime: Infinity,
  });

  const biometricMutation = useMutation<Session, AppError, void>({
    mutationFn: async () => {
      try {
        return await biometricLogin();
      } catch (err) {
        throw AppError.from(err);
      }
    },
    onSuccess: (session) => signIn(session),
  });

  const kind = capability.data?.kind ?? "facial";
  const copy = BIOMETRIC_COPY[kind];
  // Assume available until the check finishes, so the button doesn't flash disabled
  const available = capability.data
    ? capability.data.hasHardware && capability.data.isEnrolled
    : true;

  // Ignore user cancellation and never surface it as an error
  const rawError = biometricMutation.error;
  const error =
    rawError && rawError.code !== ErrorCodes.Cancelled ? rawError : null;

  return {
    user: REMEMBERED_USER,
    biometric: {
      kind,
      available,
      actionText: `Ingresar con ${copy.label}`,
      hint: copy.hint,
    },
    isAuthenticating: biometricMutation.isPending,
    error,
    onBiometricPress: () => biometricMutation.mutate(),
    onUseCodePress: () => router.push(Routes.code),
  };
};
