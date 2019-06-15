const axios = require('axios');
const FormData = require('form-data');
const secretProperties = require('../../secret-properties.json');
const properties = require('../../properties.json');

class ImageUploadClient {

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: properties['image-upload-service']['base-url'],
            headers: {
                'api-key': secretProperties['image-upload-service']['api-key'],
            },
        });
    }

    async uploadImage(fileName, imageBuffer) {
        const formData = new FormData();
        formData.append('image', imageBuffer, { filename: fileName });

        const response = await this.axiosInstance.post('/upload/image', formData, {
            headers: formData.getHeaders(),
        });

        return response.data.result;
    }
}

module.exports = new ImageUploadClient();