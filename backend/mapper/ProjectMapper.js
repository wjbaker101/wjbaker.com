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
}