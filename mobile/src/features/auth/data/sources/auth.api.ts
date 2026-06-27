/**
  Mock auth source for now, while keeping every layer above it identical to a real HTTP source
**/
import { AppError, ErrorCodes } from "@/core/errors/AppError";
import type { SessionDTO } from "../dto/session.dto";

const MOCK_DELAY_MS = 700;
// TODO: Implement the real 6-digit authentication flow
const DEMO_CODE = "000000";

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

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
    if (params?.code !== undefined && params.code !== DEMO_CODE) {
      throw new AppError({
        code: ErrorCodes.Unauthorized,
        message: "Código incorrecto",
        i18nKey: "auth.errors.code_incorrect",
        status: 401,
      });
    }
    return mockSessionDTO();
  },
};
