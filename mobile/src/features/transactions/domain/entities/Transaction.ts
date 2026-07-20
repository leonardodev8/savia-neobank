// A movement in the account history, including its status
export type TransactionStatus = "pending" | "completed" | "failed";

export type TransactionCategory =
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

export type Transaction = {
  id: string;
  title: string;
  initials: string;
  category: TransactionCategory;
  amountInCents: number;
  status: TransactionStatus;
  occurredAt: string;
};
