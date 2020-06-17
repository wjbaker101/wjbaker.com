import { MySQLClient } from '@backend/client/MySQLClient';
import { ProjectEntity } from '@backend/entity/ProjectEntity';
import { Logger } from '@backend/util/Logger';

export const ProjectService = {

    async getProjects(): Promise<ProjectEntity[] | Error> {
        try {
            return await MySQLClient.query<ProjectEntity[]>('SELECT `ID`, `TITLE`, `START_DATE`, `SUMMARY`, `SOURCE_CODE_URL` FROM Projects ORDER BY LIST_ORDER ASC', []);
        }
        catch (exception) {
            Logger.log(exception);
            return new Error(exception);
        }
    },

    async getProject(id: string): Promise<ProjectEntity | null | Error> {
        try {
            const results = await MySQLClient.query<ProjectEntity[]>('SELECT `ID`, `TITLE`, `START_DATE`, `DESCRIPTION`, `SUMMARY`, `SOURCE_CODE_URL` FROM Projects WHERE ID = ? LIMIT 1', [id]);

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
}
