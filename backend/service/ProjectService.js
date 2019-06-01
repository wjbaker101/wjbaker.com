const projectRepository = require('../repository/ProjectRepository.js');
const imageUploadService = require('./ImageUploadService.js');

const titleParser = require('../parse/TitleParser.js');

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

    async createProject(project) {
        if (!project.title) {
            throw new Error('Please add a title for the project.');
        }

        const urlID = titleParser.getTitleURL(project.title);

        const projectModel = {
            ...project,
            urlID,
        };

        try {
            await projectRepository.createProject(projectModel);
        }
        catch (exception) {
            throw new Error('Unable to create the project.');
        }
    }
}

module.exports = new ProjectService();