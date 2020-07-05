import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import { Position, NavigationGuardNext } from 'vue-router/types/router';

import { Utils } from '@frontend/util/Utils';
import { AuthHandler } from '@frontend/router/handler/AuthHandler';

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
                description: 'Welcome to my personal website! I\'m a software developer originally from Kent, who\'s goal is creating interesting and helpful software which anyone can use.',
            },
            component: () => import(/* webpackChunkName: "about" */ '@frontend/view/LandingView.vue'),
        },
        {
            path: '/about',
            meta: {
                title: 'About',
                description: 'Find out more about me and my interests, career and education.',
            },
            component: () => import(/* webpackChunkName: "about" */ '@frontend/view/AboutView.vue'),
        },
        {
            path: '/about/cv',
            meta: {
                title: 'CV',
                description: 'A public version of my CV.',
            },
            component: () => import(/* webpackChunkName: "about" */ '@frontend/view/AboutCVView.vue'),
        },
        {
            path: '/projects',
            meta: {
                title: 'Projects',
                description: 'The past and present projects I have worked on.',
            },
            component: () => import(/* webpackChunkName: "projects" */ '@frontend/view/ProjectsView.vue'),
        },
        {
            path: '/project/:projectID',
            meta: {
                title: 'Project',
            },
            component: () => import(/* webpackChunkName: "projects" */ '@frontend/view/ProjectView.vue'),
        },
        {
            path: '/projects/edit/:projectID',
            meta: {
                title: 'Edit Project',
                auth: 'admin',
                description: 'Edit an existing project.',
            },
            component: () => import(/* webpackChunkName: "projects-admin" */ '@frontend/view/ProjectEditView.vue'),
        },
        {
            path: '/projects/create',
            meta: {
                title: 'New Project',
                auth: 'admin',
                description: 'Create a new project.',
            },
            component: () => import(/* webpackChunkName: "projects-admin" */ '@frontend/view/ProjectEditView.vue'),
        },
        {
            path: '/blog',
            meta: {
                title: 'Blog',
                description: 'My thoughts and ideas written down in a blog.',
            },
            component: () => import(/* webpackChunkName: "blog" */ '@frontend/view/BlogView.vue'),
        },
        {
            path: '/blog/post/:blogID/(.*)?',
            meta: {
                title: 'Blog Post',
            },
            component: () => import(/* webpackChunkName: "blog" */ '@frontend/view/BlogPostView.vue'),
        },
        {
            path: '/blog/edit/:blogID',
            meta: {
                title: 'Edit Blog Post',
                auth: 'admin',
                description: 'Edit an existing blog post.',
            },
            component: () => import(/* webpackChunkName: "blog-admin" */ '@frontend/view/BlogEditView.vue'),
        },
        {
            path: '/blog/create',
            meta: {
                title: 'New Blog Post',
                auth: 'admin',
                description: 'Create a new blog post.',
            },
            component: () => import(/* webpackChunkName: "blog-admin" */ '@frontend/view/BlogEditView.vue'),
        },
        {
            path: '/user',
            meta: {
                title: 'User',
                auth: 'user',
                description: 'Information about your currently logged in user.',
            },
            component: () => import(/* webpackChunkName: "user" */ '@frontend/view/UserView.vue'),
        },
        {
            path: '/user/login',
            meta: {
                title: 'Login',
                auth: 'anonymous',
                description: 'Login into an existing user.',
            },
            component: () => import(/* webpackChunkName: "user" */ '@frontend/view/UserLoginView.vue'),
        },
        {
            path: '/user/create',
            meta: {
                title: 'Create User',
                auth: 'anonymous',
                description: 'Create a new user.',
            },
            component: () => import(/* webpackChunkName: "user" */ '@frontend/view/UserCreateView.vue'),
        },
        {
            path: '*',
            meta: {
                title: 'Page Not Found',
                description: 'No page has been found with the current URL.',
            },
            component: () => import('@frontend/view/ErrorNotFoundView.vue'),
        },
    ],
});

appRouter.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
    Utils.updateTitle(to.meta.title || null);
    Utils.updateDescription(to.meta.description || null);

    if (to.meta.auth) {
        AuthHandler.handle(to.meta.auth, next);
    }

    next();
});

export { appRouter };
