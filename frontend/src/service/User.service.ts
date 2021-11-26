import { Ref, ref } from 'vue';

import { authClient } from '@/api/client/auth/Auth.client';
import { AuthDetails } from '@/service/type/AuthDetails.type';

const authDetails = ref<AuthDetails | null>(null);

class UserService {

    isLoggedIn(): boolean {
        return authDetails.value !== null;
    }

    getAuthDetails(): Ref<AuthDetails | null> {
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
            user: {
                reference: result.user.reference,
                userType: result.user.userType,
            },
        };
    }
}

export const userService = new UserService();