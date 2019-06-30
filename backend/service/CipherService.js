const bcrypt = require('bcryptjs');
const secretProperties = require('../../secret-properties.json');

const salt = secretProperties['authentication']['bcrypt-salt'];

class CipherService {

    constructor() {}

    /**
     * Hashes a password so that it can be stored safely.
     *
     * @param {String} password The password to hash.
     */
    async hashPassword(password) {
        return await bcrypt.hash(password, salt);
    }

    /**
     * Compares a password with an already hashed password.
     *
     * @param {String} password The original, un-hashed password.
     * @param {String} hashedPassword The hashed password to compare to.
     */
    async verifyPassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}

module.exports = new CipherService();