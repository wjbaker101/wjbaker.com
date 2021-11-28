export interface UpdateProjectsSettingsRequest {
    displayOrder: Array<string>;
}

export interface UpdateProjectsSettingsResponse {
    displayOrder: Array<DisplayOrder>;
}

interface DisplayOrder {
    reference: string;
    title: string;
}