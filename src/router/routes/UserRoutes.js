import TitleUtils from '@/util/TitleUtils.js';

export default [
    {
        path: '/login',
        component: () => import('@/view/UserLoginView.vue'),
        props: {
            page: 'login',
        },
        beforeEnter: (to, from, next) => TitleUtils.setTitle('Login', next),
    },
    {
        path: '/user',
        component: () => import('@/view/UserView.vue'),
        props: {
            page: 'user',
        },
        beforeEnter: (to, from, next) => TitleUtils.setTitle('User', next),
    },
]