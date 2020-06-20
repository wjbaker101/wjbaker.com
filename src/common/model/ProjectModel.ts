export interface ProjectModel {
    id: string,
    title: string,
    startDate: string,
    summary: string,
    sourceCodeURL: string | null,
    description?: string,
}
