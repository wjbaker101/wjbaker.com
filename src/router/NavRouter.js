const LoginRoute = () => import('@/components/route/LoginRoute.vue');
const UserRoute = () => import('@/components/route/UserRoute.vue');
const NotFoundRoute = () => import('@/components/route/NotFoundRoute.vue');

import BlogRouter from '@/router/type/BlogRouter.js';
import ProjectRouter from '@/router/type/ProjectRouter.js';
import AboutRouter from '@/router/type/AboutRouter.js';

import TitleUtils from '@/util/TitleUtils.js';

export default [
    ...BlogRouter,
    ...ProjectRouter,
    ...AboutRouter,
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
]