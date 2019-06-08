import BaseAPI from './BaseAPI.js';

export default {

    async uploadAvatar(formData) {
        return await BaseAPI.post('/user/avatar', formData);
    },
}
