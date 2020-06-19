import { ImgurClient } from '@backend/client/ImgurClient'
import { Logger } from '@backend/util/Logger';

const ALBUM_ID = 'Alc8OfY';

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
}
