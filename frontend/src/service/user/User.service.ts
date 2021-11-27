import { Ref, ref } from 'vue';

import { authClient } from '@/api/client/auth/Auth.client';
import { AuthDetails } from '@/service/user/type/AuthDetails.type';

import { cacheService } from '@/service/cache/Cache.service';

const authDetails = ref<AuthDetails | null>(null);

const cacheKey = 'authDetails';

(async () => {

    const cache = await cacheService.get<AuthDetails>(cacheKey);

    authDetails.value = cache;

})();

class UserService {

    isLoggedIn(): boolean {
        return this.getAuthDetails().value !== null;
    }

    getAuthDetails(): Ref<AuthDetails | null> {
        if (authDetails.value !== null && authDetails.value.expiresAt < Date.now() / 1000)
            authDetails.value = null;

        return authDetails;
    }

    async logIn(username: string, password: string): Promise<void | Error> {
        const result = await authClient.logIn({
            username,
            password,
        });
        if (result instanceof Error)
            return result;

        authDetails.value = {
            jwt: result.jwt,
            expiresAt: result.expiresAt,
            user: {
                reference: result.user.reference,
                userType: result.user.userType,
            },
        };

        await cacheService.set(cacheKey, authDetails.value, authDetails.value.expiresAt * 1000);
    }

    async logOut(): Promise<void> {
        authDetails.value = null;

        await cacheService.delete(cacheKey);
    }
}

export const userService = new UserService();