import { apiClient, handleError } from '@/api/ApiClient';

import { ApiResultResponse } from '@/api/type/ApiResponse.type';
import { SearchBlogResponse } from '@/api/client/blog/type/SearchBlog.type';
import { GetBlogPostByResponse } from '@/api/client/blog/type/GetBlogPostBy.type';

class BlogClient {

    public async searchBlog(page: number): Promise<SearchBlogResponse | Error> {
        try {
            const response = await apiClient.get<ApiResultResponse<SearchBlogResponse>>('/blog/posts', {
                params: {
                    page,
                },
            });

            return response.data.result;
        }
        catch (error) {
            return handleError(error);
        }
    }

    public async getBlogPostByUrlSlug(urlSlug: string): Promise<GetBlogPostByResponse | Error> {
        try {
            const response = await apiClient.get<ApiResultResponse<GetBlogPostByResponse>>(`/blog/post/${urlSlug}`);

            return response.data.result;
        }
        catch (error) {
            return handleError(error);
        }
    }

    public async getBlogPostByReference(reference: string): Promise<GetBlogPostByResponse | Error> {
        try {
            const response = await apiClient.get<ApiResultResponse<GetBlogPostByResponse>>(`/blog/post/${reference}`);

            return response.data.result;
        }
        catch (error) {
            return handleError(error);
        }
    }
}

export const blogClient = new BlogClient();