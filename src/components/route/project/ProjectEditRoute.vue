<template>
    <div class="page-content">
        <h1>
            <span class="page-heading">Edit Project</span>
        </h1>
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
            <wysiwyg v-model="properties.summary" />
        </p>
        <p>
            <label>Content</label><br>
            <wysiwyg v-model="properties.content" />
        </p>
        <p>
            <ButtonComponent
                @click.native="onSubmitClicked"
                :isLoading="isSubmitting"
                :isDisabled="isSubmitted">

                Submit
            </ButtonComponent>
        </p>
        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import API from '@/api/API.js';
    import ButtonComponent from '@/components/item/ButtonComponent.vue';

    export default {
        name: 'ProjectEditRoute',

        mixins: [ BaseRouteMixin() ],

        components: {
            ButtonComponent,
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
                isSubmitted: false,
                isSubmitting: false,
                message: null,
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
            next();
        },

        methods: {
            setProject(project) {
                this.projectItem = project;
                this.properties = this.projectItem;
            },

            async onSubmitClicked() {
                const projectModel = {
                    urlID: this.projectItem.urlID,
                    ...this.properties,
                };

                this.message = null;
                this.isSubmitting = true;
                const response = await API.updateProject(projectModel);
                this.isSubmitting = false;

                this.message = response.result || response.error;

                if (!response.error) {
                    this.isSubmitted = true;
                    this.$router.push(`/projects/${this.projectItem.urlID}`);
                }
            },

            loadSummaryEditor(editor) {
                this.properties.summary = this.projectItem.summary || '';
            },

            loadContentEditor(editor) {
                this.properties.content = this.projectItem.content || '';
            },
        },
    }
</script>

<style lang="scss">
    .textbox-wide {
        width: 100%;
    }
</style>
