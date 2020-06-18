import { APIClient } from '@frontend/api/APIClient';
import { BlogPostModel } from '@common/model/BlogPostModel';
import { APIResponse } from '@common/interface/APIResponse';

export const BlogAPI = {

    async getBlogPosts(): Promise<BlogPostModel[] | Error> {
        try {
            const response = await APIClient.get<APIResponse<BlogPostModel[]>>('/blog');

            return response.data.result.map(blogPost => ({
                ...blogPost,
                postDate: new Date(blogPost.postDate),
            }));
        }
        catch (exception) {
            return new Error(exception);
        }
    },

    async getBlogPost(id: string): Promise<BlogPostModel | null | Error> {
        try {
            const response = await APIClient.get<APIResponse<BlogPostModel | null>>(`/blog/post/${id}`);

            const blogPost = response.data.result;

            if (blogPost === null) {
                return null;
            }

            return {
                ...blogPost,
                postDate: new Date(blogPost.postDate),
            }
        }
        catch (exception) {
            return new Error(exception);
        }
    },

    async createBlogPost(blogPost: BlogPostModel): Promise<BlogPostModel | Error> {
        try {
            const response = await APIClient.post<APIResponse<BlogPostModel>>('/blog/post', blogPost);

            const createdBlogPost = response.data.result;

            return {
                ...createdBlogPost,
                postDate: new Date(createdBlogPost.postDate),
            }
        }
        catch (exception) {
            return new Error(exception);
        }
    },

    async updateBlogPost(blogPost: BlogPostModel): Promise<void | Error> {
        try {
            await APIClient.patch<APIResponse<boolean>>(`/blog/post/${blogPost.id}`, blogPost);
        }
        catch (exception) {
            return new Error(exception);
        }
    },
}
