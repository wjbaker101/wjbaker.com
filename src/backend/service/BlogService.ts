import { MySQLClient } from '@backend/client/MySQLClient';
import { TrianglifyClient } from '@backend/client/TrianglifyClient';
import { Logger } from '@backend/util/Logger';
import { BlogPostEntity } from '@backend/entity/BlogPostEntity';

export const BlogService = {

    async getBlogPosts(): Promise<BlogPostEntity[] | Error> {
        try {
            return await MySQLClient.query<BlogPostEntity[]>('SELECT `ID`, `TITLE`, `POST_DATE`, `SUMMARY` FROM BlogPosts ORDER BY POST_DATE DESC', []);
        }
        catch (exception) {
            Logger.log(exception);
            return new Error(exception);
        }
    },

    async getBlogPost(id: string): Promise<BlogPostEntity | null | Error> {
        try {
            const results = await MySQLClient.query<BlogPostEntity[]>('SELECT `ID`, `TITLE`, `POST_DATE`, `CONTENT`, `SUMMARY` FROM BlogPosts WHERE ID = ? LIMIT 1', [id]);

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

    createBlogPost() {
        const image = TrianglifyClient.generateSVG(330, 253, 60);
    },
}
