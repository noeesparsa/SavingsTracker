import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import type { PropsWithChildren, ReactElement } from "react";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

type RenderWithQueryClientOptions = Omit<RenderOptions, "wrapper"> & {
  queryClient?: QueryClient;
};

const renderWithQueryClient = (
  ui: ReactElement,
  {
    queryClient = createTestQueryClient(),
    ...options
  }: RenderWithQueryClientOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return {
    queryClient,
    ...render(ui, {
      wrapper: Wrapper,
      ...options,
    }),
  };
};

export { createTestQueryClient, renderWithQueryClient };
