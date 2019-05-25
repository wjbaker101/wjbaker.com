const projectRepository = require('../repository/ProjectRepository.js');

class ProjectService {

    async getProjects() {
        return await projectRepository.getAllProjects();
    }

    async getProject(id) {
        const result = await projectRepository.getProject(id);

        if (result.length === 0) {
            return null;
        }

        return result[0];
    }

    async updateProject(project) {
        return await projectRepository.updateProject(project);
    }
}

module.exports = new ProjectService();