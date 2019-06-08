import ProjectAPI from '@/api/ProjectAPI.js';
import AuthAPI from '@/api/AuthAPI.js';
import BlogAPI from '@/api/BlogAPI.js';
import UserAPI from '@/api/UserAPI.js';

export default {
    ...ProjectAPI,
    ...AuthAPI,
    ...BlogAPI,
    ...UserAPI,
}