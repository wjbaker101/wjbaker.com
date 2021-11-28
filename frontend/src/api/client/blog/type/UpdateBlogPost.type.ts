export interface UpdateBlogPostRequest {
    title: string;
    urlSlug: string;
    summary: string;
    content: string;
}

export interface UpdateBlogPostResponse {
    reference: string;
    title: string;
    urlSlug: string;
    postedAt: string;
    summary: string;
    content: string;
}