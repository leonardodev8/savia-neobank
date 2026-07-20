/**
  Transactions repository implementation: calls the data source, runs the
  mapper, returns domain entities for the view model
**/
import { toTransactionsPage } from "../mappers/transaction.mapper";
import { transactionsApi } from "../sources/transactions.api";
import type { ITransactionsRepository } from "@/features/transactions/domain/repositories/ITransactionsRepository";

type Deps = { api: typeof transactionsApi };

export const createTransactionsRepository = ({
  api,
}: Deps): ITransactionsRepository => ({
  async getTransactions(params) {
    const dto = await api.getTransactions(params);
    return toTransactionsPage(dto);
  },
});

export const transactionsRepository = createTransactionsRepository({
  api: transactionsApi,
});
