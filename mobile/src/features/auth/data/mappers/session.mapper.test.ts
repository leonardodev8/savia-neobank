import { toSession } from "./session.mapper";
import type { SessionDTO } from "../dto/session.dto";

const dto: SessionDTO = {
  access_token: "jwt-token",
  issued_at: "2026-07-09T10:00:00-05:00",
  account: {
    id: "acc-1",
    first_name: "Leonardo",
    last_name: "Buleje",
    account_number: "0011223344554821",
  },
};

describe("toSession", () => {
  it("maps token and issue date", () => {
    const session = toSession(dto);
    expect(session.token).toBe("jwt-token");
    expect(session.issuedAt).toBe("2026-07-09T10:00:00-05:00");
  });

  it("builds the display name and uppercase initials", () => {
    const { user } = toSession(dto);
    expect(user.fullName).toBe("Leonardo Buleje");
    expect(user.initials).toBe("LB");
  });

  it("masks the account number down to its last four digits", () => {
    expect(toSession(dto).user.maskedAccount).toBe("**** **** 4821");
  });

  it("pads short account numbers instead of exposing them", () => {
    const short: SessionDTO = {
      ...dto,
      account: { ...dto.account, account_number: "21" },
    };
    expect(toSession(short).user.maskedAccount).toBe("**** **** **21");
  });
});
