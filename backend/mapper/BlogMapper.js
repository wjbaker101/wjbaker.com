module.exports = {

    map(project) {
        const {
            BLOG_ID: blogId,
            TITLE: title,
            TITLE_URL: titleUrl,
            CONTENT: content,
            SUMMARY: summary,
            CREATED_ON: createdOn,
            MODIFIED_ON: modifiedOn,
            IS_PUBLISHED: isPublished,
        } = project;

        return {
            blogId,
            title,
            titleUrl,
            content,
            summary,
            createdOn,
            modifiedOn,
            isPublished,
        }
    },
}