import VueRouter from 'vue-router';

import AboutRoute from '@/components/route/AboutRoute.vue';
import ProjectEditRoute from '@/components/route/ProjectEditRoute.vue';
import ProjectRoute from '@/components/route/ProjectRoute.vue';
import ProjectsRoute from '@/components/route/ProjectsRoute.vue';
import BlogTest from '@/components/route/BlogTest.vue';
import NotFoundRoute from '@/components/route/NotFoundRoute.vue';

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: AboutRoute,
            props: {
                page: 'about',
            },
        },
        {
            path: '/projects/:projectID/edit',
            component: ProjectEditRoute,
            props: {
                page: 'project-edit',
            },
        },
        {
            path: '/projects/:projectID',
            component: ProjectRoute,
            props: {
                page: 'project',
            },
        },
        {
            path: '/projects',
            component: ProjectsRoute,
            props: {
                page: 'projects',
            },
        },
        {
            path: '/blog',
            component: BlogTest,
            props: {
                page: 'blog',
            },
        },
        {
            // Define 404 Not Found last so it has lowest priority
            path: '/(.+)',
            component: NotFoundRoute,
            props: {},
        },
    ],
});