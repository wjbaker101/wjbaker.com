import { APIClient } from '@frontend/api/APIClient';
import { BlogPostModel } from '@common/model/BlogPostModel';
import { APIResponse } from '@common/interface/APIResponse';

export const BlogAPI = {

    async getBlogPosts(): Promise<BlogPostModel[] | Error> {
        try {
            const response = await APIClient.get<APIResponse<BlogPostModel[]>>('/blog');

            return response.data.result.map(p => ({
                ...p,
                postDate: new Date(p.postDate),
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
                postDate: new Date(blogPost?.postDate),
            }
        }
        catch (exception) {
            return new Error(exception);
        }
    },
}
