/**
  Authenticates a returning user. Applies the app rule for the login code and delegates
  authentication to the repository. No React, HTTP, or storage concerns here
**/
import { AppError, ErrorCodes } from "@/core/errors/AppError";
import type {
  IAuthRepository,
  LoginParams,
} from "../repositories/IAuthRepository";
import type { Session } from "../entities/Session";

export type LoginInput = LoginParams;
export type LoginOutput = Session;

const SIX_DIGITS = /^\d{6}$/;

export const makeLoginUseCase =
  (repo: IAuthRepository) =>
  async (input?: LoginInput): Promise<LoginOutput> => {
    // App rule: if a code is provided, it must be exactly 6 digits.
    // Biometric authentication doesn't provide a code, so this validation is skipped
    if (input?.code !== undefined && !SIX_DIGITS.test(input.code)) {
      throw new AppError({
        code: ErrorCodes.Validation,
        message: "El código debe tener 6 dígitos",
        i18nKey: "auth.errors.code_invalid",
      });
    }
    return repo.login(input);
  };
