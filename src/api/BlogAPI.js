import BaseAPI from './BaseAPI.js';

export default {

    async createBlog(blog) {
        return await BaseAPI.post('/blog', blog);
    },

    async getBlogPost(blogPostID) {
        return await BaseAPI.request(`/blog/${blogPostID}`);
    },

    async getPublishedBlogPosts() {
        return await BaseAPI.request('/blog/posts');
    },
}
