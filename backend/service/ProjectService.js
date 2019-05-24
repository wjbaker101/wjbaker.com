const projectRepository = require('../repository/ProjectRepository.js');

class ProjectService {

    async getProjects() {
        return await projectRepository.getAllProjects();
    }
}

module.exports = new ProjectService();