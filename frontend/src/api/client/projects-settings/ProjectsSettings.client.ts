import { apiClient, asAdminUser, handleError } from '@/api/ApiClient';

import { ApiResultResponse } from '@/api/type/ApiResponse.type';
import { GetProjectsSettingsResponse } from '@/api/client/projects-settings/type/GetProjectsSettings.type';

class ProjectsSettingsClient {

    public async getProjectsSettings(): Promise<GetProjectsSettingsResponse | Error> {
        const authorizationResult = asAdminUser();
        if (authorizationResult instanceof Error)
            return authorizationResult;

        try {
            const response = await apiClient.get<ApiResultResponse<GetProjectsSettingsResponse>>('/projects/settings', {
                headers: {
                    'Authorization': authorizationResult,
                },
            });

            return response.data.result;
        }
        catch (error) {
            return handleError(error);
        }
    }
}

export const projectsSettingsClient = new ProjectsSettingsClient();