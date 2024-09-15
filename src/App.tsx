import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { OmitKeyof, QueryClient } from "@tanstack/react-query";
import {
  PersistQueryClientOptions,
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

broadcastQueryClient({
  queryClient,
});

const sharedWorkerPersister = createSharedWorkerPersister();

const persistOptions: OmitKeyof<PersistQueryClientOptions, "queryClient"> = {
  persister: sharedWorkerPersister,
};

export default function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={persistOptions}
    >
      <Router>
        <ThemeProvider theme={theme}>
          <Layout />
          <ReactQueryDevtools initialIsOpen />
        </ThemeProvider>
      </Router>
    </PersistQueryClientProvider>
  );
}
