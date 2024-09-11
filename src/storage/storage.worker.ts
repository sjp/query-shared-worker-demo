// storage.worker.ts
import { expose } from "comlink";
import type {
  AsyncStorage,
  PersistedClient,
} from "@tanstack/react-query-persist-client";

const sharedWorkerGlobalScope: SharedWorkerGlobalScope = self as any;

const storageMap = new Map<string, PersistedClient>();

const storage: AsyncStorage<PersistedClient> = {
  getItem: (key: string): PersistedClient => {
    const result = storageMap.get(key);
    return result as PersistedClient;
  },
  setItem: (key: string, value: PersistedClient): unknown => {
    storageMap.set(key, value);
    return value;
  },
  removeItem: (key: string): void => {
    storageMap.delete(key);
  },
};

sharedWorkerGlobalScope.onconnect = (event) => {
  const port = event.ports[0];
  expose(storage, port);
};
