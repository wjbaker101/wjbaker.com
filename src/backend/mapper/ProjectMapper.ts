import { IMapper } from '@backend/model/IMapper';
import { ProjectModel } from '@common/model/ProjectModel';
import { ProjectEntity } from '@backend/entity/ProjectEntity';

export const ProjectMapper: IMapper<ProjectEntity, ProjectModel> = {

    map(value: ProjectEntity): ProjectModel {
        const {
            ID: id,
            TITLE: title,
            START_DATE: startDate,
            DESCRIPTION: description,
            SUMMARY: summary,
            PREVIEW_IMAGE_URL: previewImageURL,
            VIEW_LINK: viewLink,
            SOURCE_CODE_URL: sourceCodeURL,
        } = value;

        return {
            id,
            title,
            startDate,
            description,
            summary,
            previewImageURL,
            viewLink,
            sourceCodeURL,
            tags: [],
        }
    },
};
