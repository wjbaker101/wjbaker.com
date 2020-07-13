import { Request, Response, NextFunction } from 'express';

import { Logger } from '@backend/util/Logger';
import { UserModel } from '@common/model/UserModel';

export const LogMiddleware = {

    logRequests(request: Request, response: Response, next: NextFunction) {
        const isAuthenticated = request.isAuthenticated && request.isAuthenticated() ? 'Y' : 'N';

        const isAdmin = isAuthenticated && request.user && (request.user as UserModel).isAdmin ? 'Y' : 'N';

        Logger.log(`(Auth: ${isAuthenticated}, Admin: ${isAdmin}) ${request.method} - ${request.url}`);

        next();
    },
}
