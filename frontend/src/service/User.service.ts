import { Ref, ref } from 'vue';

import { authClient } from '@/api/client/auth/Auth.client';
import { AuthDetails } from '@/service/type/AuthDetails.type';

const authDetails = ref<AuthDetails | null>(null);

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
    }

    logOut(): void {
        authDetails.value = null;
    }
}

export const userService = new UserService();