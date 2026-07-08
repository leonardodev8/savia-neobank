/**
  Handles the 6-digit code fallback: collects digits, verifies them with the server, and runs the lockout countdown.

  SECURITY:
  - The code stays in memory only. It's wiped after each try and when the app goes to the background, never saved or logged
  - We never check the code here; the server does.Attempts left and lockout time come from the server's response
**/
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { AppError, ErrorCodes } from "@/core/errors/AppError";
import { useAuthStore } from "@/store/authStore";
import { authRepository } from "@/features/auth/data/repositories/auth.repository";
import { makeLoginUseCase } from "@/features/auth/domain/usecases/login.usecase";
import type { Session } from "@/features/auth/domain/entities/Session";

const CODE_LENGTH = 6;

const login = makeLoginUseCase(authRepository);

// Seconds to "m:ss" (90 -> "1:30")
const formatCountdown = (totalSeconds: number): string => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

// Build the error text, showing remaining attempts when the server sends them
const messageForError = (error: AppError): string => {
  const remaining = (error.meta as { remainingAttempts?: number } | undefined)
    ?.remainingAttempts;
  if (error.code === ErrorCodes.Unauthorized && typeof remaining === "number") {
    return remaining === 1
      ? "Código incorrecto · te queda 1 intento"
      : `Código incorrecto · te quedan ${remaining} intentos`;
  }
  return error.message;
};

export type CodeViewModel = {
  filled: number;
  maxLength: number;
  isVerifying: boolean;
  isLocked: boolean;
  hasError: boolean;
  errorMessage: string | null;
  onKeyPress: (digit: string) => void;
  onDelete: () => void;
  onBiometricPress: () => void;
  onBack: () => void;
  // Wipes the code; called by the screen when the app backgrounds
  clear: () => void;
};

export const useCodeViewModel = (): CodeViewModel => {
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);

  const [code, setCode] = useState("");
  const [lockedUntil, setLockedUntil] = useState(0);
  const [now, setNow] = useState(() => Date.now());

  // Makes sure each completed code is only submitted once
  const lastSubmitted = useRef<string | null>(null);

  const { mutate, reset, isPending, error } = useMutation<
    Session,
    AppError,
    { code: string }
  >({
    mutationFn: async (vars) => {
      try {
        return await login({ code: vars.code });
      } catch (err) {
        throw AppError.from(err);
      }
    },
    onSuccess: (session) => signIn(session),
    onError: (err) => {
      if (err.code === ErrorCodes.TooManyAttempts) {
        const retryAtMs = (err.meta as { retryAtMs?: number } | undefined)
          ?.retryAtMs;
        setLockedUntil(typeof retryAtMs === "number" ? retryAtMs : Date.now());
      }
      // Clear the code after a failed attempt
      lastSubmitted.current = null;
      setCode("");
    },
  });

  // Submit automatically once all 6 digits are entered
  useEffect(() => {
    if (code.length === CODE_LENGTH && lastSubmitted.current !== code) {
      lastSubmitted.current = code;
      mutate({ code });
    }
  }, [code, mutate]);

  // Run the countdown; unlock and clear the old error when time is up
  useEffect(() => {
    if (lockedUntil === 0) return;
    const id = setInterval(() => {
      if (Date.now() >= lockedUntil) {
        setLockedUntil(0);
        reset();
      }
      setNow(Date.now());
    }, 250);
    return () => clearInterval(id);
  }, [lockedUntil, reset]);

  const lockedSeconds =
    lockedUntil > now ? Math.ceil((lockedUntil - now) / 1000) : 0;
  const isLocked = lockedSeconds > 0;

  const errorMessage = isLocked
    ? `Demasiados intentos. Inténtalo en ${formatCountdown(lockedSeconds)}`
    : error
      ? messageForError(error)
      : null;

  const clear = () => {
    lastSubmitted.current = null;
    setCode("");
  };

  const dismissError = () => {
    if (error) reset();
  };

  const onKeyPress = (digit: string) => {
    if (isLocked || isPending) return;
    dismissError();
    setCode((prev) => (prev.length >= CODE_LENGTH ? prev : prev + digit));
  };

  const onDelete = () => {
    if (isLocked || isPending) return;
    dismissError();
    setCode((prev) => prev.slice(0, -1));
  };

  // Both go back to the biometric (Face ID) screen
  const onBiometricPress = () => router.back();
  const onBack = () => router.back();

  return {
    filled: code.length,
    maxLength: CODE_LENGTH,
    isVerifying: isPending,
    isLocked,
    hasError: !!errorMessage,
    errorMessage,
    onKeyPress,
    onDelete,
    onBiometricPress,
    onBack,
    clear,
  };
};
