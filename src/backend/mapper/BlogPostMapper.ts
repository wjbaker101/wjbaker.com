import { IMapper } from '@backend/model/IMapper';
import { BlogPostEntity } from '@backend/entity/BlogPostEntity';
import { BlogPostModel } from '@common/model/BlogPostModel';

export const BlogPostMapper: IMapper<BlogPostEntity, BlogPostModel> = {

    map(value: BlogPostEntity): BlogPostModel {
        const {
            ID: id,
            TITLE: title,
            POST_DATE: postDate,
            SUMMARY: summary,
            CONTENT: content,
        } = value;

        return {
            id,
            title,
            postDate,
            summary,
            content,
        }
    },
};