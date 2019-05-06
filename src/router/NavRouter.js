import HomeRoute from '@/components/route/HomeRoute.vue';
import ProjectsRoute from '@/components/route/ProjectsRoute.vue';
import BlogTest from '@/components/route/BlogTest.vue';
import NotFoundRoute from '@/components/route/NotFoundRoute.vue';

const createNavRoute = (path, component, props) => {
    return {
        path,
        component,
        props: props,
    }
};

export default class NavRouter {
    static create = () => ({
        routes: [
            createNavRoute('/', HomeRoute, { page: 'about' }),
            createNavRoute('/projects', ProjectsRoute, { page: 'projects' }),
            createNavRoute('/blog', BlogTest, { page: 'blog' }),
            createNavRoute('/(.+)', NotFoundRoute, { page: undefined }), // Define 404 Not Found last so it has lowest priority
        ],
    });
}