const express = require('express');
const router = express.Router();

const ValidationError = require('../error/ValidationError.js');

const blogService = require('../service/BlogService.js');
const auth = require('../middleware/AuthMiddleware.js');

router.use(express.json());

router.post('/blog', auth.doAuthAdmin, async (request, response, next) => {
    try {
        const result = await blogService.createBlog(request.body);

        response.status(201).send(result);
    }
    catch (exception) {
        if (exception instanceof ValidationError) {
            response.status(400).send({ error: exception.message });
        }
        else {
            response.status(500).send({ error: exception.message });
        }
    }
});

router.patch('/blog', auth.doAuthAdmin, async (request, response, next) => {
    try {
        await blogService.updateBlogPost(request.body);

        response.send({ result: 'Successfully updated Blog post.' });
    }
    catch (exception) {
        if (exception instanceof ValidationError) {
            response.status(400).send({ error: exception.message });
        }
        else {
            response.status(500).send({ error: exception.message });
        }
    }
});

router.get('/blog/posts', async (request, response, next) => {
    try {
        const isAdmin = request.isAuthenticated()
                && request.session.passport.user.isAdmin;

        const result = await blogService.getBlogPosts(isAdmin);

        response.send({ result });
    }
    catch (exception) {
        response.status(500).send({ error: exception.message });
    }
});

router.get('/blog/:blogPostID', async (request, response, next) => {
    try {
        const { blogPostID } = request.params;

        const result = await blogService.getBlogPost(blogPostID);

        response.send({ result });
    }
    catch (exception) {
        response.status(500).send({ error: exception.message });
    }
});

module.exports = router;