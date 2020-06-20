import { APIClient } from '@frontend/api/APIClient';
import { ProjectModel } from '@common/model/ProjectModel';
import { APIResponse } from '@common/interface/APIResponse';

export const ProjectAPI = {

    async getProjects(): Promise<ProjectModel[] | Error> {
        try {
            const response = await APIClient.get<APIResponse<ProjectModel[]>>('/projects');

            return response.data.result;
        }
        catch (exception) {
            return new Error(exception);
        }
    },

    async getProject(id: string): Promise<ProjectModel | null | Error> {
        try {
            const response = await APIClient.get<APIResponse<ProjectModel | null>>(`/project/${id}`);

            return response.data.result;
        }
        catch (exception) {
            return new Error(exception);
        }
    },

    async createProject(project: ProjectModel): Promise<ProjectModel | Error> {
        try {
            const response = await APIClient.post<APIResponse<ProjectModel>>('/project', project);

            return response.data.result;
        }
        catch (exception) {
            return new Error(exception);
        }
    },

    async updateProject(project: ProjectModel): Promise<void | Error> {
        try {
            await APIClient.patch<APIResponse<boolean>>(`/project/${project.id}`, project);
        }
        catch (exception) {
            return new Error(exception);
        }
    },
}
