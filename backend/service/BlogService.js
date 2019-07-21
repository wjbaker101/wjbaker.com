const blogRepository = require('../repository/BlogRepository.js');
const titleParser = require('../parse/TitleParser.js');
const dtoValidator = require('../validator/DTOValidator.js');
const loggingService = require('./LoggingService.js');

const createOrUpdateBlogPost = async (blogPost, isUpdate = false) => {
    const updatedProperties = isUpdate ? ['blogID', 'modifiedOn'] : [];

    const validProperties = [
        'title',
        'content',
        'summary',
        'createdOn',
        'isPublished',
    ].concat(updatedProperties);

    const validBlogDto = dtoValidator.isValidDTO(blogPost, validProperties);
    const titleUrl = titleParser.getTitleURL(blogPost.title);

    const dto = {
        titleUrl,
        ...validBlogDto,
    };

    if (isUpdate) {
        await blogRepository.updateBlogPost(dto);
    }
    else {
        await blogRepository.createBlog(dto);
    }
};

class BlogService {

    async createBlog(blogPost) {
        createOrUpdateBlogPost(blogPost, false);
    }

    async updateBlogPost(blogPost) {
        createOrUpdateBlogPost(blogPost, true);
    }

    async getBlogPosts(isAdmin) {
        const blogPosts = await blogRepository.getBlogPosts();

        return blogPosts.filter(blogPost =>
                blogPost.isPublished || (!blogPost.isPublished && isAdmin));
    }

    async getBlogPost(blogPostID) {
        try {
            loggingService.addLogEventInBackground('EVENT_BLOG_GET_POST', `PostId=${blogPostID}`);

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
                isPublished: isPublished === 1,
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

module.exports = new BlogService();