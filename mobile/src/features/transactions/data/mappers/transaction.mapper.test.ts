import { toTransaction, toTransactionsPage } from "./transaction.mapper";
import type {
  TransactionDTO,
  TransactionsPageDTO,
} from "../dto/transaction.dto";

const purchaseDto: TransactionDTO = {
  id: "txn_0001",
  counterparty: "Mercado de Abastos",
  category: "purchase",
  amount_cents: -6450,
  status: "completed",
  occurred_at: "2026-07-19T12:40:00Z",
};

describe("toTransaction", () => {
  it("keeps the amount as integer cents and passes the status through", () => {
    const transaction = toTransaction(purchaseDto);
    expect(transaction.amountInCents).toBe(-6450);
    expect(transaction.status).toBe("completed");
  });

  it("derives initials from the counterparty", () => {
    expect(toTransaction(purchaseDto).initials).toBe("MA");
  });

  it("uses the counterparty as title for regular movements", () => {
    expect(toTransaction(purchaseDto).title).toBe("Mercado de Abastos");
  });

  it("labels salary movements with a Sueldo prefix", () => {
    const salary = toTransaction({
      ...purchaseDto,
      category: "salary",
      counterparty: "Inversiones del Sur",
      amount_cents: 320000,
    });
    expect(salary.title).toBe("Sueldo - Inversiones del Sur");
  });
});

describe("toTransactionsPage", () => {
  const pageDto: TransactionsPageDTO = {
    items: [purchaseDto],
    next_cursor: "50",
  };

  it("maps every item and keeps the cursor", () => {
    const page = toTransactionsPage(pageDto);
    expect(page.items).toHaveLength(1);
    expect(page.items[0]?.id).toBe("txn_0001");
    expect(page.nextCursor).toBe("50");
  });

  it("keeps the null cursor of the last page", () => {
    expect(
      toTransactionsPage({ ...pageDto, next_cursor: null }).nextCursor,
    ).toBeNull();
  });
});
