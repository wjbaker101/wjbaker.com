export interface UpdateProjectRequest {
    title: string;
    urlSlug: string;
    startedAt: string;
    summary: string;
    description: string | null;
    sourceCodeUrl: string | null;
    previewImageUrl: string | null;
    displayOrder: number;
    viewUrl: string | null;
    tags: Array<string>;
}

export interface UpdateProjectResponse {
    reference: string;
    title: string;
    urlSlug: string;
    startedAt: string;
    summary: string;
    description: string | null;
    sourceCodeUrl: string | null;
    previewImageUrl: string | null;
    displayOrder: number;
    createdAt: string;
    viewUrl: string | null;
    tags: Array<string>;
}