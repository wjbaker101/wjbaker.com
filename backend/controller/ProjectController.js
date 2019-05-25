const express = require('express');
const router = express.Router();

const projectService = require('../service/ProjectService.js');

const auth = require('../middleware/AuthMiddleware.js');

router.use(express.json());

router.get('/projects', async (request, response) => {
    try {
        const projects = await projectService.getProjects();

        response.send({
            result: projects,
        });
    }
    catch (exception) {
        console.log(exception.message);
        response.send({ error: `Unable to get a list of projects.` });
    }
});

router.get('/project/:projectID', async (request, response) => {
    try {
        const project = await projectService.getProject(request.params.projectID);

        response.send({
            result: project,
        });
    }
    catch (exception) {
        console.log(exception.message);
        response.send({ error: `Unable to get project with ID=${request.params.projectID}.` });
    }
});

router.patch('/project', auth.doAuthAdmin, async (request, response) => {
    try {
        const result = await projectService.updateProject(request.body);

        response.send({ result: `Successfully updated project.` });
    }
    catch (exception) {
        console.log(exception.message);
        response.send({ result: 'Unable to update project.' });
    }
});

module.exports = router;