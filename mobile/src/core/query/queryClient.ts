/**
  Single TanStack Query instance shared by the app (server-state cache)
  Mounted once via '<QueryClientProvider>' in the root layout
**/
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
