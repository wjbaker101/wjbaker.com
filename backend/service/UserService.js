const userRepository = require('../repository/UserRepository.js');
const imageUploadService = require('./ImageUploadService.js');

class UserService {

    async getUser(username, password) {
        const result = await userRepository.getUser(username, password);

        if (result.length === 0) {
            return null;
        }

        return result[0];
    }

    async getUserByID(id) {
        try {
            const result = await userRepository.getUserByID(id);

            if (result.length === 0) {
                return null;
            }

            return result[0];
        }
        catch (exception) {
            return null;
        }
    }

    async uploadAvatar(fileBuffer, user) {
        try {
            const avatarImageId
                    = await imageUploadService.uploadImage(fileBuffer);

            await userRepository.updateAvatar({
                userID: user.id,
                avatarID: avatarImageId.fileName,
            });

            return avatarImageId.url;
        }
        catch (exception) {
            return exception;
        }
    }
}

module.exports = new UserService();