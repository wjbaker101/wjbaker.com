export interface GetProjectByResponse {
    reference: string;
    title: string;
    urlSlug: string;
    startedAt: string;
    summary: string;
    description: string;
    sourceCodeUrl: string | null;
    previewImageUrl: string | null;
    displayOrder: number;
    createdAt: string;
    viewUrl: string | null;
    tags: Array<string>;
}