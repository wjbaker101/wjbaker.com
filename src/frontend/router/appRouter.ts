import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import { Position } from 'vue-router/types/router';

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
            component: LandingView,
        },
        {
            path: '/about',
            component: () => import('@frontend/view/AboutView.vue'),
        },
        {
            path: '/projects',
            component: () => import('@frontend/view/ProjectsView.vue'),
        },
        {
            path: '/project/:projectID',
            component: () => import('@frontend/view/ProjectView.vue'),
        },
        {
            path: '/blog',
            component: () => import('@frontend/view/BlogView.vue'),
        },
        {
            path: '/blog/post/:blogID/(.*)?',
            component: () => import('@frontend/view/BlogPostView.vue'),
        },
    ],
});

export { appRouter };
