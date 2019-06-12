const BlogCreateRoute = () => import('@/components/route/blog/BlogCreateRoute.vue');
const BlogPostRoute = () => import('@/components/route/blog/BlogPostRoute.vue');
const BlogRoute = () => import('@/components/route/blog/BlogRoute.vue');
const BlogEditRoute = () => import('@/components/route/blog/BlogEditRoute.vue');

import TitleUtils from '@/util/TitleUtils.js';

export default [
    {
        path: '/blog',
        component: BlogRoute,
        props: {
            page: 'blog',
        },
        beforeEnter: (to, from, next) => TitleUtils.setTitle('Blog', next),
    },
    {
        path: '/blog/create',
        component: BlogCreateRoute,
        props: {},
        beforeEnter: (to, from, next) =>
                TitleUtils.setTitle('Create Blog Post', next),
    },
    {
        path: '/blog/:blogPostID/edit',
        component: BlogEditRoute,
        props: {},
        beforeEnter: (to, from, next) =>
                TitleUtils.setTitle('Edit Blog Post', next),
    },
    {
        path: '/blog/:blogPostID/(.*)?',
        component: BlogPostRoute,
        props: {},
        beforeEnter: (to, from, next) => TitleUtils.setTitle('Blog Post', next),
    },
]