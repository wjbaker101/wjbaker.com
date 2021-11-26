import { ref } from 'vue';

import { authClient } from '@/api/client/auth/Auth.client';

const jwt = ref<string | null>(null);

class UserService {

    isLoggedIn(): boolean {
        return jwt.value !== null;
    }

    async logIn(username: string, password: string): Promise<void | Error> {
        const result = await authClient.logIn({
            username,
            password,
        });
        if (result instanceof Error)
            return result;

        jwt.value = result.jwt;
    }
}

export const userService = new UserService();