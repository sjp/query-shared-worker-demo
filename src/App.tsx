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
import {
  createSharedWorker,
  createSharedStorage as createSharedWorkerStorage,
} from "./storage/storage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

broadcastQueryClient({
  queryClient,
  broadcastChannel: "my-app",
});

const sharedWorker = createSharedWorker();
const storage = createSharedWorkerStorage(sharedWorker);
const persister = createSharedWorkerStoragePersister({
  storage: storage,
  key: "my-cool-app",
});

const persistOptions: OmitKeyof<PersistQueryClientOptions, "queryClient"> = {
  persister,
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
    allVariants: {
      fontFamily: "monospace",
    },
  },
  palette: { mode: "dark" },
});
