export interface SearchProjectsResponse {
    total: number;
    projects: Array<Project>;
    tagFrequencies: Array<TagFrequency>;
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
    viewUrl: string | null;
    tags: Array<string>;
}

export interface TagFrequency {
    tag: string;
    frequency: number;
}