<template>
    <PageContentComponent class="blog-post-view">
        <PageTitleComponent :title="pageTitle" />
        <LoadingComponent v-if="isLoading" message="Loading Blog Post" />
        <ErrorComponent v-else-if="this.$route.params.blogID && blogPost === null" message="Unable to load the blog post; please check the ID is correct." />
        <div v-else>
            <p>
                <label>Title</label>
                <input type="text" v-model="title">
            </p>
            <p>
                <label>Summary</label>
                <textarea v-model="summary"></textarea>
            </p>
            <p>
                <label>Content</label>
                <wysiwyg v-model="content"></wysiwyg>
            </p>
            <p>
                <ButtonComponent @click.native="submitBlogPost">Submit Post</ButtonComponent>
            </p>
            <ErrorComponent v-if="error != null" :message="error" />
        </div>
    </PageContentComponent>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

    import { API } from '@frontend/api/API';

    import { BlogPostModel } from '@common/model/BlogPostModel';

    import PageContentComponent from '@frontend/component/page/PageContentComponent.vue';
    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';

    import ButtonComponent from '@frontend/component/ButtonComponent.vue';
    import ErrorComponent from '@frontend/component/ErrorComponent.vue';
    import LoadingComponent from '@frontend/component/LoadingComponent.vue';

    @Component({
        components: {
            PageContentComponent,
            PageTitleComponent,
            ButtonComponent,
            ErrorComponent,
            LoadingComponent,
        },
    })
    export default class BlogEditView extends Vue {

        private blogPost: BlogPostModel | null = null;

        private title: string = '';
        private summary: string = '';
        private content: string = '';

        private error: string | null = null;
        private isLoading: boolean = false;
        private isSubmitting: boolean = false;

        get pageTitle(): string {
            return this.$route.params.blogID
                    ? 'Edit Blog Post'
                    : 'Create New Blog Post';
        }

        async mounted(): Promise<void> {
            if (!this.$route.params.blogID) {
                return;
            }

            await this.getBlogPost();
        }

        async getBlogPost(): Promise<void> {
            this.isLoading = true;
            this.error = null;

            const blogPost = await API.getBlogPost(this.$route.params.blogID);

            this.isLoading = false;

            if (blogPost instanceof Error || blogPost === null) {
                this.error = 'Sorry, the blog post was unable to be retrieved.';
                return;
            }

            this.blogPost = blogPost;

            this.title = blogPost.title;
            this.summary = blogPost.summary;
            this.content = blogPost.content || '';
        }

        async submitBlogPost(): Promise<void> {
            this.isSubmitting = true;

            if (this.$route.params.blogID && this.blogPost !== null) {
                const result = await API.updateBlogPost({
                    ...this.blogPost,
                    title: this.title,
                    summary: this.summary,
                    content: this.content,
                });

                this.isSubmitting = false;

                if (result instanceof Error) {
                    this.error = 'Sorry, the blog post was unable to be updated.';
                    return;
                }

                this.$router.push({ path: `/blog/post/${this.blogPost.id}/${this.blogPost.urlTitle}`, });
            }
            else {
                const blogPost = await API.createBlogPost({
                    id: '',
                    postDate: new Date(),
                    title: this.title,
                    urlTitle: '',
                    summary: this.summary,
                    content: this.content,
                });

                this.isSubmitting = false;

                if (blogPost instanceof Error) {
                    this.error = 'Sorry, the blog post was unable to be created.';
                    return;
                }

                console.log(blogPost)

                this.$router.push({ path: `/blog/post/${blogPost.id}/${blogPost.urlTitle}`, });
            }
        }
    }
</script>

<style lang="scss">
</style>
