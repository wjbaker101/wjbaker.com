import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import { Position, NavigationGuardNext } from 'vue-router/types/router';

import { Utils } from '@frontend/util/Utils';

import LandingView from '@frontend/view/LandingView.vue';

Vue.use(VueRouter);

const appRouter = new VueRouter({

    mode: 'history',

    scrollBehavior(to: Route, from: Route, savedPosition: Position): Position {
        return savedPosition || { x: 0, y: 0 };
    },

    routes: [
        {
            path: '/',
            meta: {
                title: 'Will Baker',
            },
            component: LandingView,
        },
        {
            path: '/about',
            meta: {
                title: 'About',
            },
            component: () => import('@frontend/view/AboutView.vue'),
        },
        {
            path: '/projects',
            meta: {
                title: 'Projects',
            },
            component: () => import('@frontend/view/ProjectsView.vue'),
        },
        {
            path: '/project/:projectID',
            meta: {
                title: 'Project',
            },
            component: () => import('@frontend/view/ProjectView.vue'),
        },
        {
            path: '/blog',
            meta: {
                title: 'Blog',
            },
            component: () => import('@frontend/view/BlogView.vue'),
        },
        {
            path: '/blog/post/:blogID/(.*)?',
            meta: {
                title: 'Blog Post',
            },
            component: () => import('@frontend/view/BlogPostView.vue'),
        },
    ],
});

appRouter.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
    Utils.updateTitle(to.meta.title || null);

    next();
});

export { appRouter };
