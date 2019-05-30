import BlogCreateRoute from '@/components/route/blog/BlogCreateRoute.vue';
import BlogPostRoute from '@/components/route/blog/BlogPostRoute.vue';
import BlogRoute from '@/components/route/blog/BlogRoute.vue';

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
        path: '/blog/:blogPostID/(.*)?',
        component: BlogPostRoute,
        props: {},
    },
]