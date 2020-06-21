import { CacheService } from '@frontend/service/CacheService';
import { UserModel } from '@common/model/UserModel';

const USER_CACHE_ID = 'cache-user';

export const UserService = {

    async getUser(): Promise<UserModel | null> {
        const cache = await CacheService.get<UserModel>(USER_CACHE_ID);

        if (cache === null) {
            return null;
        }

        return {
            ...cache,
            creationDate: new Date(cache.creationDate),
        }
    },

    async setUser(user: UserModel): Promise<void> {
        await CacheService.set(USER_CACHE_ID, user);
    },
}
