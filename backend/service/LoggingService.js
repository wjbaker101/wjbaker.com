const loggingRepository = require('../repository/LoggingRepository.js');

class LoggingService {

    async addLogEvent(logName, logDetails) {
        return await loggingRepository.addLogEvent(logName, new Date(), logDetails);
    }

    addLogEventInBackground(logName, logDetails) {
        (async () => {
            await this.addLogEvent(logName, logDetails);
        })();
    }
}

module.exports = new LoggingService();