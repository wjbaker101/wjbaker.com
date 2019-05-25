import * as axios from 'axios';
import { ImmortalDB } from 'immortal-db';

const baseURL = '/api';

const request = async (endpoint) => {
    const cache = await ImmortalDB.get(`cache_${endpoint}`, null);
    const cachedResponse = JSON.parse(cache);

    if (cachedResponse === null
            || Date.now() - cachedResponse.timestamp > 3600000) {

        const response = await axios.get(`${baseURL}${endpoint}`);

        await ImmortalDB.set(`cache_${endpoint}`, JSON.stringify({
            timestamp: Date.now(),
            data: response.data,
        }));

        return response.data;
    }

    return cachedResponse.data;
};

const post = async (endpoint, body) => {
    const response = await axios.post(`${baseURL}${endpoint}`, body);
    return response.data;
};

const put = async (endpoint, body) => {
    const response = await axios.put(`${baseURL}${endpoint}`, body);
    return response.data;
};

const patch = async (endpoint, body) => {
    const response = await axios.patch(`${baseURL}${endpoint}`, body);
    return response.data;
};

export default {
    request,
    post,
    put,
    patch,
}