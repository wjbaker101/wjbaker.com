import VueRouter from 'vue-router';

import AboutRoute from '@/components/route/AboutRoute.vue';
import ProjectEditRoute from '@/components/route/ProjectEditRoute.vue';
import ProjectRoute from '@/components/route/ProjectRoute.vue';
import ProjectsRoute from '@/components/route/ProjectsRoute.vue';
import LoginRoute from '@/components/route/LoginRoute.vue';
import UserRoute from '@/components/route/UserRoute.vue';
import NotFoundRoute from '@/components/route/NotFoundRoute.vue';

import BlogRouter from '@/router/BlogRouter.js';

export default new VueRouter({
    routes: [
        ...BlogRouter,
        {
            path: '/',
            component: AboutRoute,
            props: {
                page: 'about',
            },
        },
        {
            path: '/projects/:projectID/edit',
            component: ProjectEditRoute,
            props: {
                page: 'project-edit',
            },
        },
        {
            path: '/projects/:projectID',
            component: ProjectRoute,
            props: {
                page: 'project',
            },
        },
        {
            path: '/projects',
            component: ProjectsRoute,
            props: {
                page: 'projects',
            },
        },
        {
            path: '/login',
            component: LoginRoute,
            props: {
                page: 'login',
            },
        },
        {
            path: '/user',
            component: UserRoute,
            props: {
                page: 'user',
            },
        },
        {
            // Define 404 Not Found last so it has lowest priority
            path: '/(.+)',
            component: NotFoundRoute,
            props: {},
        },
    ],
});