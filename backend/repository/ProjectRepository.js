const mysql = require('promise-mysql');
const properties = require('../../secret-properties.json');

const projectMapper = require('../mapper/ProjectMapper.js');

const query = async (query) => {
    const connection = await mysql.createConnection(properties['db-wjbaker']);
    const result = await connection.query(query);

    connection.end();

    return result;
};

class ProjectRepository {

    async getAllProjects() {
        const result = await query('SELECT * FROM PROJECTS');

        return result.map(project => projectMapper.map(project));
    }

    async getProject(id) {
        const result =
                await query(`SELECT * FROM PROJECTS WHERE URL_ID='${id}'`);

        return result.map(project => projectMapper.map(project));
    }
}

module.exports = new ProjectRepository();