const displayInfoMessage = (selector, message) =>
{
    const messageOutput = document.querySelector(selector);
    
    if (!messageOutput) return;

    messageOutput.innerHTML = message.message;

    messageOutput.classList.remove('text-error');
    messageOutput.classList.remove('text-warning');
    messageOutput.classList.remove('text-success');

    if (message.type !== 'REGULAR')
    {
        const messageType = message.type.toLowerCase();

        messageOutput.classList.add(`text-${messageType}`);
    }
};

module.exports = displayInfoMessage;