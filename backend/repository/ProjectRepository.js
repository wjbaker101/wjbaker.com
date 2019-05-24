const mysql = require('promise-mysql');
const properties = require('../../secret-properties.json');

const query = async (query) => {
    const connection = await mysql.createConnection(properties['db-wjbaker']);
    const result = await connection.query(query);

    connection.end();

    return result;
};

class ProjectRepository {

    async getAllProjects() {
        return await query('SELECT * FROM Projects');
    }
}

module.exports = new ProjectRepository();