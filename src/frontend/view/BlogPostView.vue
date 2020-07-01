<template>
    <PageContentComponent class="blog-post-view" v-if="blogPost !== null">
        <PageTitleComponent :title="blogPost.title" />
        <PageActionsComponent
            class="flex-responsive"
            returnLink="/blog"
            returnText="Return to Blog"
        >
            <div>
                <span :title="blogPost.postDate">
                    <strong>Published:</strong>
                    {{ postDate }}
                </span>
            </div>
            <router-link
                v-if="user !== null && user.isAdmin"
                :to="`/blog/edit/${blogPost.id}`"
            >
                <ButtonComponent :isGhost="true">
                    <EditIcon />
                </ButtonComponent>
            </router-link>
        </PageActionsComponent>
        <div v-if="isLoading">
            <LoadingComponent message="Loading Blog Post Content" />
        </div>
        <div v-else v-html="blogPost.content"></div>
    </PageContentComponent>
    <PageContentComponent class="blog-post-view" v-else-if="!isLoading">
        <PageTitleComponent title="Blog Post Not Found" />
        <ErrorComponent message="The blog post you were looking for could not be found." />
        <p>
            <router-link to="/blog">
                <ButtonComponent>Return to Blog</ButtonComponent>
            </router-link>
        </p>
    </PageContentComponent>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { API } from '@frontend/api/API';
    import { DateUtils } from '@frontend/util/DateUtils';
    import { Utils } from '@frontend/util/Utils';

    import { BlogPostModel } from '@common/model/BlogPostModel';
    import { UserModel } from '@common/model/UserModel';

    import PageContentComponent from '@frontend/component/page/PageContentComponent.vue';
    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';
    import PageActionsComponent from '@frontend/component/page/PageActionsComponent.vue';

    import ButtonComponent from '@frontend/component/ButtonComponent.vue';
    import ErrorComponent from '@frontend/component/ErrorComponent.vue';
    import LoadingComponent from '@frontend/component/LoadingComponent.vue';

    import EditIcon from '@frontend/assets/icon/pencil.svg';

    @Component({
        components: {
            PageContentComponent,
            PageTitleComponent,
            PageActionsComponent,
            ButtonComponent,
            ErrorComponent,
            LoadingComponent,
            EditIcon,
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

        get user(): UserModel {
            return this.$store.state.user;
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
</style>
