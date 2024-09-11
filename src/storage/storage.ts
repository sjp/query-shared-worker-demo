// storage.ts
import { wrap } from "comlink";
import type {
  AsyncStorage,
  PersistedClient,
} from "@tanstack/react-query-persist-client";

const worker = new SharedWorker(
  new URL("./storage.worker.ts", import.meta.url),
  { type: "module" }
);

export const storage: AsyncStorage<PersistedClient> = wrap(worker.port);
