import { BlogAPI } from '@frontend/api/BlogAPI';
import { ProjectAPI } from '@frontend/api/ProjectAPI';
import { UserAPI } from '@frontend/api/UserAPI';

const API = {
    ...BlogAPI,
    ...ProjectAPI,
    ...UserAPI,
};

export { API };
