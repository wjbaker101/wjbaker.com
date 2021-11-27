import { ImmortalStorage, IndexedDbStore, LocalStorageStore, SessionStorageStore } from 'immortal-db';

const store = new ImmortalStorage([
    IndexedDbStore,
    LocalStorageStore,
    SessionStorageStore,
]);

interface CacheItem<T> {
    data: T;
    expiresAt: number;
}

class CacheService {

    async get<T>(key: string): Promise<T |  null> {
        const result = await store.get(key);

        if (result === null)
            return null;

        const cacheItem = JSON.parse(result) as CacheItem<T>;

        if (cacheItem.expiresAt !== -1 && cacheItem.expiresAt < Date.now())
            return null;

        return cacheItem.data;
    }

    async set<T>(key: string, data: T, expiresAt: number = -1): Promise<void> {
        const cacheItem: CacheItem<T> = {
            data,
            expiresAt,
        };

        await store.set(key, JSON.stringify(cacheItem));
    }

    async delete(key: string): Promise<void> {
        await store.remove(key);
    }
}

export const cacheService = new CacheService();