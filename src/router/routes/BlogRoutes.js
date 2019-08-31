import TitleUtils from '@/util/TitleUtils.js';

export default [
    {
        path: '/blog',
        component: () => import('@/view/BlogView.vue'),
        props: {
            page: 'blog',
        },
        beforeEnter: (to, from, next) => TitleUtils.setTitle('Blog', next),
    },
    {
        path: '/blog/create',
        component: () => import('@/view/BlogCreateView.vue'),
        props: {},
        beforeEnter: (to, from, next) =>
                TitleUtils.setTitle('Create Blog Post', next),
    },
    {
        path: '/blog/:blogPostID/edit',
        component: () => import('@/view/BlogEditView.vue'),
        props: {},
        beforeEnter: (to, from, next) =>
                TitleUtils.setTitle('Edit Blog Post', next),
    },
    {
        path: '/blog/:blogPostID/(.*)?',
        component: () => import('@/view/BlogPostView.vue'),
        props: {},
        beforeEnter: (to, from, next) => TitleUtils.setTitle('Blog Post', next),
    },
]