import { APIClient } from '@frontend/api/APIClient';
import { APIResponse } from '@common/interface/APIResponse';
import { CreateUserModel } from '@common/model/CreateUserModel';
import { UserModel } from '@common/model/UserModel';

export const UserAPI = {

    async login(
            username: string,
            password: string): Promise<UserModel | Error> {

        try {
            const result = await APIClient.post<APIResponse<UserModel>>('/user/login', {
                username,
                password,
            });

            const user = result.data.result;

            return {
                ...user,
                creationDate: new Date(user.creationDate),
            }
        }
        catch (exception) {
            return new Error(exception);
        }
    },

    async createUser(user: CreateUserModel): Promise<UserModel | Error> {
        try {
            const result = await APIClient.post<APIResponse<UserModel>>('/user', user);

            const createdUser = result.data.result;

            return {
                ...createdUser,
                creationDate: new Date(createdUser.creationDate),
            }
        }
        catch (exception) {
            return new Error(exception);
        }
    },

    async logout(): Promise<void | Error> {
        try {
            await APIClient.post<boolean>('/user/logout');
        }
        catch (exception) {
            return new Error(exception);
        }
    },
}
