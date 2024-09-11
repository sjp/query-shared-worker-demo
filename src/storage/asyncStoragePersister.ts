// asyncStoragePersister.ts
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { storage } from "./storage";

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: storage,
  throttleTime: 0,
});
