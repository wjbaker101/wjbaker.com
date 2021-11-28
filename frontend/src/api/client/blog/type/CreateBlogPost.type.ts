export interface CreateBlogPostRequest {
    title: string;
    urlSlug: string;
    summary: string;
    content: string;
}

export interface CreateBlogPostResponse {
    reference: string;
    title: string;
    urlSlug: string;
    postedAt: string;
    summary: string;
    content: string;
}