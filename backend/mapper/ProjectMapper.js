module.exports = {

    map(project) {
        const {
            ID: id,
            TITLE: title,
            URL_ID: urlID,
            DATE: date,
            CONTENT: content,
            SUMMARY: summary,
        } = project;

        return {
            id,
            title,
            urlID,
            date,
            content,
            summary,
        }
    },

    mapToDBModel(project) {
        const {
            title: TITLE,
            urlID: URL_ID,
            content: CONTENT,
            summary: SUMMARY,
            date: DATE,
        } = project;

        return {
            TITLE,
            URL_ID,
            CONTENT,
            SUMMARY,
            DATE,
        }
    },
}