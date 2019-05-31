import BlogCreateRoute from '@/components/route/blog/BlogCreateRoute.vue';
import BlogPostRoute from '@/components/route/blog/BlogPostRoute.vue';
import BlogRoute from '@/components/route/blog/BlogRoute.vue';
import BlogEditRoute from '@/components/route/blog/BlogEditRoute.vue';

export default [
    {
        path: '/blog',
        component: BlogRoute,
        props: {
            page: 'blog',
        },
    },
    {
        path: '/blog/create',
        component: BlogCreateRoute,
        props: {},
    },
    {
        path: '/blog/:blogPostID/edit',
        component: BlogEditRoute,
        props: {},
    },
    {
        path: '/blog/:blogPostID/(.*)?',
        component: BlogPostRoute,
        props: {},
    },
]