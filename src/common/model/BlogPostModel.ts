export interface BlogPostModel {
    id: string,
    title: string,
    urlTitle: string,
    postDate: Date,
    summary: string,
    content?: string,
}
