import type { Transaction } from "../entities/Transaction";

export type GetTransactionsParams = {
  // Use the cursor from the last page; omit for the first page
  cursor?: string;
  limit?: number;
};

export type TransactionsPage = {
  items: Transaction[];
  // Null when there are no more pages
  nextCursor: string | null;
};

export interface ITransactionsRepository {
  getTransactions(params: GetTransactionsParams): Promise<TransactionsPage>;
}
