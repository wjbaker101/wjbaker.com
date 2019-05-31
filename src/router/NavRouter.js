import VueRouter from 'vue-router';

import AboutRoute from '@/components/route/AboutRoute.vue';
import ProjectEditRoute from '@/components/route/ProjectEditRoute.vue';
import ProjectRoute from '@/components/route/ProjectRoute.vue';
import ProjectsRoute from '@/components/route/ProjectsRoute.vue';
import LoginRoute from '@/components/route/LoginRoute.vue';
import UserRoute from '@/components/route/UserRoute.vue';
import NotFoundRoute from '@/components/route/NotFoundRoute.vue';

import BlogRouter from '@/router/BlogRouter.js';

import TitleUtils from '@/util/TitleUtils.js';

export default new VueRouter({
    routes: [
        ...BlogRouter,
        {
            path: '/',
            component: AboutRoute,
            props: {
                page: 'about',
            },
            beforeEnter: (to, from, next) => TitleUtils.setTitle('About', next),
        },
        {
            path: '/projects/:projectID/edit',
            component: ProjectEditRoute,
            props: {
                page: 'project-edit',
            },
            beforeEnter: (to, from, next) =>
                    TitleUtils.setTitle('Edit Project', next),
        },
        {
            path: '/projects/:projectID',
            component: ProjectRoute,
            props: {
                page: 'project',
            },
            beforeEnter: (to, from, next) =>
                    TitleUtils.setTitle('Project', next),
        },
        {
            path: '/projects',
            component: ProjectsRoute,
            props: {
                page: 'projects',
            },
            beforeEnter: (to, from, next) =>
                    TitleUtils.setTitle('Projects', next),
        },
        {
            path: '/login',
            component: LoginRoute,
            props: {
                page: 'login',
            },
            beforeEnter: (to, from, next) => TitleUtils.setTitle('Login', next),
        },
        {
            path: '/user',
            component: UserRoute,
            props: {
                page: 'user',
            },
            beforeEnter: (to, from, next) => TitleUtils.setTitle('User', next),
        },
        {
            // Define 404 Not Found last so it has lowest priority
            path: '/(.+)',
            component: NotFoundRoute,
            props: {},
            beforeEnter: (to, from, next) =>
                    TitleUtils.setTitle('Page Not Found', next),
        },
    ],
});