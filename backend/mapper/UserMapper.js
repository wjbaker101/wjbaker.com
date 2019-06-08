module.exports = {

    map(user) {
        const {
            USER_ID: id,
            USERNAME: username,
            PASSWORD: password,
            CREATED_ON: createdOn,
            IS_ADMIN: isAdmin,
            AVATAR_ID: avatarID,
        } = user;

        return {
            id,
            username,
            password,
            createdOn: new Date(createdOn),
            isAdmin: isAdmin === 1,
            avatarID,
        }
    },
}