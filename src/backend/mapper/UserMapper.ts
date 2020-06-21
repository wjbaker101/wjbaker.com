import { IMapper } from '@backend/model/IMapper';
import { UserEntity } from '@backend/entity/UserEntity';
import { UserModel } from '@common/model/UserModel';

export const UserMapper: IMapper<UserEntity, UserModel> = {

    map(value: UserEntity): UserModel {
        const {
            ID: id,
            USERNAME: username,
            IS_ADMIN: isAdmin,
            CREATION_DATE: creationDate,
        } = value;

        return {
            id,
            username,
            isAdmin: !!isAdmin,
            creationDate: new Date(creationDate),
        }
    },
};
