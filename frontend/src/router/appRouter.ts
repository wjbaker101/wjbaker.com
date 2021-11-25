import { createWebHistory, createRouter, RouteLocationNormalized, NavigationGuardNext, RouteRecordRaw } from 'vue-router';

import { routerPageHelper } from '@/router/helper/RouterPage.helper';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        meta: {
            title: 'Will Baker',
            description: 'Welcome to my personal website! I\'m a software developer originally from Kent, who\'s goal is creating interesting and helpful software which anyone can use.',
        },
        component: () => import(/* webpackChunkName: "about" */ '@/view/landing/Landing.view.vue'),
    }
];

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