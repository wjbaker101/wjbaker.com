import Axios from 'axios';

import { userService } from '@/service/user/User.service';

import { ApiErrorResponse } from '@/api/type/ApiResponse.type';
import { UserType } from '@/model/User.model';

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

export const asAdminUser = function (): string | Error {
    const authDetails = userService.getAuthDetails().value;

    if (authDetails === null || authDetails.user.type !== UserType.Admin)
        return Error('You must be logged in with an admin user to use this functionality.');

    return `Bearer ${authDetails.jwt}`;
};