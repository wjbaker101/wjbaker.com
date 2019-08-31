import TitleUtils from '@/util/TitleUtils.js';

export default [
    {
        path: '/website/components',
        component: () => import('@/view/WebsiteComponentsView.vue'),
        props: {
            page: 'website-components',
        },
        beforeEnter: (to, from, next) =>
                TitleUtils.setTitle('Website Components', next),
    },
]