import CKEditor from '@ckeditor/ckeditor5-vue';

import ImageUploadAdapterPlugin from '@/external/ckeditor/ImageUploadAdapterPlugin.js';
import CodeBlockPlugin from '@mcfreddie777/ckeditor5-code-block/src/codeblock';

export default {

    components: {
        CKEditor: CKEditor.component,
    },

    data() {
        return {
            editorConfig: {
                toolbar: [
                    'heading',
                    '|',
                    'undo',
                    'redo',
                    '|',
                    'bold',
                    'italic',
                    'link',
                    '|',
                    'bulletedList',
                    'numberedList',
                    'blockQuote',
                    '|',
                    'imageUpload',
                    // 'codeBlock',
                ],
                extraPlugins: [
                    ImageUploadAdapterPlugin,
                ],
            },
        }
    },
}