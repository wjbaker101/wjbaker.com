import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import expressSession from 'express-session';
import history from 'connect-history-api-fallback';
import passport from 'passport';

import { BlogController } from '@backend/controller/BlogController';
import { ImageController } from '@backend/controller/ImageController';
import { ProjectController } from '@backend/controller/ProjectController';
import { UserController } from '@backend/controller/UserController';
import { LogMiddleware } from '@backend/middleware/LogMiddleware';
import { Logger } from '@backend/util/Logger';
import { Env } from '@common/util/Env';
import secretConfig from '@common/config/secret-properties.json';

import '@backend/util/PassportInitialiser';

const config = Env.config();

const app = express();

const session = expressSession({
    secret: secretConfig.backend.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: Env.isProduction(),
    },
});

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

const controllers = [
    BlogController,
    ImageController,
    ProjectController,
    UserController,
];

app.use(config.backend.baseURL, LogMiddleware.logRequests);

controllers.forEach(controller => {
    app.use(config.backend.baseURL, controller);

    controller.stack
            .filter(r => r && r.route && r.route.path)
            .map(r => r.route.path)
            .forEach(p => Logger.log(`Exposing: ${config.backend.baseURL}${p}`));
});

app.use(history());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(bodyParser.json());

export { app }
