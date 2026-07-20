import { buildMovementsList, filterTransactions } from "./movementsList";
import type { Transaction } from "@/features/transactions/domain/entities/Transaction";

// Fixed "now": Sunday, July 19th 2026 (local time, like the entities' dates)
const NOW = new Date("2026-07-19T15:00:00");

const tx = (overrides: Partial<Transaction>): Transaction => ({
  id: "txn_0000",
  title: "Mercado de Abastos",
  initials: "MA",
  category: "purchase",
  amountInCents: -6450,
  status: "completed",
  occurredAt: "2026-07-19T12:40:00",
  ...overrides,
});

// Newest-first, matching the order the repository returns
const expenseToday = tx({ id: "t1" });
const salaryToday = tx({
  id: "t2",
  title: "Sueldo - Inversiones del Sur",
  initials: "IS",
  category: "salary",
  amountInCents: 320000,
  occurredAt: "2026-07-19T08:02:00",
});
const transferYesterday = tx({
  id: "t3",
  title: "Úrsula Flores",
  initials: "ÚF",
  category: "transfer",
  amountInCents: -12000,
  occurredAt: "2026-07-18T10:24:00",
});
const juneFood = tx({
  id: "t4",
  title: "Café 107",
  initials: "CO",
  category: "food",
  amountInCents: -3000,
  occurredAt: "2026-06-10T09:00:00",
});
const all = [expenseToday, salaryToday, transferYesterday, juneFood];

describe("filterTransactions", () => {
  it("keeps everything with the default filter and no query", () => {
    expect(filterTransactions(all, "all", "", NOW)).toHaveLength(4);
  });

  it("keeps only incomes", () => {
    expect(filterTransactions(all, "income", "", NOW)).toEqual([salaryToday]);
  });

  it("keeps only expenses", () => {
    expect(filterTransactions(all, "expense", "", NOW)).toEqual([
      expenseToday,
      transferYesterday,
      juneFood,
    ]);
  });

  it("keeps only the current month", () => {
    expect(filterTransactions(all, "month", "", NOW)).toEqual([
      expenseToday,
      salaryToday,
      transferYesterday,
    ]);
  });

  it("searches ignoring case and diacritics", () => {
    expect(filterTransactions(all, "all", "ursula", NOW)).toEqual([
      transferYesterday,
    ]);
  });

  it("combines filter and search", () => {
    expect(filterTransactions(all, "expense", "mercado", NOW)).toEqual([
      expenseToday,
    ]);
  });
});

describe("buildMovementsList", () => {
  it("groups by day with Hoy/Ayer/weekday labels and marks header indices", () => {
    const { items, stickyHeaderIndices } = buildMovementsList(all, NOW);

    expect(items.map((item) => item.type)).toEqual([
      "header",
      "row",
      "row",
      "header",
      "row",
      "header",
      "row",
    ]);
    expect(stickyHeaderIndices).toEqual([0, 3, 5]);

    const labels = items.flatMap((item) =>
      item.type === "header" ? [item.label] : [],
    );
    expect(labels).toEqual(["Hoy 19 jul", "Ayer 18 jul", "Mié 10 jun"]);
  });

  it("shapes rows with signed amounts and category subtitles", () => {
    const { items } = buildMovementsList([expenseToday, salaryToday], NOW);
    const rows = items.flatMap((item) =>
      item.type === "row" ? [item.movement] : [],
    );

    expect(rows[0]).toMatchObject({
      id: "t1",
      subtitle: "Compras | 12:40",
      amountText: "- S/ 64.50",
      isIncome: false,
    });
    expect(rows[1]).toMatchObject({
      id: "t2",
      subtitle: "Abono de haberes | 08:02",
      amountText: "+ S/ 3,200.00",
      isIncome: true,
    });
  });

  it("labels received transfers differently from sent ones", () => {
    const received = tx({
      id: "t5",
      title: "Carlos Mendoza",
      category: "transfer",
      amountInCents: 50000,
    });
    const { items } = buildMovementsList([received], NOW);
    const row = items[1];

    expect(row?.type).toBe("row");
    if (row?.type === "row") {
      expect(row.movement.subtitle).toBe("Transferencia recibida | 12:40");
    }
  });
});
