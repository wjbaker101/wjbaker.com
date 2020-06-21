import { BlogPostModel } from '@common/model/BlogPostModel';
import { ProjectModel } from '@common/model/ProjectModel';
import { UserModel } from '@common/model/UserModel';

export interface State {
    blogPosts: BlogPostModel[] | null,
    projects: ProjectModel[] | null,
    user: UserModel | null,
}
