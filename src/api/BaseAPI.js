import * as axios from 'axios';

const baseURL = '/api';

const request = async (endpoint) => {
    const response = await axios.get(`${baseURL}${endpoint}`);
    return response.data;
};

export default {
    request,
}