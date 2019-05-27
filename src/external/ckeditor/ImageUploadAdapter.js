export default class ImageUploadAdapter {

    constructor(loader) {
        this.loader = loader;
    }

    async upload() {
        const file = await this.loader.file;

        return await new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject, file);
            this._sendRequest(file);
        });
    }

    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    _initRequest() {
        this.xhr = new XMLHttpRequest();

        this.xhr.open('POST', '/api/projects/image', true);
        this.xhr.responseType = 'json';
    }

    _initListeners(resolve, reject, file) {
        const errorMessage = `Could not upload '${file.name}'.`;

        this.xhr.addEventListener('error', () => reject(errorMessage));
        this.xhr.addEventListener('abort', () => reject());

        this.xhr.addEventListener('load', () => {
            const response = this.xhr.response;

            if (!response || response.error) {
                return reject(response && response.error ? response.error : errorMessage);
            }

            resolve({
                default: response.url,
            });
        });

        if (this.xhr.upload) {
            this.xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    this.loader.uploadTotal = event.total;
                    this.loader.uploaded = event.loaded;
                }
            });
        }
    }

    _sendRequest(file) {
        const data = new FormData();

        data.append('upload', file);

        this.xhr.send(data);
    }
}