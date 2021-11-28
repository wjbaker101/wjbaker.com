export interface GetProjectsSettingsResponse {
    displayOrder: Array<DisplayOrder>;
}

interface DisplayOrder {
    reference: string;
    title: string;
}