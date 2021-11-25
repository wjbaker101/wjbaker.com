import Axios from 'axios';

import { ApiErrorResponse } from '@/api/type/ApiResponse.type';

export const apiClient = Axios.create({
    baseURL: '/api',
});

export const handleError = function (error: any): Error {
    if (error.response) {
        const response = error.response.data as ApiErrorResponse;

        return new Error(response.errorMessage);
    }

    if (error.request) {
        console.log(error.request as XMLHttpRequest);
    }
    else {
        console.log(error);
    }

    return new Error('Something went wrong with the request, see console for details.');
};