import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import { ResponseFactory } from '@backend/factory/ResponseFactory';
import { AuthMiddleware } from '@backend/middleware/AuthMiddleware';
import { UserService } from '@backend/service/UserService';
import { CreateUserModel } from '@common/model/CreateUserModel';

const router = express.Router();

const routes = {

    async login(request: Request, response: Response, next: NextFunction) {
        passport.authenticate('local', (error, user, info) => {
            if (error) {
                return response.status(500).send(ResponseFactory.error('Something went wrong when logging in.'));
            }

            if (!user) {
                return response.status(403).send(ResponseFactory.error(info));
            }

            request.logIn(user, (error) => {
                if (error) {
                    return response.status(500).send(ResponseFactory.error('Something went wrong when logging in.'));
                }

                return response.send(ResponseFactory.result(user));
            });

        })(request, response, next);
    },

    async createUser(request: Request, response: Response) {
        const user: CreateUserModel = request.body;

        const result = await UserService.createUser(user);

        if (result instanceof Error) {
            return response.status(500).send(ResponseFactory.error('Something went wrong when creating user.'))
        }

        return response.status(201).send(ResponseFactory.result(result));
    },
};

router.post('/user', AuthMiddleware.requireAnonymous, routes.createUser);
router.post('/user/login', routes.login);

export { router as UserController };
