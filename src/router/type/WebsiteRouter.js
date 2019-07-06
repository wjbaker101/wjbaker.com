const ComponentsRoute = () => import('@/components/route/website/ComponentsRoute.vue');

import TitleUtils from '@/util/TitleUtils.js';

export default [
    {
        path: '/website/components',
        component: ComponentsRoute,
        props: {
            page: 'website-components',
        },
        beforeEnter: (to, from, next) =>
                TitleUtils.setTitle('Website Components', next),
    },
]