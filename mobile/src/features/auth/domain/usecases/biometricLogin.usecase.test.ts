import { ErrorCodes } from "@/core/errors/AppError";
import { makeBiometricLoginUseCase } from "./biometricLogin.usecase";
import type {
  BiometricCapability,
  BiometricResult,
  IBiometricAuthenticator,
} from "../repositories/IBiometricAuthenticator";
import type { IAuthRepository } from "../repositories/IAuthRepository";
import type { Session } from "../entities/Session";

const session: Session = {
  token: "jwt-token",
  issuedAt: "2026-07-09T10:00:00-05:00",
  user: {
    id: "acc-1",
    fullName: "Leonardo Buleje",
    initials: "LB",
    maskedAccount: "**** **** 4821",
  },
};

const CAPABLE: BiometricCapability = {
  hasHardware: true,
  isEnrolled: true,
  kind: "facial",
};

const makeAuthenticator = (
  capability: BiometricCapability,
  result: BiometricResult = { success: true },
): jest.Mocked<IBiometricAuthenticator> => ({
  getCapability: jest.fn().mockResolvedValue(capability),
  authenticate: jest.fn().mockResolvedValue(result),
});

const makeRepo = (): jest.Mocked<IAuthRepository> => ({
  login: jest.fn().mockResolvedValue(session),
});

describe("biometric login use case", () => {
  it("returns the session when the prompt succeeds", async () => {
    const biometrics = makeAuthenticator(CAPABLE);
    const repo = makeRepo();
    const biometricLogin = makeBiometricLoginUseCase(biometrics, repo);

    await expect(biometricLogin()).resolves.toBe(session);
    expect(biometrics.authenticate).toHaveBeenCalled();
    expect(repo.login).toHaveBeenCalledWith();
  });

  it("fails without hardware and never shows the prompt", async () => {
    const biometrics = makeAuthenticator({ ...CAPABLE, hasHardware: false });
    const repo = makeRepo();
    const biometricLogin = makeBiometricLoginUseCase(biometrics, repo);

    await expect(biometricLogin()).rejects.toMatchObject({
      code: ErrorCodes.Biometric,
    });
    expect(biometrics.authenticate).not.toHaveBeenCalled();
    expect(repo.login).not.toHaveBeenCalled();
  });

  it("fails when no biometrics are enrolled", async () => {
    const biometrics = makeAuthenticator({ ...CAPABLE, isEnrolled: false });
    const biometricLogin = makeBiometricLoginUseCase(biometrics, makeRepo());

    await expect(biometricLogin()).rejects.toMatchObject({
      code: ErrorCodes.Biometric,
    });
  });

  it("maps a dismissed prompt to the Cancelled code so the UI can ignore it", async () => {
    const biometrics = makeAuthenticator(CAPABLE, {
      success: false,
      reason: "cancelled",
    });
    const repo = makeRepo();
    const biometricLogin = makeBiometricLoginUseCase(biometrics, repo);

    await expect(biometricLogin()).rejects.toMatchObject({
      code: ErrorCodes.Cancelled,
    });
    expect(repo.login).not.toHaveBeenCalled();
  });

  it("maps a lockout to a Biometric error", async () => {
    const biometrics = makeAuthenticator(CAPABLE, {
      success: false,
      reason: "lockout",
    });
    const biometricLogin = makeBiometricLoginUseCase(biometrics, makeRepo());

    await expect(biometricLogin()).rejects.toMatchObject({
      code: ErrorCodes.Biometric,
    });
  });
});
