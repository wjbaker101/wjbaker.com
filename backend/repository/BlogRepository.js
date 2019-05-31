const mySQLRepository = require('./MySQLRepository.js');

const blogPostMapper = require('../mapper/BlogPostMapper.js');

class BlogRepository {

    async createBlog(blogPost) {
        const blogPostModel = blogPostMapper.mapToDBModel(blogPost);

        const result = await mySQLRepository.query(
                'INSERT INTO BLOG_POSTS SET ?',
                blogPostModel);

        return result.insertId;
    }

    async getBlogPost(blogPostID) {
        const result = await mySQLRepository.query(
                'SELECT * FROM BLOG_POSTS WHERE BLOG_ID=?',
                [blogPostID]);

        return result;
    }

    async getPublishedBlogPosts() {
        const result = await mySQLRepository.query(
                'SELECT * FROM BLOG_POSTS WHERE IS_PUBLISHED=1');

        return result.map(blogPost => blogPostMapper.map(blogPost));
    }

    async updateBlogPost(blogPost) {
        const blogPostModel = blogPostMapper.mapToDBModel(blogPost);

        const result = await mySQLRepository.query(
                `UPDATE BLOG_POSTS SET ? WHERE BLOG_ID=?`,
                [blogPostModel, blogPost.blogID]);

        return result;
    }
}

module.exports = new BlogRepository();