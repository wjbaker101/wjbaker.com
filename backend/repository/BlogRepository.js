const mySQLRepository = require('./MySQLRepository.js');

const blogMapper = require('../mapper/BlogMapper.js');

class BlogRepository {

    async createBlog(blog) {
        const blogModel = {
            TITLE: blog.title,
            TITLE_URL: blog.titleUrl,
            CONTENT: blog.content,
            SUMMARY: blog.summary,
            CREATED_ON: blog.createdOn,
        };

        const result = await mySQLRepository.query(
                'INSERT INTO BLOG_POSTS SET ?',
                blogModel);

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

        return result.map(blogPost => blogMapper.map(blogPost));
    }
}

module.exports = new BlogRepository();