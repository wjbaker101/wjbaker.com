export interface SearchBlogResponse {
    total: number;
    posts: Array<BlogPost>;
}

interface BlogPost {
    reference: string;
    title: string;
    urlSlug: string;
    postedAt: string;
    summary: string;
}