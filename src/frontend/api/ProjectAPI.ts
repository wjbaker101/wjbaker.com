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
}
