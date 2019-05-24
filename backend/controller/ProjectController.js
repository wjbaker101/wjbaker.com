const express = require('express');
const router = express.Router();

const projectService = require('../service/ProjectService.js');

router.get('/projects', async (request, response) => {
    const projects = await projectService.getProjects();

    response.send({
        result: projects,
    });
});

module.exports = router;