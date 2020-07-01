import { ProjectModel } from '@common/model/ProjectModel';

export interface CreateProjectModel extends ProjectModel {
    previewImageBase64: string | null,
}
