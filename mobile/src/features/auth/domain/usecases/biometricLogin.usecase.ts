/**
  First checks the biometric prompt, then unlocks the session if it passes
**/
import { AppError, ErrorCodes } from "@/core/errors/AppError";
import type {
  BiometricFailure,
  IBiometricAuthenticator,
} from "../repositories/IBiometricAuthenticator";
import type { IAuthRepository } from "../repositories/IAuthRepository";
import type { Session } from "../entities/Session";

export type BiometricLoginOutput = Session;

const PROMPT = {
  promptMessage: "Ingresa a Savia",
  cancelLabel: "Cancelar",
} as const;

// Map a biometric failure to an AppError, "cancelled" has its own code so the UI can ignore
const toAppError = (reason: BiometricFailure): AppError => {
  switch (reason) {
    case "cancelled":
      return new AppError({
        code: ErrorCodes.Cancelled,
        message: "Autenticación cancelada",
        i18nKey: "auth.errors.biometric_cancelled",
      });
    case "lockout":
      return new AppError({
        code: ErrorCodes.Biometric,
        message: "Demasiados intentos. Usa tu código de 6 dígitos",
        i18nKey: "auth.errors.biometric_lockout",
      });
    default:
      return new AppError({
        code: ErrorCodes.Biometric,
        message: "No pudimos verificar tu identidad. Inténtalo de nuevo",
        i18nKey: "auth.errors.biometric_failed",
      });
  }
};

export const makeBiometricLoginUseCase =
  (biometrics: IBiometricAuthenticator, repo: IAuthRepository) =>
  async (): Promise<BiometricLoginOutput> => {
    const capability = await biometrics.getCapability();

    if (!capability.hasHardware) {
      throw new AppError({
        code: ErrorCodes.Biometric,
        message: "Tu dispositivo no admite autenticación biométrica",
        i18nKey: "auth.errors.biometric_unavailable",
      });
    }
    if (!capability.isEnrolled) {
      throw new AppError({
        code: ErrorCodes.Biometric,
        message: "No tienes biometría configurada en este dispositivo",
        i18nKey: "auth.errors.biometric_not_enrolled",
      });
    }

    const result = await biometrics.authenticate(PROMPT);
    if (!result.success) throw toAppError(result.reason);

    // Biometrics passed and unlock the session
    return repo.login();
  };
