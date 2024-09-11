// storage.ts
import { wrap } from "comlink";
import type {
  AsyncStorage,
  PersistedClient,
} from "@tanstack/react-query-persist-client";

export const createSharedStorage = (
  worker: SharedWorker
): AsyncStorage<PersistedClient> => {
  return wrap(worker.port);
};

const defaultWorkerOptions: WorkerOptions = { type: "module" };

export const createSharedWorker = (
  options?: string | WorkerOptions
): SharedWorker => {
  const opts = options ?? defaultWorkerOptions;
  return new SharedWorker(
    new URL("./storage.worker.ts", import.meta.url),
    opts
  );
};
