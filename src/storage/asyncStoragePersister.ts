// asyncStoragePersister.ts
import type {
  AsyncStorage,
  PersistedClient,
  Persister,
} from "@tanstack/react-query-persist-client";

const noop = () => {};

const noopPersister: Persister = {
  persistClient: noop,
  restoreClient: () => Promise.resolve(undefined),
  removeClient: noop,
};

const STORAGE_KEY = "REACT_QUERY_SHARED_WORKER_CACHE";

interface CreateSharedWorkerStoragePersisterOptions {
  /** The storage client used for setting and retrieving items from cache.
   * For SSR pass in `undefined`.
   */
  storage: AsyncStorage<PersistedClient> | undefined | null;
}

export const createSharedWorkerStoragePersister = ({
  storage,
}: CreateSharedWorkerStoragePersisterOptions): Persister => {
  if (!storage) {
    return noopPersister;
  }

  return {
    persistClient: (persistClient: PersistedClient) => {
      storage.setItem(STORAGE_KEY, persistClient);
    },
    restoreClient: async () => {
      const cached = await storage.getItem(STORAGE_KEY);
      if (!cached) return;
      return cached;
    },
    removeClient: () => storage.removeItem(STORAGE_KEY),
  };
};
