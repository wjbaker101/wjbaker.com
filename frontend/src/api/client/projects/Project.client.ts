import { apiClient, handleError } from '@/api/ApiClient';

import { ApiResultResponse } from '@/api/type/ApiResponse.type';
import { SearchProjectsResponse } from '@/api/client/projects/type/SearchProjects.type';
import { GetProjectByResponse } from '@/api/client/projects/type/GetProjectBy.type';

class ProjectClient {

    public async searchProjects(page: number): Promise<SearchProjectsResponse | Error> {
        try {
            const response = await apiClient.get<ApiResultResponse<SearchProjectsResponse>>('/projects', {
                params: {
                    page,
                },
            });

            return response.data.result;
        }
        catch (error) {
            return handleError(error);
        }
    }

    public async getProjectByUrlSlug(urlSlug: string): Promise<GetProjectByResponse | Error> {
        try {
            const response = await apiClient.get<ApiResultResponse<GetProjectByResponse>>(`/project/${urlSlug}`);

            return response.data.result;
        }
        catch (error) {
            return handleError(error);
        }
    }

    public async getProjectByReference(reference: string): Promise<GetProjectByResponse | Error> {
        try {
            const response = await apiClient.get<ApiResultResponse<GetProjectByResponse>>(`/project/${reference}`);

            return response.data.result;
        }
        catch (error) {
            return handleError(error);
        }
    }
}

export const projectClient = new ProjectClient();