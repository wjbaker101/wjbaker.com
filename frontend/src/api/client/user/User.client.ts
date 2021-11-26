import { apiClient, handleError } from '@/api/ApiClient';

import { ApiResultResponse } from '@/api/type/ApiResponse.type';
import { GetUserByResponse } from '@/api/client/user/type/GetUserBy.type';

class UserClient {

    public async getUserByReference(reference: string): Promise<GetUserByResponse | Error> {
        try {
            const response = await apiClient.post<ApiResultResponse<GetUserByResponse>>(`/user/${reference}`);

            return response.data.result;
        }
        catch (error) {
            return handleError(error);
        }
    }
}

export const userClient = new UserClient();