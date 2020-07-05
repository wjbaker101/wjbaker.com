export interface ProjectModel {
    id: string,
    title: string,
    startDate: string,
    summary: string,
    viewLink: string | null,
    sourceCodeURL: string | null,
    previewImageURL: string | null,
    description?: string,
    tags: string[],
}
