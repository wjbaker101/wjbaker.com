<template>
    <div class="page-content">
        <h1>
            <span class="page-heading">Create Blog Post</span>
        </h1>
        <p>
            <label>Title</label><br>
            <input type="text" class="textbox-wide" v-model="properties.title">
        </p>
        <p>
            <label>Summary</label><br>
            <wysiwyg v-model="properties.summary" />
        </p>
        <p>
            <label>Content</label><br>
            <wysiwyg v-model="properties.content" />
        </p>
        <FormContainerComponent title="Settings">
            <CheckBoxComponent
                id="checkbox-published"
                label="Published"
                val="isPublished"
                v-model="properties.isPublished" />
        </FormContainerComponent>
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
    import FormContainerComponent from '@/components/item/FormContainerComponent.vue';
    import CheckBoxComponent from '@/components/item/CheckBoxComponent.vue';

    export default {
        name: 'BlogCreateRoute',

        mixins: [ BaseRouteMixin('admin') ],

        components: {
            ButtonComponent,
            FormContainerComponent,
            CheckBoxComponent,
        },

        data() {
            return {
                properties: {
                    title: '',
                    summary: '',
                    content: '',
                    isPublished: false,
                },
                isSubmitted: false,
                isSubmitting: false,
                message: null,
            }
        },

        methods: {
            async onSubmitClicked() {
                if (!this.properties.title) {
                    this.message = 'Please enter a title for your Blog post.';
                    return;
                }

                const blogModel = {
                    ...this.properties,
                    createdOn: new Date(),
                };

                this.message = null;
                this.isSubmitting = true;
                const response = await API.createBlog(blogModel);
                this.isSubmitting = false;

                if (!response || !response.error) {
                    this.isSubmitted = true;
                    this.message = 'Successfully created Blog post!';
                    // this.$router.push(`/blog/${this.projectItem.urlID}`);
                }
                else {
                    this.message = response.error;
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
