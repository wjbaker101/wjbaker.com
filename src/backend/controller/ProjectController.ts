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
};

router.get('/projects', routes.getProjects);
router.get('/project/:id', routes.getProject);

export { router as ProjectController };
