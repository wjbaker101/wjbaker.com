const mySQLRepository = require('./MySQLRepository.js');
const userMapper = require('../mapper/UserMapper.js');

class UserRepository {

    async getUser(username, password) {
        const result = await mySQLRepository.query(
                'SELECT * FROM USERS WHERE USERNAME=? AND PASSWORD=?',
                [username, password]);

        return result.map(user => userMapper.map(user));
    }

    async getUserByID(id) {
        const result = await mySQLRepository.query(
                'SELECT * FROM USERS WHERE USER_ID=?',
                id);

        return result.map(user => userMapper.map(user));
    }

    async updateAvatar(updateInfo) {
        await mySQLRepository.query(
            'UPDATE USERS SET AVATAR_ID = ? WHERE USER_ID = ?',
            [updateInfo.avatarID, updateInfo.userID]);

        return 'Successfully updated avatar.';
    }
}

module.exports = new UserRepository();