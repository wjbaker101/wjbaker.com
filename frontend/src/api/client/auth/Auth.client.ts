import { apiClient, handleError } from '@/api/ApiClient';

import { ApiResultResponse } from '@/api/type/ApiResponse.type';
import { LogInRequest, LogInResponse } from '@/api/client/auth/type/LogIn.type';

class AuthClient {

    public async logIn(request: LogInRequest): Promise<LogInResponse | Error> {
        try {
            const response = await apiClient.post<ApiResultResponse<LogInResponse>>('/auth/log-in', request);

            return response.data.result;
        }
        catch (error) {
            return handleError(error);
        }
    }
}

export const authClient = new AuthClient();