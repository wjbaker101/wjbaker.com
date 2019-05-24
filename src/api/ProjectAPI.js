import BaseAPI from './BaseAPI.js';

export default {

    async getProjects() {
        return await BaseAPI.request('/projects');
    },

    async getProject(id) {
        return await BaseAPI.request(`/project/${id}`);
    },
}
