import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./Layout";
import { broadcastQueryClient } from "@tanstack/query-broadcast-client-experimental";
import "./styles.css";
import { createSharedWorkerPersister } from "@sjpnz/query-shared-worker-persister";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "monospace",
    },
  },
  colorSchemes: { dark: true, light: true },
  defaultColorScheme: 'dark'
});

// Define a unique identifier for your application
const APP_NAME = "TANSTACK_QUERY_RICK_MORTY_DEMO_APP_SJP_v0.0.1";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// enable updates to be shared across tabs
broadcastQueryClient({
  queryClient,
  broadcastChannel: APP_NAME,
});

const sharedWorkerPersister = createSharedWorkerPersister({
  key: APP_NAME,
});

// enable fresh tabs to load the shared query cache
// while still receiving updates via the broadcastQueryClient
persistQueryClient({
  queryClient,
  persister: sharedWorkerPersister
});

export default function App() {
  const basePath = import.meta.env.VITE_PUBLIC_BASE_PATH || "/";

  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={basePath}>
        <ThemeProvider theme={theme}>
          <Layout />
          <ReactQueryDevtools initialIsOpen />
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  );
}
