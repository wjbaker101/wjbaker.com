import axios from 'axios';

import { Env } from '@common/util/Env';

const config = Env.config();

const client = axios.create({
    baseURL: config.backend.baseURL,
});

export { client as APIClient };