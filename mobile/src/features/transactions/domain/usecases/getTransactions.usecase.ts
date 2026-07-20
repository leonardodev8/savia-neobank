// Cursor-paginated read of the account's movement history
import type {
  GetTransactionsParams,
  ITransactionsRepository,
  TransactionsPage,
} from "../repositories/ITransactionsRepository";

export const makeGetTransactionsUseCase =
  (repo: ITransactionsRepository) =>
  (params: GetTransactionsParams = {}): Promise<TransactionsPage> =>
    repo.getTransactions(params);
