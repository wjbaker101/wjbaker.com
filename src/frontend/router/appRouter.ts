import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import { Position, NavigationGuardNext } from 'vue-router/types/router';

import { Utils } from '@frontend/util/Utils';

import LandingView from '@frontend/view/LandingView.vue';
import { appStore } from '@frontend/store/appStore';
import { AuthHandler } from './AuthHandler';

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
            path: '/about/cv',
            meta: {
                title: 'CV',
            },
            component: () => import('@frontend/view/AboutCVView.vue'),
        },
        {
            path: '/projects',
            meta: {
                title: 'Projects',
            },
            component: () => import('@frontend/view/ProjectsView.vue'),
        },
        {
            path: '/projects/edit/:projectID',
            meta: {
                title: 'Edit Project',
                auth: 'admin',
            },
            component: () => import('@frontend/view/ProjectEditView.vue'),
        },
        {
            path: '/projects/create',
            meta: {
                title: 'New Project',
                auth: 'admin',
            },
            component: () => import('@frontend/view/ProjectEditView.vue'),
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
        {
            path: '/blog/edit/:blogID',
            meta: {
                title: 'Edit Blog Post',
                auth: 'admin',
            },
            component: () => import('@frontend/view/BlogEditView.vue'),
        },
        {
            path: '/blog/create',
            meta: {
                title: 'New Blog Post',
                auth: 'admin',
            },
            component: () => import('@frontend/view/BlogEditView.vue'),
        },
        {
            path: '/user',
            meta: {
                title: 'User',
                auth: 'user',
            },
            component: () => import('@frontend/view/UserView.vue'),
        },
        {
            path: '/user/login',
            meta: {
                title: 'Login',
                auth: 'anonymous',
            },
            component: () => import('@frontend/view/UserLoginView.vue'),
        },
        {
            path: '/user/create',
            meta: {
                title: 'Create User',
                auth: 'anonymous',
            },
            component: () => import('@frontend/view/UserCreateView.vue'),
        },
    ],
});

appRouter.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
    Utils.updateTitle(to.meta.title || null);

    if (to.meta.auth) {
        AuthHandler.handle(to.meta.auth, next);
    }

    next();
});

export { appRouter };
