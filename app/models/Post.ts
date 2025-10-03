export interface IPost {
    readonly title: string;
    readonly slug: string;
    readonly createdAt: Date;
    readonly description: string;
}

export function createPost(post: IPost): IPost {
    return post;
}