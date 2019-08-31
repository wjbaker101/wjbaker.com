import TitleUtils from '@/util/TitleUtils.js';

export default [
    {
        path: '/projects/:projectID/edit',
        component: () => import('@/view/ProjectEditView.vue'),
        props: {
            page: 'project-edit',
        },
        beforeEnter: (to, from, next) =>
                TitleUtils.setTitle('Edit Project', next),
    },
    {
        path: '/projects/create',
        component: () => import('@/view/ProjectCreateView.vue'),
        props: {},
        beforeEnter: (to, from, next) =>
                TitleUtils.setTitle('Create Project', next),
    },
    {
        path: '/projects/:projectID',
        component: () => import('@/view/ProjectView.vue'),
        props: {
            page: 'project',
        },
        beforeEnter: (to, from, next) =>
                TitleUtils.setTitle('Project', next),
    },
    {
        path: '/projects',
        component: () => import('@/view/ProjectListView.vue'),
        props: {
            page: 'projects',
        },
        beforeEnter: (to, from, next) =>
                TitleUtils.setTitle('Projects', next),
    },
]