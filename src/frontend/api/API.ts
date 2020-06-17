import { BlogAPI } from '@frontend/api/BlogAPI';
import { ProjectAPI } from '@frontend/api/ProjectAPI';

const API = {
    ...BlogAPI,
    ...ProjectAPI,
}

export { API };
