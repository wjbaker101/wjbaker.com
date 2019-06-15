const projectRepository = require('../repository/ProjectRepository.js');
const imageUploadClient = require('../client/ImageUploadClient.js');

const titleParser = require('../parse/TitleParser.js');
const properties = require('../../properties.json');

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
            const imageURL = await imageUploadClient.uploadImage(
                    'avatar.jpg',
                    fileBuffer);

            return `${properties['image-upload-service']['base-url']}${imageURL}`;
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