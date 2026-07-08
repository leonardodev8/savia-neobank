/**
  Mock auth source for now, while keeping every layer above it identical to a real HTTP source
**/
import { AppError, ErrorCodes } from "@/core/errors/AppError";
import type { SessionDTO } from "../dto/session.dto";

const MOCK_DELAY_MS = 700;
// TODO: Implement the real 6-digit authentication flow
const DEMO_CODE = "000000";
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 30_000;
let failedAttempts = 0;
let lockedUntil = 0;

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const lockedError = (retryAtMs: number): AppError =>
  new AppError({
    code: ErrorCodes.TooManyAttempts,
    message: "Demasiados intentos. Espera un momento e inténtalo de nuevo",
    i18nKey: "auth.errors.code_locked",
    status: 429,
    meta: { retryAtMs },
  });

const mockSessionDTO = (): SessionDTO => ({
  access_token: `mock.${Math.random().toString(36).slice(2)}.${Date.now()}`,
  issued_at: new Date().toISOString(),
  account: {
    id: "acc_001",
    first_name: "Leonardo",
    last_name: "Buleje",
    account_number: "00000000004821",
  },
});

export const authApi = {
  async login(params?: { code?: string }): Promise<SessionDTO> {
    await delay(MOCK_DELAY_MS);

    // Biometric path: no code to verify
    if (params?.code === undefined) return mockSessionDTO();

    const now = Date.now();
    if (lockedUntil > now) throw lockedError(lockedUntil);

    if (params.code !== DEMO_CODE) {
      failedAttempts += 1;
      if (failedAttempts >= MAX_ATTEMPTS) {
        lockedUntil = now + LOCKOUT_MS;
        failedAttempts = 0;
        throw lockedError(lockedUntil);
      }
      throw new AppError({
        code: ErrorCodes.Unauthorized,
        message: "Código incorrecto",
        i18nKey: "auth.errors.code_incorrect",
        status: 401,
        meta: { remainingAttempts: MAX_ATTEMPTS - failedAttempts },
      });
    }

    // Success resets lockout
    failedAttempts = 0;
    lockedUntil = 0;
    return mockSessionDTO();
  },
};
