export type TransactionCategoryDTO =
  | "salary"
  | "transfer"
  | "purchase"
  | "food"
  | "phone"
  | "fuel"
  | "refund"
  | "health"
  | "entertainment"
  | "utilities"
  | "cash";

export type TransactionDTO = {
  id: string;
  counterparty: string;
  category: TransactionCategoryDTO;
  // Income > 0, expense < 0; cents, not float
  amount_cents: number;
  status: "pending" | "completed" | "failed";
  // ISO 8601
  occurred_at: string;
};

export type TransactionsPageDTO = {
  items: TransactionDTO[];
  next_cursor: string | null;
};
