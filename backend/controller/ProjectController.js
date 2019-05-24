const express = require('express');
const router = express.Router();

const projectService = require('../service/ProjectService.js');

router.get('/projects', async (request, response) => {
    const projects = await projectService.getProjects();

    response.send({
        result: projects,
    });
});

router.get('/project/:projectID', async (request, response) => {
    const project = await projectService.getProject(request.params.projectID);

    response.send({
        result: project,
    });
});

module.exports = router;