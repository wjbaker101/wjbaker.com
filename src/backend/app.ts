import path from 'path';
import express from 'express';
import history from 'connect-history-api-fallback';
import bodyParser from 'body-parser';

import { BlogController } from './controller/BlogController';
import { ProjectController } from '@backend/controller/ProjectController';
import { Logger } from '@backend/util/Logger';
import { Env } from '@common/util/Env';

const config = Env.config();

const app = express();

const controllers = [
    BlogController,
    ProjectController,
];

app.use(bodyParser.json());

controllers.forEach(controller => {
    app.use(config.backend.baseURL, controller);

    controller.stack
            .filter(r => r && r.route && r.route.path)
            .map(r => r.route.path)
            .forEach(p => Logger.log(`Exposing: ${config.backend.baseURL}${p}`));
});

app.use(express.static(path.join(__dirname, '../frontend')));
app.use(history());

export { app };
