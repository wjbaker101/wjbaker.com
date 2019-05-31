const express = require('express');
const router = express.Router();

const blogService = require('../service/BlogService.js');
const auth = require('../middleware/AuthMiddleware.js');

router.use(express.json());

router.post('/blog', async (request, response, next) => {
    try {
        const result = await blogService.createBlog(request.body);

        response.send(result);
    }
    catch (exception) {
        response.send({ error: exception.message });
    }
});

router.get('/blog/posts', async (request, response, next) => {
    try {
        const result = await blogService.getPublishedBlogPosts();

        response.send({ result });
    }
    catch (exception) {
        console.log(exception);
        response.send({ error: 'Unable to get list of Blog posts.' });
    }
});

router.get('/blog/:blogPostID', async (request, response, next) => {
    try {
        const { blogPostID } = request.params;

        const result = await blogService.getBlogPost(blogPostID);

        response.send({ result });
    }
    catch (exception) {
        response.send({ error: exception.message });
    }
});

router.patch('/blog', async (request, response, next) => {
    try {
        await blogService.updateBlogPost(request.body);

        response.send({ result: 'Successfully updated Blog post.' });
    }
    catch (exception) {
        response.send({ error: exception.message });
    }
});

module.exports = router;