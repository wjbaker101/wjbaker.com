import { NavigationGuardNext } from 'vue-router';

import { appStore } from '@frontend/store/appStore';
import { UserModel } from '@common/model/UserModel';

const handleRequireUser
        = (user: UserModel | null, next: NavigationGuardNext) => {

    if (user !== null) {
        next();
    }
    else {
        next('/user/login');
    }
};

const handleRequireAdmin
        = (user: UserModel | null, next: NavigationGuardNext) => {

    if (user !== null && user.isAdmin) {
        next();
    }
    else {
        next('/');
    }
};

const handleRequireAnonymous
        = (user: UserModel | null, next: NavigationGuardNext) => {

    if (user === null) {
        next();
    }
    else {
        next('/user');
    }
};

export const AuthHandler = {

    handle(authType: string, next: NavigationGuardNext): void {
        const user = appStore.state.user;

        switch (authType) {
            case 'user': return handleRequireUser(user, next);
            case 'admin': return handleRequireAdmin(user, next);
            case 'anonymous': return handleRequireAnonymous(user, next);
        }
    },
}
