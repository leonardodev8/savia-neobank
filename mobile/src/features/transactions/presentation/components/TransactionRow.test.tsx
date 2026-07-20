import { render, screen } from "@testing-library/react-native";
import { TransactionRow } from "./TransactionRow";
import type { TransactionRowVM } from "../viewmodels/movementsList";

const movement: TransactionRowVM = {
  id: "t1",
  initials: "MA",
  tone: "amber",
  title: "Mercado de Abastos",
  subtitle: "Compras 12:40",
  amountText: "- S/ 64.50",
  isIncome: false,
};

describe("TransactionRow", () => {
  it("renders initials, title, subtitle and the signed amount", async () => {
    await render(<TransactionRow movement={movement} />);

    expect(screen.getByText("MA")).toBeTruthy();
    expect(screen.getByText("Mercado de Abastos")).toBeTruthy();
    expect(screen.getByText("Compras 12:40")).toBeTruthy();
    expect(screen.getByText("- S/ 64.50")).toBeTruthy();
  });

  it("is memoized so unchanged rows skip re-render during list updates", () => {
    expect(TransactionRow.$$typeof).toBe(Symbol.for("react.memo"));
  });
});
