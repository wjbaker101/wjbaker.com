const userRepository = require('../repository/UserRepository.js');

class UserService {

    async getUser(username, password) {
        const result = await userRepository.getUser(username, password);

        if (result.length === 0) {
            return null;
        }

        return result[0];
    }

    async getUserByID(id) {
        const result = await userRepository.getUserByID(id);

        if (result.length === 0) {
            return null;
        }

        return result[0];
    }
}

module.exports = new UserService();