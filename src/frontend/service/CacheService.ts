import {
    ImmortalStorage,
    LocalStorageStore,
    IndexedDbStore,

} from 'immortal-db';

import { CacheItem } from '@frontend/model/CacheItem';

const ImmortalDB = new ImmortalStorage([ LocalStorageStore, IndexedDbStore, ]);

export const CacheService = {

    async get<T>(key: string): Promise<T | null> {
        const raw = await ImmortalDB.get(key);

        if (raw === null) {
            return null;
        }

        const cache: CacheItem = JSON.parse(raw);

        if (cache.timeout && cache.timestamp + cache.timeout > Date.now()) {
            return null;
        }

        return cache.data;
    },

    async set(key: string, data: any, timeout?: number): Promise<void> {
        const cache: CacheItem = {
            data,
            timestamp: Date.now(),
            timeout,
        };

        await ImmortalDB.set(key, JSON.stringify(cache));
    },
}
