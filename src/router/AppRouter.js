import VueRouter from 'vue-router';

import BlogRoutes from '@/router/routes/BlogRoutes.js';
import ProjectRoutes from '@/router/routes/ProjectRoutes.js';
import AboutRoutes from '@/router/routes/AboutRoutes.js';
import UserRoutes from '@/router/routes/UserRoutes.js';
import WebsiteRoutes from '@/router/routes/WebsiteRoutes.js';

import TitleUtils from '@/util/TitleUtils.js';

export default new VueRouter({
    // This allows the URLs to be cleaner as they will not contain the /#/, but
    // requires some configuration in the backend
    mode: 'history',

    // Resets the scroll postition when a new page in navigated to
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
            component: () => import('@/view/AppLandingView.vue'),
            props: {
                page: 'landing',
            },
            beforeEnter: (to, from, next) =>
                    TitleUtils.setTitle('Will Baker', next),
        },
        {
            path: '/(.)+',
            component: () => import('@/view/AppPageView.vue'),
            props: {},
            children: [
                ...BlogRoutes,
                ...ProjectRoutes,
                ...AboutRoutes,
                ...UserRoutes,
                ...WebsiteRoutes,
                {
                    // Define last so it has lowest priority
                    path: '/(.+)',
                    component: () => import('@/view/ErrorNotFoundView.vue'),
                    props: {},
                    beforeEnter: (to, from, next) =>
                            TitleUtils.setTitle('Page Not Found', next),
                },
            ],
        },
    ],
});