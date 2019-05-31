import AboutRoute from '@/components/route/about/AboutRoute.vue';
import AboutTimelineRoute from '@/components/route/about/AboutTimelineRoute.vue';

import TitleUtils from '@/util/TitleUtils.js';

export default [
    {
        path: '/',
        component: AboutRoute,
        props: {
            page: 'about',
        },
        beforeEnter: (to, from, next) => TitleUtils.setTitle('About', next),
    },
    {
        path: '/about/timeline',
        component: AboutTimelineRoute,
        props: {},
        beforeEnter: (to, from, next) => TitleUtils.setTitle('Timeline', next),
    }
]