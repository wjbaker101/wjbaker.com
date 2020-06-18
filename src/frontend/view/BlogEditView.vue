<template>
    <PageContentComponent class="blog-post-view">
        <PageTitleComponent title="Edit Blog Post" />
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

        private isLoading: boolean = false;

        async mounted(): Promise<void> {
            if (!this.$route.params.blogID) {
                return;
            }

            await this.getBlogPost();
        }

        async getBlogPost(): Promise<void> {
            this.isLoading = true;

            const blogPost = await API.getBlogPost(this.$route.params.blogID);

            if (blogPost instanceof Error || blogPost === null) {
                this.isLoading = false;
                return;
            }

            this.blogPost = blogPost;

            this.title = blogPost.title;
            this.summary = blogPost.summary;
            this.content = blogPost.content || '';

            this.isLoading = false;
        }

        async submitBlogPost(): Promise<void> {
            if (this.$route.params.blogID && this.blogPost !== null) {
                const result = await API.updateBlogPost({
                    ...this.blogPost,
                    title: this.title,
                    summary: this.summary,
                    content: this.content,
                });

                if (result instanceof Error) {
                    console.log(result);
                    return;
                }

                this.$router.push({ path: `/blog/post/${this.blogPost.id}`, });
            }
            else {
                const blogPost = await API.createBlogPost({
                    id: '',
                    postDate: new Date(),
                    title: this.title,
                    summary: this.summary,
                    content: this.content,
                });

                if (blogPost instanceof Error) {
                    console.log(blogPost);
                    return;
                }

                this.$router.push({ path: `/blog/post/${blogPost.id}`, });
            }
        }
    }
</script>

<style lang="scss">
    .blog-edit-view {
    }
</style>
