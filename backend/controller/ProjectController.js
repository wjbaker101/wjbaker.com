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

router.post('/project', async (request, response, next) => {
    try {
        const result = await projectService.createProject(request.body);

        response.send(result);
    }
    catch (exception) {
        response.send({ error: exception.message });
    }
});

const multer = require('multer');
const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024, // 4 MiB
    },
});

router.post('/projects/image', upload.single('file'), async (request, response) => {
    const result = await projectService.uploadImage(request.file.buffer);

    console.log(result);

    response.send(result);
});

module.exports = router;