<template>
    <PageContentComponent class="blog-post-view" v-if="blogPost !== null">
        <PageTitleComponent :title="blogPost.title" />
        <div class="return-container">
            <div class="return">
                <router-link to="/blog">
                    <LeftArrowIcon />Return to Blog
                </router-link>
            </div>
            <div class="date">
                <span :title="blogPost.postDate">
                    <strong>Published:</strong>
                    {{ postDate }}
                </span>
            </div>
        </div>
        <div v-if="isLoading">
            <LoadingComponent message="Loading Blog Post Content" />
        </div>
        <div v-else v-html="blogPost.content"></div>
    </PageContentComponent>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { API } from '@frontend/api/API';
    import { DateUtils } from '@frontend/util/DateUtils';
    import { Utils } from '@frontend/util/Utils';

    import { BlogPostModel } from '@common/model/BlogPostModel';

    import PageContentComponent from '@frontend/component/page/PageContentComponent.vue';
    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';

    import LoadingComponent from '@frontend/component/LoadingComponent.vue';

    import LeftArrowIcon from '@frontend/assets/icon/arrow-left.svg';

    @Component({
        components: {
            PageContentComponent,
            PageTitleComponent,
            LoadingComponent,
            LeftArrowIcon,
        },
    })
    export default class BlogPostView extends Vue {

        private isLoading: boolean = false;

        private blogPost: BlogPostModel | null = null;

        get postDate(): string {
            if (this.blogPost === null) {
                return '';
            }

            return DateUtils.dateTimeVariableYear(this.blogPost.postDate);
        }

        async created(): Promise<void> {
            const blogPosts: BlogPostModel[] = this.$store.state.blogPosts;

            if (blogPosts !== null) {
                this.blogPost = blogPosts
                        .filter(p => p.id === this.$route.params.blogID)[0];
            }

        }

        async mounted(): Promise<void> {
            this.isLoading = true;

            const blogPost = await API.getBlogPost(this.$route.params.blogID);

            if (blogPost instanceof Error) {
                this.isLoading = false;
                return;
            }

            this.blogPost = blogPost;
            this.isLoading = false;

            if (this.blogPost === null) {
                return;
            }

            // const blogTitleURL = 'yell-placement-year';
            // history.pushState({}, '', `/blog/post/${this.blogPost.id}/${blogTitleURL}`);

            Utils.updateTitle(this.blogPost.title);
        }
    }
</script>

<style lang="scss">
    .blog-post-view {

        .return-container {
            display: flex;
            padding: 1rem;
            margin-bottom: 2rem;
            border: 1px solid theme(secondary);
            border-radius: border-radius();

            & > * {
                margin: auto 0;
            }

            .return {
                flex: 1;

                .svg-icon {
                    margin-right: 0.25rem;
                }
            }

            .date {
                flex: 0 0 auto;
            }
        }
    }
</style>
