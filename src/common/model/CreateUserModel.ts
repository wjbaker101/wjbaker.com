import { UserModel } from '@common/model/UserModel';

export interface CreateUserModel extends UserModel {
    password: string,
}
