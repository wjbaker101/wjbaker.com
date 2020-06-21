import express, { Request, Response } from 'express';

import { ResponseFactory } from '@backend/factory/ResponseFactory';
import { BlogService } from '@backend/service/BlogService';
import { BlogPostMapper } from '@backend/mapper/BlogPostMapper';
import { AuthMiddleware } from '@backend/middleware/AuthMiddleware';

const router = express.Router();

const routes = {

    async getBlogPosts(request: Request, response: Response) {
        const blogPosts = await BlogService.getBlogPosts();

        if (blogPosts instanceof Error) {
            return response.status(500).send(ResponseFactory.error('Something went wrong when getting blog posts.'));
        }

        return response.send(ResponseFactory.result(blogPosts.map(BlogPostMapper.map)));
    },

    async getBlogPost(request: Request, response: Response) {
        const { id } = request.params;

        const blogPost = await BlogService.getBlogPost(id);

        if (blogPost instanceof Error) {
            return response.status(500).send(ResponseFactory.error('Something went wrong when getting blog post.'));
        }

        return response.send(ResponseFactory.result(blogPost === null ? null : BlogPostMapper.map(blogPost)));
    },

    async createBlogPost(request: Request, response: Response) {
        const blogPost = request.body;

        const insertedBlogPost = await BlogService.createBlogPost(blogPost);

        if (insertedBlogPost instanceof Error) {
            return response.status(500).send(ResponseFactory.error('Something went wrong when creating blog post.'));
        }

        return response.status(201)
                .send(ResponseFactory.result(insertedBlogPost));
    },

    async updateBlogPost(request: Request, response: Response) {
        const blogPost = request.body;

        const insertedBlogPost = await BlogService.updateBlogPost(blogPost);

        if (insertedBlogPost instanceof Error) {
            return response.status(500).send(ResponseFactory.error('Something went wrong when updating blog post.'));
        }

        return response.send(ResponseFactory.result(true));
    },
};

router.get('/blog', routes.getBlogPosts);
router.post('/blog/post', AuthMiddleware.requireAdmin, routes.createBlogPost);
router.get('/blog/post/:id', routes.getBlogPost);
router.patch('/blog/post/:id', AuthMiddleware.requireAdmin, routes.updateBlogPost);

export { router as BlogController };
