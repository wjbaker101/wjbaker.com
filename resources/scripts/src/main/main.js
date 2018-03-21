const ajax = require('./ajax/ajax');
const response = require('./ajax/response/response');

const wjbaker =
{
    ajax: ajax,
    response: response,
};

window.wjbaker = wjbaker;