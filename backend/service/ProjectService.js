const projectRepository = require('../repository/ProjectRepository.js');
const imageUploadService = require('./ImageUploadService.js');

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

    async uploadImage(fileBuffer) {
        try {
            return await imageUploadService.uploadImage(fileBuffer);
        }
        catch (exception) {
            return exception;
        }
    }
}

module.exports = new ProjectService();