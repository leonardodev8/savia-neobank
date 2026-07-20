import { makeGetTransactionsUseCase } from "./getTransactions.usecase";
import type {
  ITransactionsRepository,
  TransactionsPage,
} from "../repositories/ITransactionsRepository";

const page: TransactionsPage = { items: [], nextCursor: null };

const makeRepo = (): jest.Mocked<ITransactionsRepository> => ({
  getTransactions: jest.fn().mockResolvedValue(page),
});

describe("getTransactions use case", () => {
  it("forwards cursor and limit to the repository", async () => {
    const repo = makeRepo();
    const getTransactions = makeGetTransactionsUseCase(repo);

    const result = await getTransactions({ cursor: "50", limit: 25 });

    expect(repo.getTransactions).toHaveBeenCalledWith({
      cursor: "50",
      limit: 25,
    });
    expect(result).toBe(page);
  });

  it("asks for the first page when called without params", async () => {
    const repo = makeRepo();
    const getTransactions = makeGetTransactionsUseCase(repo);

    await getTransactions();

    expect(repo.getTransactions).toHaveBeenCalledWith({});
  });
});
