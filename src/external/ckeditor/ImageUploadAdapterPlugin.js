import ImageUploadAdapter from './ImageUploadAdapter.js';

export default (editor) => {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new ImageUploadAdapter(loader);
    };
}