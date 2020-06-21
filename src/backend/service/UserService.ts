import { v4 as UUID } from 'uuid';
import { sha512 } from 'js-sha512';

import { MySQLClient } from '@backend/client/MySQLClient';
import { UserEntity } from '@backend/entity/UserEntity';
import { UserMapper } from '@backend/mapper/UserMapper';
import { CreateUserModel } from '@common/model/CreateUserModel';
import { UserModel } from '@common/model/UserModel';

export const UserService = {

    async getUserByID(id: string): Promise<UserModel | null | Error> {
        try {
            const result = await MySQLClient.query<UserEntity[]>('SELECT ID, USERNAME, PASSWORD, IS_ADMIN, CREATION_DATE FROM Users WHERE ID = ? LIMIT 1', [id]);

            if (result.length === 0) {
                return null;
            }

            const user = UserMapper.map(result[0]);

            return user;
        }
        catch (exception) {
            return new Error(exception);
        }
    },

    async getUserByCredentials(
            username: string,
            password: string): Promise<UserModel | null | Error> {

        try {
            const result = await MySQLClient.query<UserEntity[]>('SELECT ID, USERNAME, PASSWORD, IS_ADMIN, CREATION_DATE FROM Users WHERE USERNAME = ? LIMIT 1', [username]);

            if (result.length === 0) {
                return null;
            }

            if (result[0].PASSWORD !== sha512(password)) {
                return null;
            }

            return UserMapper.map(result[0]);
        }
        catch (exception) {
            return new Error(exception);
        }
    },

    async createUser(user: CreateUserModel): Promise<UserModel | Error> {

        try {
            const now = new Date();
            const id = UUID();
            const isAdmin = false;

            await MySQLClient.query('INSERT INTO Users (ID, USERNAME, PASSWORD, IS_ADMIN, CREATION_DATE) VALUES (?, ?, ?, ?, ?)', [
                id,
                user.username,
                sha512(user.password),
                isAdmin,
                now,
            ]);

            return {
                id,
                username: user.username,
                isAdmin,
                creationDate: now,
            }
        }
        catch (exception) {
            return new Error(exception);
        }
    },
}
