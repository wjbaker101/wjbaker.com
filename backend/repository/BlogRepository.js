const mySQLRepository = require('./MySQLRepository.js');

const blogPostMapper = require('../mapper/BlogPostMapper.js');

class BlogRepository {

    async createBlog(blogPost) {
        try {
            const blogPostModel = blogPostMapper.toEntity(blogPost);

            const result = await mySQLRepository.query(
                    'INSERT INTO BLOG_POSTS SET ?',
                    blogPostModel);

            return result.insertId;
        }
        catch (exception) {
            throw new Error('Unable to add blog to database.');
        }
    }

    async updateBlogPost(blogPost) {
        try {
            const blogPostModel = blogPostMapper.toEntity(blogPost);

            console.log(blogPost);

            const result = await mySQLRepository.query(
                    `UPDATE BLOG_POSTS SET ? WHERE BLOG_ID=?`,
                    [blogPostModel, blogPost.blogID]);

            return result;
        }
        catch (exception) {
            throw new Error(`Unable to update blog post in database with id=${blogPost.blogID}.`);
        }
    }

    async getBlogPosts() {
        try {
            const result = await mySQLRepository.query(
                    'SELECT * FROM BLOG_POSTS ORDER BY CREATED_ON DESC');

            return result.map(blogPost => blogPostMapper.map(blogPost));
        }
        catch (exception) {
            throw new Error('Unable to get blog posts from database.');
        }
    }

    async getBlogPost(blogPostID) {
        try {
        const result = await mySQLRepository.query(
                'SELECT * FROM BLOG_POSTS WHERE BLOG_ID=?',
                [blogPostID]);

        return result;
        }
        catch (exception) {
            throw new Error(`Unable to get blog post in database with id=${blogPostID}.`);
        }
    }
}

module.exports = new BlogRepository();