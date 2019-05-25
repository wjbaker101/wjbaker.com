<template>
    <div class="page-content">
        <h1>Edit Project</h1>
        <p>
            <label>Title</label><br>
            <input type="text" class="textbox-wide" v-model="properties.title">
        </p>
        <p>
            <label>Date</label><br>
            <input type="text" v-model="properties.date">
        </p>
        <p>
            <label>Summary</label><br>
            <CKEditor :editor="summaryEditor" v-model="properties.summary" :config="editorConfig"></CKEditor>
        </p>
        <p>
            <label>Content</label><br>
            <CKEditor :editor="editor" v-model="properties.content" :config="editorConfig"></CKEditor>
        </p>
        <p>
            <button v-on:click="onSubmitClicked">Submit</button>
        </p>
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import API from '@/api/API.js';

    import CKEditor from '@ckeditor/ckeditor5-vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    export default {
        name: 'ProjectEditRoute',

        mixins: [ BaseRouteMixin ],

        components: {
            CKEditor: CKEditor.component,
        },

        data() {
            return {
                projectItem: null,
                properties: {
                    title: '',
                    date: '',
                    summary: '',
                    content: '',
                },
                editor: ClassicEditor,
                summaryEditor: ClassicEditor,
                editorConfig: {
                    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', '|', 'bulletedList', 'numberedList', 'blockQuote' ],
                },
            }
        },

        async beforeRouteEnter(to, from, next) {
            const response = await API.getProject(to.params.projectID);
            next(vm => vm.setProject(response.result));
        },

        async beforeRouteUpdate(to, from, next) {
            if (to.params.projectID === from.params.projectID) {
                return;
            }

            const response = await API.getProject(to.params.projectID);
            this.setProject(response.result);
            ClassicEditor.builtinPlugins.map( plugin => plugin.pluginName );
            next();
        },

        watch: {
            projectItem(to, from) {
                const {
                    title,
                    date,
                    summary,
                    content,
                } = this.projectItem;

                this.properties = { title, date, summary, content };
            },
        },

        methods: {
            setProject(project) {
                this.projectItem = project;
            },

            async onSubmitClicked() {
                const projectModel = {
                    urlID: this.projectItem.urlID,
                    ...this.properties,
                };

                const response = await API.updateProject(projectModel);

                if (!response.error) {
                    this.$router.push(`/projects/${this.projectItem.urlID}`);
                }
            },
        },
    }
</script>

<style lang="scss">
    .textbox-wide {
        width: 100%;
    }
</style>
