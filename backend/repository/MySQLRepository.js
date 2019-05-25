const mysql = require('promise-mysql');
const properties = require('../../secret-properties.json');

class MySQLRepository {

    async query(query, values = []) {
        const connection = await mysql.createConnection(properties['db-wjbaker']);
        const result = await connection.query(query, values);

        connection.end();

        return result;
    }
}

module.exports = new MySQLRepository();