import shortid from 'shortid';

import { MySQLClient } from '@backend/client/MySQLClient';
import { Logger } from '@backend/util/Logger';
import { BlogPostEntity } from '@backend/entity/BlogPostEntity';
import { BlogPostModel } from '@common/model/BlogPostModel';
import { TitleUtils } from '@backend/util/TitleUtils';

export const BlogService = {

    async getBlogPosts(): Promise<BlogPostEntity[] | Error> {
        try {
            return await MySQLClient.query<BlogPostEntity[]>('SELECT `ID`, `TITLE`, `URL_TITLE`, `POST_DATE`, `SUMMARY` FROM BlogPosts ORDER BY POST_DATE DESC', []);
        }
        catch (exception) {
            Logger.log(exception);
            return new Error(exception);
        }
    },

    async getBlogPost(id: string): Promise<BlogPostEntity | null | Error> {
        try {
            const results = await MySQLClient.query<BlogPostEntity[]>('SELECT `ID`, `TITLE`, `URL_TITLE`, `POST_DATE`, `CONTENT`, `SUMMARY` FROM BlogPosts WHERE ID = ? LIMIT 1', [id]);

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

    async createBlogPost(blogPost: BlogPostModel): Promise<BlogPostModel | Error> {
        try {
            const id = shortid.generate();
            const now = new Date();
            const urlTitle = TitleUtils.dashifyTitle(blogPost.title);

            if (urlTitle instanceof Error) {
                return urlTitle;
            }

            await MySQLClient.query<BlogPostEntity[]>('INSERT INTO BlogPosts (ID, POST_DATE, TITLE, URL_TITLE, SUMMARY, CONTENT) VALUES(?, ?, ?, ?, ?, ?)', [
                id,
                now,
                blogPost.title,
                urlTitle,
                blogPost.summary,
                blogPost.content,
            ]);

            return {
                ...blogPost,
                id,
                postDate: now,
                urlTitle,
            }
        }
        catch (exception) {
            Logger.log(exception);
            return new Error(exception);
        }
    },

    async updateBlogPost(blogPost: BlogPostModel): Promise<void | Error> {
        try {
            await MySQLClient.query<BlogPostEntity[]>('UPDATE BlogPosts Set TITLE = ?, SUMMARY = ?, content = ? WHERE ID = ?', [
                blogPost.title,
                blogPost.summary,
                blogPost.content,
                blogPost.id,
            ]);
        }
        catch (exception) {
            Logger.log(exception);
            return new Error(exception);
        }
    },
}
