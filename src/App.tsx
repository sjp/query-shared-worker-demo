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
import { createSharedWorkerStoragePersister } from "./storage/asyncStoragePersister";
import { storage } from "./storage/storage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 300, // 5 minuts
    },
  },
});

broadcastQueryClient({
  queryClient,
  broadcastChannel: "my-app",
});

const sharedWorkerStorage = storage;
const persister = createSharedWorkerStoragePersister({
  storage: sharedWorkerStorage,
});

const persistOptions: OmitKeyof<PersistQueryClientOptions, "queryClient"> = {
  persister: persister,
  buster: "my-cool-app-version",
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

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: "Roboto Mono, monospace",
    },
    h2: {
      fontFamily: "Roboto Mono, monospace",
    },
    h3: {
      fontFamily: "Roboto Mono, monospace",
    },
    h4: {
      fontFamily: "Roboto Mono, monospace",
    },
    h5: {
      fontFamily: "Roboto Mono, monospace",
    },
    h6: {
      fontFamily: "Roboto Mono, monospace",
    },
  },
});
