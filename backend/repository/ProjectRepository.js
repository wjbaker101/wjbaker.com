const projectMapper = require('../mapper/ProjectMapper.js');
const mySQLRepository = require('./MySQLRepository.js');

class ProjectRepository {

    async getAllProjects() {
        const result = await mySQLRepository.query('SELECT * FROM PROJECTS');

        return result.map(project => projectMapper.map(project));
    }

    async getProject(id) {
        const result = await mySQLRepository.query(
                `SELECT * FROM PROJECTS WHERE URL_ID=?`,
                id);

        return result.map(project => projectMapper.map(project));
    }

    async updateProject(project) {
        const insertModel = {
            TITLE: project.title,
            URL_ID: project.urlID,
            DATE: project.date,
            SUMMARY: project.summary,
            CONTENT: project.content,
        };

        const result = await mySQLRepository.query(
                `UPDATE PROJECTS SET ? WHERE URL_ID=?`,
                [insertModel, project.urlID]);

        return result;
    }
}

module.exports = new ProjectRepository();