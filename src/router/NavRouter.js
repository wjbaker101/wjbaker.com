import VueRouter from 'vue-router';

import LandingRoute from '@/components/route/LandingRoute.vue';
import LoginRoute from '@/components/route/LoginRoute.vue';
import UserRoute from '@/components/route/UserRoute.vue';
import NotFoundRoute from '@/components/route/NotFoundRoute.vue';

import BlogRouter from '@/router/BlogRouter.js';
import ProjectRouter from '@/router/ProjectRouter.js';
import AboutRouter from '@/router/AboutRouter.js';

import TitleUtils from '@/util/TitleUtils.js';

export default new VueRouter({
    routes: [
        ...BlogRouter,
        ...ProjectRouter,
        ...AboutRouter,
        {
            path: '/',
            component: LandingRoute,
            props: {
                page: 'landing',
            },
            beforeEnter: (to, from, next) =>
                    TitleUtils.setTitle('Will Baker', next),
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