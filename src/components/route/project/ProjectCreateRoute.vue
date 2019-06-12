<template>
    <div class="page-content">
        <h1>
            <span class="page-heading">Create Project</span>
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
                :doShowLoadingIcon="isSubmitting"
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

        methods: {
            async onSubmitClicked() {
                const projectModel = {
                    ...this.properties,
                };

                this.message = null;
                this.isSubmitting = true;
                const response = await API.createProject(projectModel);
                this.isSubmitting = false;

                this.message = response.result || response.error;

                if (!response.error) {
                    this.isSubmitted = true;
                    this.$router.push(`/projects/${response.result}`);
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
