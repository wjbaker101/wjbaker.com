<template>
    <div class="page-content">
        <h1>
            <span class="page-heading">Edit Blog Post</span>
        </h1>
        <p>
            <label>Title</label><br>
            <input type="text" class="textbox-wide" v-model="properties.title">
        </p>
        <label>Summary</label><br>
        <TipTapEditorComponent :editor="summaryEditor" />
        <label>Content</label><br>
        <TipTapEditorComponent :editor="contentEditor" />
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
    import FormContainerComponent from '@/components/item/FormContainerComponent.vue';
    import CheckBoxComponent from '@/components/item/CheckBoxComponent.vue';
    import TipTapEditorComponent from '@/components/tiptap-editor/TipTapEditorComponent.vue';
    import TipTapEditor from '@/external/tiptap-editor/TipTapEditor.js';

    export default {
        name: 'BlogCreateRoute',

        mixins: [ BaseRouteMixin('admin') ],

        components: {
            ButtonComponent,
            FormContainerComponent,
            CheckBoxComponent,
            TipTapEditorComponent,
        },

        data() {
            return {
                blogPostItem: null,
                properties: {
                    title: '',
                    isPublished: false,
                },
                isSubmitted: false,
                isSubmitting: false,
                message: null,
                summaryEditor: null,
                contentEditor: null,
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

                this.summaryEditor = TipTapEditor.newEditor({
                    content: this.properties.summary,
                });

                this.contentEditor = TipTapEditor.newEditor({
                    content: this.properties.content,
                });
            },

            async onSubmitClicked() {
                if (!this.properties.title) {
                    this.message = 'Please enter a title for your Blog post.';
                    return;
                }

                const blogModel = {
                    ...this.properties,
                    // summary: this.summaryEditor.getHTML(),
                    // content: this.contentEditor.getHTML(),
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

</style>
