import TitleUtils from '@/util/TitleUtils.js';

export default [
    {
        path: '/about',
        component: () => import('@/view/AboutView.vue'),
        props: {
            page: 'about',
        },
        beforeEnter: (to, from, next) => TitleUtils.setTitle('About', next),
    },
    {
        path: '/about/timeline',
        component: () => import('@/view/AboutTimelineView.vue'),
        props: {},
        beforeEnter: (to, from, next) => TitleUtils.setTitle('Timeline', next),
    },
    {
        path: '/about/cv',
        component: () => import('@/view/AboutCVView.vue'),
        props: {},
        beforeEnter: (to, from, next) => TitleUtils.setTitle('CV', next),
    },
]