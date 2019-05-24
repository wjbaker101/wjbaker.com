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
}

module.exports = new ProjectService();