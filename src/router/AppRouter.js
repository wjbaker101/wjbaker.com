import VueRouter from 'vue-router';

import NavRouter from '@/router/NavRouter.js';

import PageRoute from '@/components/route/PageRoute.vue';
import LandingRoute from '@/components/route/LandingRoute.vue';

import TitleUtils from '@/util/TitleUtils.js';

export default new VueRouter({
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