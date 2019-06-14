const ProjectEditRoute = () => import('@/components/route/project/ProjectEditRoute.vue');
const ProjectRoute = () => import('@/components/route/project/ProjectRoute.vue');
const ProjectsRoute = () => import('@/components/route/project/ProjectsRoute.vue');
const ProjectCreateRoute = () => import('@/components/route/project/ProjectCreateRoute.vue');

import TitleUtils from '@/util/TitleUtils.js';

export default [
    {
        path: '/projects/:projectID/edit',
        component: ProjectEditRoute,
        props: {
            page: 'project-edit',
        },
        beforeEnter: (to, from, next) =>
                TitleUtils.setTitle('Edit Project', next),
    },
    {
        path: '/projects/create',
        component: ProjectCreateRoute,
        props: {},
        beforeEnter: (to, from, next) =>
                TitleUtils.setTitle('Create Project', next),
    },
    {
        path: '/projects/:projectID',
        component: ProjectRoute,
        props: {
            page: 'project',
        },
        beforeEnter: (to, from, next) =>
                TitleUtils.setTitle('Project', next),
    },
    {
        path: '/projects',
        component: ProjectsRoute,
        props: {
            page: 'projects',
        },
        beforeEnter: (to, from, next) =>
                TitleUtils.setTitle('Projects', next),
    },
]