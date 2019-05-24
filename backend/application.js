const express = require('express');
const app = express();

const controllers = [
    require('./controller/ProjectController.js'),
];

controllers.forEach(controller => {
    app.use('/api', controller);
})

app.listen(8082, () => {
    console.log('Started application in port: 8082')
});