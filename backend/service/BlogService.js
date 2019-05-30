const blogRepository = require('../repository/BlogRepository.js');

class UserService {

    async createBlog(blog) {
        if (!blog.title) {
            throw new Error('Please add a title for your Blog post.');
        }

        try {
            await blogRepository.createBlog(blog);
        }
        catch (exception) {
            throw new Error('Unable to create the Blog post.');
        }
    }

    async getBlogPost(blogPostID) {
        try {
            const result = await blogRepository.getBlogPost(blogPostID);

            if (result.length === 0) {
                return null;
            }

            const {
                BLOG_ID: blogID,
                TITLE: title,
                TITLE_URL: titleUrl,
                CONTENT: content,
                SUMMARY: summary,
                CREATED_ON: createdOn,
                MODIFIED_ON: modifiedOn,
                IS_PUBLISHED: isPublished,
            } = result[0];

            return {
                blogID,
                title,
                titleUrl,
                content,
                summary,
                createdOn,
                modifiedOn,
                isPublished,
            }
        }
        catch (exception) {
            throw new Error('Unable to get the Blog post.');
        }
    }

    async getPublishedBlogPosts() {
        return await blogRepository.getPublishedBlogPosts();
    }
}

module.exports = new UserService();