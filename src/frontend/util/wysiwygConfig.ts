import { Env } from '@common/util/Env';

export const wysiwygConfig = {

    hideModules: {
        table: true,
    },

    image: {
        uploadURL: `${Env.config().backend.baseURL}/image`,
    },

    paragraphSeparator: 'p',
}
