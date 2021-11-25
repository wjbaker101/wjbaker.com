export interface SearchProjectsResponse {
    total: number;
    projects: Array<Project>;
}

export interface Project {
    reference: string;
    title: string;
    urlSlug: string;
    startedAt: string;
    summary: string;
    sourceCodeUrl: string | null;
    previewImageUrl: string | null;
    displayOrder: number;
    createdAt: string;
}