const displayInfoMessage = require('./message.js');

const createResponse = (code, message, type) =>
{
    const response =
    {
        code: code,
        message: message,
        type: type,
    };
    
    return response;
};

module.exports.createResponse = createResponse;
module.exports.displayInfoMessage = displayInfoMessage;