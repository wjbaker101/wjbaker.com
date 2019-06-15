const userRepository = require('../repository/UserRepository.js');
const imageUploadClient = require('../client/ImageUploadClient.js');
const properties = require('../../properties.json');

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
            const imageURL = await imageUploadClient.uploadImage(
                    'avatar.jpg',
                    fileBuffer);

            const fullImageURL = `${properties['image-upload-service']['base-url']}${imageURL}`;

            await userRepository.updateAvatar({
                userID: user.id,
                avatarID: fullImageURL,
            });

            return fullImageURL;
        }
        catch (exception) {
            return exception;
        }
    }
}

module.exports = new UserService();