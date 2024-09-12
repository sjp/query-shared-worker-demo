import type {
  AsyncStorage,
  PersistedClient,
  Persister,
} from "@tanstack/react-query-persist-client";
import { QueryClient } from "@tanstack/react-query";
import { broadcastQueryClient } from "@tanstack/query-broadcast-client-experimental";
import type { BroadcastChannelOptions } from "broadcast-channel";
import { createSharedWorkerStoragePersister } from "./asyncStoragePersister";

const STORAGE_KEY = "REACT_QUERY_SHARED_WORKER_CACHE";

interface CreateSharedWorkerCacheOptions {
  queryClient: QueryClient;

  /** The storage client used for setting and retrieving items from cache.
   * For SSR pass in `null`.
   * If not provided, a default SharedWorker-based storage provider will be created.
   */
  storage?: AsyncStorage<PersistedClient> | null;

  /** The key to use when storing the cache.
   * Primarily useful when there are multiple applications that
   * be using the same storage.
   */
  applicationName?: string;
  /** The key to use when storing the cache.
   * Primarily useful when there are multiple applications that
   * be using the same storage.
   */
  channelName?: string;
  /** The key to use when storing the cache.
   * Primarily useful when there are multiple applications that
   * be using the same storage.
   */
  storageKey?: string;

  broadcastChannelOptions?: BroadcastChannelOptions;
}

export const createSharedWorkerCache = ({
  queryClient,
  storage,
  applicationName,
  channelName,
  storageKey,
  broadcastChannelOptions,
}: CreateSharedWorkerCacheOptions): Persister => {
  const resolvedChannelName = channelName ?? applicationName ?? STORAGE_KEY;
  const resolvedStorageKey = storageKey ?? applicationName ?? STORAGE_KEY;

  broadcastQueryClient({
    queryClient,
    broadcastChannel: resolvedChannelName,
    options: broadcastChannelOptions,
  });

  return createSharedWorkerStoragePersister({
    storage: storage,
    key: resolvedStorageKey,
  });
};
