const userRepository = require('../repository/UserRepository.js');
const imageUploadClient = require('../client/ImageUploadClient.js');
const cipherService = require('./CipherService.js');
const properties = require('../../properties.json');

class UserService {

    async getUser(username, password) {
        const result =
            await userRepository.getUserByUsername(username);

        if (result.length === 0) {
            return null;
        }

        const user = result[0];

        const doPasswordsMatch =
            await cipherService.verifyPassword(password, user.password);

        if (!doPasswordsMatch) {
            return null;
        }

        return user;
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