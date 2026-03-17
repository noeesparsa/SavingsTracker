import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { App as AntdAppContext } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { AuthenticationProvider } from "./context/authentication/AuthenticationProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AntdAppContext>
      <AuthenticationProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <App />
        </QueryClientProvider>
      </AuthenticationProvider>
    </AntdAppContext>
  </StrictMode>
);
