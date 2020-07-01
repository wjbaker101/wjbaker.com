import { ImgurClient } from '@backend/client/ImgurClient'
import { Logger } from '@backend/util/Logger';

const BASE64_INDEX = 'data:image/png;base64,'.length + 1;

export const ImageService = {

    async uploadImage(image: Buffer): Promise<string | Error> {
        try {
            return await ImgurClient.uploadImage(image);
        }
        catch (exception) {
            Logger.log(exception);
            return new Error(exception);
        }
    },

    async uploadImageBase64(imageBase64: string): Promise<string | Error> {
        try {
            const base64 = imageBase64.startsWith('data:image')
                    ? imageBase64.substring(BASE64_INDEX, imageBase64.length)
                    : imageBase64;

            return await ImgurClient.uploadImageBase64(base64);
        }
        catch (exception) {
            Logger.log(exception);
            return new Error(exception);
        }
    },
}
