import { MySQLClient } from '@backend/client/MySQLClient';
import { ProjectEntity } from '@backend/entity/ProjectEntity';
import { ProjectTagEntity } from '@backend/entity/ProjectTagEntity';
import { Logger } from '@backend/util/Logger';
import { TitleUtils } from '@backend/util/TitleUtils';
import { ProjectModel } from '@common/model/ProjectModel';
import { ImageService } from '@backend/service/ImageService';
import { CreateProjectModel } from '@common/model/CreateProjectModel';

export const ProjectService = {

    async getProjects(): Promise<ProjectEntity[] | Error> {
        try {
            return await MySQLClient.query<ProjectEntity[]>('SELECT `ID`, `TITLE`, `START_DATE`, `SUMMARY`, `PREVIEW_IMAGE_URL`, `VIEW_LINK`, `SOURCE_CODE_URL` FROM Projects ORDER BY LIST_ORDER ASC', []);
        }
        catch (exception) {
            Logger.log(exception);
            return new Error(exception);
        }
    },

    async getProject(id: string): Promise<ProjectEntity | null | Error> {
        try {
            const results = await MySQLClient.query<ProjectEntity[]>('SELECT `ID`, `TITLE`, `START_DATE`, `DESCRIPTION`, `SUMMARY`, `PREVIEW_IMAGE_URL`, `VIEW_LINK`, `SOURCE_CODE_URL` FROM Projects WHERE ID = ? LIMIT 1', [id]);

            if (results.length === 0) {
                return null;
            }

            return results[0];
        }
        catch (exception) {
            Logger.log(exception);
            return new Error(exception);
        }
    },

    async getProjectTags(id?: string): Promise<ProjectTagEntity[] | Error> {
        try {
            if (id) {
                return await MySQLClient.query<ProjectTagEntity[]>('SELECT `ID`, `PROJECT_ID`, `NAME` FROM ProjectTags WHERE PROJECT_ID = ? ORDER BY NAME ASC', [id]);
            }
            else {
                return await MySQLClient.query<ProjectTagEntity[]>('SELECT `ID`, `PROJECT_ID`, `NAME` FROM ProjectTags ORDER BY NAME ASC', []);
            }
        }
        catch (exception) {
            Logger.log(exception);
            return new Error(exception);
        }
    },

    async createProject(project: CreateProjectModel): Promise<ProjectModel | Error> {
        try {
            const id = TitleUtils.dashifyTitle(project.title);

            if (id instanceof Error) {
                Logger.log(id.message);
                return id;
            }

            let previewImageURL = null;

            if (project.previewImageBase64 !== null) {
                const result = await ImageService.uploadImageBase64(project.previewImageBase64);

                if (result instanceof Error) {
                    Logger.log(result.message);
                    return result;
                }

                previewImageURL = result;
            }

            await MySQLClient.query<ProjectEntity[]>('INSERT INTO Projects (ID, TITLE, START_DATE, VIEW_LINK, SOURCE_CODE_URL, SUMMARY, PREVIEW_IMAGE_URL, DESCRIPTION) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [
                id,
                project.title,
                project.startDate,
                project.viewLink,
                project.sourceCodeURL,
                project.summary,
                previewImageURL,
                project.description,
            ]);

            return {
                id,
                title: project.title,
                startDate: project.startDate,
                viewLink: project.viewLink,
                sourceCodeURL: project.sourceCodeURL,
                summary: project.summary,
                previewImageURL,
                description: project.description,
                tags: project.tags,
            }
        }
        catch (exception) {
            Logger.log(exception);
            return new Error(exception);
        }
    },

    async updateProject(project: CreateProjectModel): Promise<void | Error> {
        try {
            let previewImageURL = project.previewImageURL;

            if (project.previewImageBase64 !== null) {
                const result = await ImageService.uploadImageBase64(project.previewImageBase64);

                if (result instanceof Error) {
                    return result;
                }

                previewImageURL = result;
            }

            await MySQLClient.query<ProjectEntity[]>('UPDATE Projects Set TITLE = ?, START_DATE = ?, VIEW_LINK = ?, SOURCE_CODE_URL = ?, SUMMARY = ?, PREVIEW_IMAGE_URL = ?, DESCRIPTION = ? WHERE ID = ?', [
                project.title,
                project.startDate,
                project.viewLink,
                project.sourceCodeURL,
                project.summary,
                previewImageURL,
                project.description,
                project.id,
            ]);
        }
        catch (exception) {
            Logger.log(exception);
            return new Error(exception);
        }
    },
}
