export type AccountDTO = {
  id: string;
  alias: string;
  // Full account number(00000000004821)
  account_number: string;
  // Cents, not float: avoids drift on the wire
  balance_cents: number;
  currency: "PEN";
};

export type MovementDTO = {
  id: string;
  counterparty: string;
  category: "salary" | "transfer" | "purchase";
  // Income > 0, expense < 0
  amount_cents: number;
  // ISO 8601 with offset "2026-07-08T14:32:00-05:00"
  occurred_at: string;
};

export type HomeSummaryDTO = {
  account: AccountDTO;
  recent_movements: MovementDTO[];
};
