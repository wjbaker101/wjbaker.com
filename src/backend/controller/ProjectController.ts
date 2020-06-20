import express, { Request, Response } from 'express';

import { ProjectService } from '@backend/service/ProjectService';
import { ResponseFactory } from '@backend/factory/ResponseFactory';
import { ProjectMapper } from '@backend/mapper/ProjectMapper';

const router = express.Router();

const routes = {

    async getProjects(request: Request, response: Response) {
        const projects = await ProjectService.getProjects();

        if (projects instanceof Error) {
            return response.status(500).send(ResponseFactory.error('Something went wrong when getting projects.'));
        }

        return response.send(ResponseFactory.result(projects.map(ProjectMapper.map)));
    },

    async getProject(request: Request, response: Response) {
        const { id } = request.params;

        const project = await ProjectService.getProject(id);

        if (project instanceof Error) {
            return response.status(500).send(ResponseFactory.error('Something went wrong when getting project.'));
        }

        return response.send(ResponseFactory.result(project === null ? null : ProjectMapper.map(project)));
    },

    async createProject(request: Request, response: Response) {
        const project = request.body;

        const insertedProject = await ProjectService.createProject(project);

        if (insertedProject instanceof Error) {
            return response.status(500).send(ResponseFactory.error('Something went wrong when creating project.'));
        }

        return response.status(201)
                .send(ResponseFactory.result(insertedProject));
    },

    async updateProject(request: Request, response: Response) {
        const project = request.body;

        const insertedProject = await ProjectService.updateProject(project);

        if (insertedProject instanceof Error) {
            return response.status(500).send(ResponseFactory.error('Something went wrong when updating project.'));
        }

        return response.send(ResponseFactory.result(true));
    },
};

router.get('/projects', routes.getProjects);
router.post('/project', routes.createProject);
router.get('/project/:id', routes.getProject);
router.patch('/project/:id', routes.updateProject);

export { router as ProjectController };
