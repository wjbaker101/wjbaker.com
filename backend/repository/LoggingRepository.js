const mySQLRepository = require('./MySQLRepository.js');

class MySQLRepository {

    async addLogEvent(logName, timestamp, logDetails) {
        const result = await mySQLRepository.query(
                `INSERT INTO LOGGING (LOG_NAME, TIMESTAMP, LOG_DETAILS) VALUES(?, ?, ?)`,
                [logName, timestamp, logDetails]);

        return result.insertId;
    }
}

module.exports = new MySQLRepository();