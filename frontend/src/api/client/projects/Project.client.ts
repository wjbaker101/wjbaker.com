import { apiClient, handleError } from '@/api/ApiClient';

import { ApiResultResponse } from '@/api/type/ApiResponse.type';
import { SearchProjectsResponse } from '@/api/client/type/SearchProjects.type';

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
}

export const projectClient = new ProjectClient();