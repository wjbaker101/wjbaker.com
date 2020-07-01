import axios from 'axios';
import FormData from 'form-data';

import secretConfig from '@common/config/secret-properties.json';

import { ImgurImageUploadEntity } from '@backend/entity/ImgurImageUploadEntity';

const ImgurAPI = axios.create({
    baseURL: 'https://api.imgur.com/3',
    headers: {
        'Authorization': `Client-ID ${secretConfig.imgurAPI.clientID}`,
    },
});

export const ImgurClient = {

    async uploadImage(image: Buffer): Promise<string> {
        const formData = new FormData();
        formData.append('type', 'file');
        formData.append('image', image);

        const result = await ImgurAPI.post<ImgurImageUploadEntity>('/upload', image);

        return result.data.data.link;
    },

    async uploadImageBase64(imageBase64: string): Promise<string> {
        const formData = new FormData();
        formData.append('type', 'base64');
        formData.append('image', imageBase64);

        const result = await ImgurAPI.post<ImgurImageUploadEntity>('/upload', imageBase64);

        return result.data.data.link;
    },
}
