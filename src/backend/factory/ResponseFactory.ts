import { APIResponse } from '@common/interface/APIResponse';
import { ErrorResponse } from '@common/interface/ErrorResponse';

export const ResponseFactory = {

    error(error: string): ErrorResponse {
        return {
            error,
        }
    },

    result<T>(result: T): APIResponse<T> {
        return {
            result,
        }
    },
}
