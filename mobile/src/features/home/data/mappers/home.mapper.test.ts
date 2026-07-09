import { toAccount, toMovement } from "./home.mapper";
import type { AccountDTO, MovementDTO } from "../dto/home.dto";

const accountDto: AccountDTO = {
  id: "acc-1",
  alias: "Cuenta Sueldo",
  account_number: "0011223344556677",
  balance_cents: 482050,
  currency: "PEN",
};

const movementDto: MovementDTO = {
  id: "mov-1",
  counterparty: "Inversiones del Sur",
  category: "transfer",
  amount_cents: -12000,
  occurred_at: "2026-07-08T14:30:00Z",
};

describe("toAccount", () => {
  it("masks the account number down to its last four digits", () => {
    const account = toAccount(accountDto);
    expect(account.maskedNumber).toBe("**** 6677");
  });

  it("keeps the balance as integer cents", () => {
    expect(toAccount(accountDto).balanceInCents).toBe(482050);
  });
});

describe("toMovement", () => {
  it("derives initials skipping Spanish particles", () => {
    expect(toMovement(movementDto).initials).toBe("IS");
  });

  it("uses the counterparty as title for regular movements", () => {
    expect(toMovement(movementDto).title).toBe("Inversiones del Sur");
  });

  it("labels salary movements with a Sueldo prefix", () => {
    const salary = toMovement({
      ...movementDto,
      category: "salary",
      counterparty: "Tech Corp SAC",
      amount_cents: 320000,
    });
    expect(salary.title).toBe("Sueldo - Tech Corp SAC");
  });
});
