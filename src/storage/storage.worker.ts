// storage.worker.ts
import { expose } from "comlink";
import type { AsyncStorage } from "@tanstack/react-query-persist-client";

const sharedWorkerGlobalScope: SharedWorkerGlobalScope = self as any;

const storageMap = new Map<string, unknown>();

const storage: AsyncStorage = {
  getItem: (key: string): string => {
    const result = storageMap.get(key) as string;
    console.log({ op: "get", key, value: result });
    return result;
  },
  setItem: (key: string, value: string): unknown => {
    console.log({ op: "set", key, value });
    storageMap.set(key, value);
    return value;
  },
  removeItem: (key: string): void => {
    console.log("removeItem: " + key);
    storageMap.delete(key);
  },
};

sharedWorkerGlobalScope.onconnect = (event) => {
  const port = event.ports[0];
  expose(storage, port);
};
