import { AppError, ErrorCodes } from "@/core/errors/AppError";
import { makeLoginUseCase } from "./login.usecase";
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

const makeRepo = (): jest.Mocked<IAuthRepository> => ({
  login: jest.fn().mockResolvedValue(session),
});

describe("login use case", () => {
  it("logs in with a valid 6-digit code", async () => {
    const repo = makeRepo();
    const login = makeLoginUseCase(repo);

    await expect(login({ code: "123456" })).resolves.toBe(session);
    expect(repo.login).toHaveBeenCalledWith({ code: "123456" });
  });

  it.each(["12345", "1234567", "12345a", ""])(
    "rejects %p as a validation error without calling the repository",
    async (code) => {
      const repo = makeRepo();
      const login = makeLoginUseCase(repo);

      await expect(login({ code })).rejects.toMatchObject({
        code: ErrorCodes.Validation,
      });
      await expect(login({ code })).rejects.toBeInstanceOf(AppError);
      expect(repo.login).not.toHaveBeenCalled();
    },
  );

  it("skips code validation when no code is provided (biometric path)", async () => {
    const repo = makeRepo();
    const login = makeLoginUseCase(repo);

    await expect(login()).resolves.toBe(session);
    expect(repo.login).toHaveBeenCalledWith(undefined);
  });
});
