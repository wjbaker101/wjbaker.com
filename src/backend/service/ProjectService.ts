import { MySQLClient } from '@backend/client/MySQLClient';
import { ProjectEntity } from '@backend/entity/ProjectEntity';
import { Logger } from '@backend/util/Logger';
import { TitleUtils } from '@backend/util/TitleUtils';
import { ProjectModel } from '@common/model/ProjectModel';

export const ProjectService = {

    async getProjects(): Promise<ProjectEntity[] | Error> {
        try {
            return await MySQLClient.query<ProjectEntity[]>('SELECT `ID`, `TITLE`, `START_DATE`, `SUMMARY`, `VIEW_LINK`, `SOURCE_CODE_URL` FROM Projects ORDER BY LIST_ORDER ASC', []);
        }
        catch (exception) {
            Logger.log(exception);
            return new Error(exception);
        }
    },

    async getProject(id: string): Promise<ProjectEntity | null | Error> {
        try {
            const results = await MySQLClient.query<ProjectEntity[]>('SELECT `ID`, `TITLE`, `START_DATE`, `DESCRIPTION`, `SUMMARY`, `VIEW_LINK`, `SOURCE_CODE_URL` FROM Projects WHERE ID = ? LIMIT 1', [id]);

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

    async createProject(project: ProjectModel): Promise<ProjectModel | Error> {
        try {
            const id = TitleUtils.dashifyTitle(project.title);

            if (id instanceof Error) {
                Logger.log(id.message);
                return id;
            }

            await MySQLClient.query<ProjectEntity[]>('INSERT INTO Projects (ID, TITLE, START_DATE, VIEW_LINK, SOURCE_CODE_URL, SUMMARY, DESCRIPTION) VALUES(?, ?, ?, ?, ?, ?, ?)', [
                id,
                project.title,
                project.startDate,
                project.viewLink,
                project.sourceCodeURL,
                project.summary,
                project.description,
            ]);

            return {
                ...project,
                id,
            }
        }
        catch (exception) {
            Logger.log(exception);
            return new Error(exception);
        }
    },

    async updateProject(project: ProjectModel): Promise<void | Error> {
        try {
            await MySQLClient.query<ProjectEntity[]>('UPDATE Projects Set TITLE = ?, START_DATE = ?, VIEW_LINK = ?, SOURCE_CODE_URL = ?, SUMMARY = ?, DESCRIPTION = ? WHERE ID = ?', [
                project.title,
                project.startDate,
                project.viewLink,
                project.sourceCodeURL,
                project.summary,
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
