import VueRouter from 'vue-router';

import NavRouter from '@/router/NavRouter.js';

const PageRoute = () => import('@/components/route/PageRoute.vue');
const LandingRoute = () => import('@/components/route/LandingRoute.vue');

import TitleUtils from '@/util/TitleUtils.js';

export default new VueRouter({
    mode: 'history',

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition;
        }
        else {
          return { x: 0, y: 0 };
        }
    },

    routes: [
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
            path: '/(.)+',
            component: PageRoute,
            props: {},
            children: NavRouter,
        },
    ],
});