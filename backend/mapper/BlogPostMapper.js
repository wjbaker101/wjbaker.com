module.exports = {

    map(blogPost) {
        const {
            BLOG_ID: blogID,
            TITLE: title,
            TITLE_URL: titleUrl,
            CONTENT: content,
            SUMMARY: summary,
            CREATED_ON: createdOn,
            MODIFIED_ON: modifiedOn,
            IS_PUBLISHED: isPublished,
        } = blogPost;

        return {
            blogID,
            title,
            titleUrl,
            content,
            summary,
            createdOn,
            modifiedOn,
            isPublished,
        }
    },

    toEntity(blogPost) {
        const {
            title: TITLE,
            titleUrl: TITLE_URL,
            content: CONTENT,
            summary: SUMMARY,
            createdOn: CREATED_ON,
            modifiedOn: MODIFIED_ON,
            isPublished: IS_PUBLISHED,
        } = blogPost;

        return {
            TITLE,
            TITLE_URL,
            CONTENT,
            SUMMARY,
            CREATED_ON,
            MODIFIED_ON,
            IS_PUBLISHED,
        }
    },
}