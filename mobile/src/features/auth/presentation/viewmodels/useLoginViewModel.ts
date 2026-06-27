/**
  Login view model. Owns the authentication flow and exposes a flat, screen-shaped object
  The screen uses this directly and does not interact with use cases, repositories, or navigation
**/
import { useMutation } from "@tanstack/react-query";
import { AppError } from "@/core/errors/AppError";
import { useAuthStore } from "@/store/authStore";
import { authRepository } from "../../data/repositories/auth.repository";
import { makeLoginUseCase } from "../../domain/usecases/login.usecase";
import type { LoginInput } from "../../domain/usecases/login.usecase";
import type { Session } from "../../domain/entities/Session";

// Remembered returning user shown before re-authentication
// TODO: Load from MMKV cache after login
const REMEMBERED_USER = {
  initials: "LB",
  fullName: "Leonardo Buleje",
  maskedAccount: "**** **** 4821",
} as const;

export type LoginViewModel = {
  user: typeof REMEMBERED_USER;
  isAuthenticating: boolean;
  error: AppError | null;
  onBiometricPress: () => void;
  onUseCodePress: () => void;
};

const login = makeLoginUseCase(authRepository);

export const useLoginViewModel = (): LoginViewModel => {
  const signIn = useAuthStore((s) => s.signIn);

  const mutation = useMutation<Session, AppError, LoginInput | undefined>({
    mutationFn: async (input) => {
      try {
        return await login(input);
      } catch (err) {
        throw AppError.from(err);
      }
    },
    onSuccess: (session) => signIn(session),
  });

  const authenticate = () => mutation.mutate(undefined);

  return {
    user: REMEMBERED_USER,
    isAuthenticating: mutation.isPending,
    error: mutation.error,
    onBiometricPress: authenticate,
    onUseCodePress: authenticate,
  };
};
