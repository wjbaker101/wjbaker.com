import * as axios from 'axios';
import { ImmortalDB } from 'immortal-db';

const baseURL = '/api';

const errorResponse = (error) => {
    if (error.response) {
        return Promise.reject(error.response.data);
    }
};

const request = async (endpoint, cacheable = true) => {
    const cache = await ImmortalDB.get(`cache_${endpoint}`, null);
    const cachedResponse = JSON.parse(cache);

    if (!cacheable
            || cachedResponse === null
            || cachedResponse.data.error
            || Date.now() - cachedResponse.timestamp > 10) {

        try {
            const response = await axios.get(`${baseURL}${endpoint}`)
                    .catch(errorResponse);

            await ImmortalDB.set(`cache_${endpoint}`, JSON.stringify({
                timestamp: Date.now(),
                data: response.data,
            }));

            return response.data;
        }
        catch (exception) {
            return exception;
        }
    }

    return cachedResponse.data;
};

const post = async (endpoint, body) => {
    try {
        const response = await axios.post(`${baseURL}${endpoint}`, body)
                .catch(errorResponse);

        return response.data;
    }
    catch (exception) {
        return exception;
    }
};

const put = async (endpoint, body) => {
    try {
        const response = await axios.put(`${baseURL}${endpoint}`, body)
                .catch(errorResponse);

        return response.data;
    }
    catch (exception) {
        return exception;
    }
};

const patch = async (endpoint, body) => {
    try {
        const response = await axios.patch(`${baseURL}${endpoint}`, body)
                .catch(errorResponse);

        return response.data;
    }
    catch (exception) {
        return exception;
    }
};

export default {
    request,
    post,
    put,
    patch,
}