import { BlogPostModel } from '@common/model/BlogPostModel';
import { ProjectModel } from '@common/model/ProjectModel';

export interface State {
    blogPosts: BlogPostModel[] | null,
    projects: ProjectModel[] | null,
}
