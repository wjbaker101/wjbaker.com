import express, { Request, Response } from 'express';

import { ResponseFactory } from '@backend/factory/ResponseFactory';
import { BlogService } from '@backend/service/BlogService';
import { BlogPostMapper } from '@backend/mapper/BlogPostMapper';

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
};

router.get('/blog', routes.getBlogPosts);
router.get('/blog/post/:id', routes.getBlogPost);

export { router as BlogController };
