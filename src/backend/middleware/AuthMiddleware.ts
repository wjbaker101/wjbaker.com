import { Request, Response, NextFunction } from 'express';

import { UserModel } from '@common/model/UserModel';
import { ResponseFactory } from '@backend/factory/ResponseFactory';

const isAuthenticated = (request: Request) => {
    return request.isAuthenticated && request.isAuthenticated();
};

export const AuthMiddleware = {

    requireAnonymous(request: Request, response: Response, next: NextFunction) {
        if (isAuthenticated(request)) {
            return response.status(403).send(ResponseFactory.error('This functionality requires no current authentication.'));
        }

        next();
    },

    requireUser(request: Request, response: Response, next: NextFunction) {
        if (!isAuthenticated(request)) {
            return response.status(403).send(ResponseFactory.error('This functionality requires authentication.'));
        }

        next();
    },

    requireAdmin(request: Request, response: Response, next: NextFunction) {
        if (!isAuthenticated(request)) {
            return response.status(403).send(ResponseFactory.error('This functionality requires authentication.'));
        }

        const user = request.user as UserModel;

        if (!user.isAdmin) {
            return response.status(403).send(ResponseFactory.error('This functionality requires admin privileges.'));
        }

        next();
    },
}
