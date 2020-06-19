import express, { Request, Response } from 'express';

import { ResponseFactory } from '@backend/factory/ResponseFactory';
import { MulterMiddleware } from '@backend/middleware/MulterMiddleware';
import { ImageService } from '@backend/service/ImageService';

const router = express.Router();

const routes = {

    async uploadImage(request: Request, response: Response) {
        const imageURL
                = await ImageService.uploadImage(request.file.buffer);

        if (imageURL instanceof Error) {
            return response.status(500).send(ResponseFactory.error('Something went wrong when uploading image.'));
        }

        return response.status(201).send(imageURL);
    },
};

router.post('/image',
        MulterMiddleware.single('file'),
        routes.uploadImage);

export { router as ImageController };
