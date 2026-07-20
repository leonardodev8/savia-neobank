import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { transactionsApi } from "@/features/transactions/data/sources/transactions.api";
import { MovementsScreen } from "./MovementsScreen";
import type { TransactionsPageDTO } from "@/features/transactions/data/dto/transaction.dto";

jest.mock("@/features/transactions/data/sources/transactions.api", () => ({
  transactionsApi: { getTransactions: jest.fn() },
}));

// FlashList sizes itself from real layout events, which never fire under Jest;
// a FlatList is behaviorally equivalent for these state assertions
jest.mock("@shopify/flash-list", () => ({
  FlashList: jest.requireActual("react-native").FlatList,
}));

const mockGetTransactions =
  transactionsApi.getTransactions as jest.MockedFunction<
    typeof transactionsApi.getTransactions
  >;

const pageDto: TransactionsPageDTO = {
  items: [
    {
      id: "t1",
      counterparty: "Mercado de Abastos",
      category: "purchase",
      amount_cents: -6450,
      status: "completed",
      occurred_at: new Date().toISOString(),
    },
    {
      id: "t2",
      counterparty: "Inversiones del Sur",
      category: "salary",
      amount_cents: 320000,
      status: "completed",
      occurred_at: new Date().toISOString(),
    },
  ],
  next_cursor: null,
};

const renderScreen = () => {
  // gcTime: Infinity avoids a cache-eviction timer outliving the test worker
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: Infinity } },
  });
  return render(
    <QueryClientProvider client={client}>
      <MovementsScreen />
    </QueryClientProvider>,
  );
};

describe("MovementsScreen", () => {
  beforeEach(() => {
    mockGetTransactions.mockReset();
  });

  it("shows the skeleton while the first page loads", async () => {
    mockGetTransactions.mockReturnValue(new Promise(() => {}));
    await renderScreen();

    expect(screen.getByTestId("movements-skeleton")).toBeTruthy();
  });

  it("renders the rows once the page arrives", async () => {
    mockGetTransactions.mockResolvedValue(pageDto);
    await renderScreen();

    expect(await screen.findByText("Mercado de Abastos")).toBeTruthy();
    expect(screen.getByText("Sueldo - Inversiones del Sur")).toBeTruthy();
  });

  it("shows the error state and recovers on retry", async () => {
    mockGetTransactions
      .mockRejectedValueOnce(new Error("network down"))
      .mockResolvedValueOnce(pageDto);
    await renderScreen();

    await fireEvent.press(await screen.findByTestId("movements-retry"));

    expect(await screen.findByText("Mercado de Abastos")).toBeTruthy();
  });

  it("shows the empty state when the search has no matches", async () => {
    mockGetTransactions.mockResolvedValue(pageDto);
    await renderScreen();
    await screen.findByText("Mercado de Abastos");

    await fireEvent.changeText(screen.getByTestId("movements-search"), "zzz");

    expect(await screen.findByTestId("movements-empty")).toBeTruthy();
  });

  it("hides expenses when the income filter is active", async () => {
    mockGetTransactions.mockResolvedValue(pageDto);
    await renderScreen();
    await screen.findByText("Mercado de Abastos");

    await fireEvent.press(screen.getByTestId("movements-filter-income"));

    await waitFor(() =>
      expect(screen.queryByText("Mercado de Abastos")).toBeNull(),
    );
    expect(screen.getByText("Sueldo - Inversiones del Sur")).toBeTruthy();
  });
});
