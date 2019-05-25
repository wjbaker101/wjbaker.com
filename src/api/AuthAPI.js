import BaseAPI from './BaseAPI.js';

export default {

    async login(username, password) {
        return await BaseAPI.post('/auth/login', {
            email: username,
            password,
        });
    },

    async logout() {
        return await BaseAPI.request('/auth/logout', false);
    },

    async getUser() {
        return await BaseAPI.request('/auth/user', false);
    },
}
