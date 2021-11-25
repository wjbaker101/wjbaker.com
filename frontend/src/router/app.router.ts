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
    },
    {
        path: '/about',
        meta: {
            title: 'About',
            description: 'Find out more about me and my interests, career and education.',
        },
        component: () => import(/* webpackChunkName: "about" */ '@/view/about/About.view.vue'),
    },
    {
        path: '/about/cv',
        meta: {
            title: 'CV',
            description: 'A public version of my CV.',
        },
        component: () => import(/* webpackChunkName: "about" */ '@/view/about-cv/AboutCv.view.vue'),
    },
    {
        path: '/projects',
        meta: {
            title: 'Projects',
            description: 'The past and present projects I have worked on.',
        },
        component: () => import(/* webpackChunkName: "projects" */ '@/view/projects/Projects.view.vue'),
    },
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