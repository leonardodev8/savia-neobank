/**
  Pages the history through an infinite query; search, filter and grouping
  stay client-side and memoized so typing never refetches
**/
import { useCallback, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AppError } from "@/core/errors/AppError";
import { transactionsRepository } from "@/features/transactions/data/repositories/transactions.repository";
import { makeGetTransactionsUseCase } from "@/features/transactions/domain/usecases/getTransactions.usecase";
import {
  buildMovementsList,
  filterTransactions,
  MOVEMENT_FILTERS,
  type MovementsFilterId,
  type MovementsListItem,
} from "./movementsList";

const getTransactions = makeGetTransactionsUseCase(transactionsRepository);

export type MovementsViewModel = {
  status: "loading" | "error" | "empty" | "ready";
  error: AppError | null;
  query: string;
  filter: MovementsFilterId;
  filters: typeof MOVEMENT_FILTERS;
  items: MovementsListItem[];
  stickyHeaderIndices: number[];
  isFetchingMore: boolean;
  onQueryChange: (text: string) => void;
  onFilterChange: (id: MovementsFilterId) => void;
  onEndReached: () => void;
  onRetry: () => void;
};

export const useMovementsViewModel = (): MovementsViewModel => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<MovementsFilterId>("all");

  const pages = useInfiniteQuery({
    queryKey: ["transactions", "list"],
    queryFn: ({ pageParam }) =>
      getTransactions(pageParam ? { cursor: pageParam } : {}),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const transactions = useMemo(
    () => pages.data?.pages.flatMap((page) => page.items) ?? [],
    [pages.data],
  );

  const { items, stickyHeaderIndices } = useMemo(
    () => buildMovementsList(filterTransactions(transactions, filter, query)),
    [transactions, filter, query],
  );

  const { hasNextPage, isFetchingNextPage, fetchNextPage } = pages;
  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    status: pages.isPending
      ? "loading"
      : pages.isError
        ? "error"
        : items.length === 0
          ? "empty"
          : "ready",
    error: pages.error ? AppError.from(pages.error) : null,
    query,
    filter,
    filters: MOVEMENT_FILTERS,
    items,
    stickyHeaderIndices,
    isFetchingMore: isFetchingNextPage,
    onQueryChange: setQuery,
    onFilterChange: setFilter,
    onEndReached,
    onRetry: () => void pages.refetch(),
  };
};
