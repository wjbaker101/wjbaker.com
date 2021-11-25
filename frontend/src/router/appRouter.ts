import { createWebHistory, createRouter, RouteLocationNormalized, NavigationGuardNext, RouteRecordRaw } from 'vue-router';

import { routerPageHelper } from '@/router/helper/RouterPage.helper';

const routes: Array<RouteRecordRaw> = [];

const appRouter = createRouter({
    history: createWebHistory(),
    routes,
});

appRouter.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    routerPageHelper.setTitle(to?.meta?.title as string ?? null);
    routerPageHelper.setDescription(to?.meta?.description as string ?? null);

    next();
});

export { appRouter, };