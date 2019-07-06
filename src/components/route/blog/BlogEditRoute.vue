<template>
    <div class="page-content">
        <h1>
            <span class="page-heading">Edit Blog Post</span>
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
                blogPostItem: null,
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

        async beforeRouteEnter(to, from, next) {
            const response = await API.getBlogPost(to.params.blogPostID);
            next(vm => vm.setBlogPost(response.result));
        },

        async beforeRouteUpdate(to, from, next) {
            const response = await API.getBlogPost(to.params.blogPostID);
            this.setBlogPost(response.result);
            next();
        },

        methods: {
            setBlogPost(blogPost) {
                if (!blogPost.isPublished) {
                    blogPost.isPublished = false;
                }

                this.blogPostItem = blogPost;
                this.properties = this.blogPostItem;
            },

            async onSubmitClicked() {
                if (!this.properties.title) {
                    this.message = 'Please enter a title for your Blog post.';
                    return;
                }

                const blogModel = {
                    ...this.properties,
                    modifiedOn: new Date(),
                    titleUrl: this.blogPostItem.titleUrl,
                    createdOn: this.blogPostItem.createdOn,
                    blogID: this.blogPostItem.blogID,
                };

                this.message = null;
                this.isSubmitting = true;
                const response = await API.updateBlogPost(blogModel);
                this.isSubmitting = false;

                if (!response || !response.error) {
                    this.isSubmitted = true;
                    this.message = 'Successfully updated Blog post!';
                    this.$router.push(`/blog/${this.blogPostItem.blogID}`);
                }
                else {
                    this.message = response.error;
                }
            },

            loadSummaryEditor(editor) {
                this.properties.summary = this.blogPostItem.summary || '';
            },

            loadContentEditor(editor) {
                this.properties.content = this.blogPostItem.content || '';
            },
        },
    }
</script>

<style lang="scss">
    .textbox-wide {
        width: 100%;
    }
</style>
