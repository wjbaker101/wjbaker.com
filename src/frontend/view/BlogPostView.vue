<template>
    <PageContentComponent class="blog-post-view" v-if="blogPost !== null">
        <PageTitleComponent :title="blogPost.title" />
        <div class="return-container flex">
            <div class="return flex-1">
                <router-link to="/blog">
                    <LeftArrowIcon />Return to Blog
                </router-link>
            </div>
            <div class="date flex-auto">
                <span :title="blogPost.postDate">
                    <strong>Published:</strong>
                    {{ postDate }}
                </span>
            </div>
            <router-link
                v-if="user !== null && user.isAdmin"
                :to="`/blog/edit/${blogPost.id}`"
                class="edit flex-auto"
            >
                <ButtonComponent :isGhost="true">
                    <EditIcon />
                </ButtonComponent>
            </router-link>
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
    import { UserModel } from '@common/model/UserModel';

    import PageContentComponent from '@frontend/component/page/PageContentComponent.vue';
    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';

    import ButtonComponent from '@frontend/component/ButtonComponent.vue';
    import LoadingComponent from '@frontend/component/LoadingComponent.vue';

    import EditIcon from '@frontend/assets/icon/pencil.svg';
    import LeftArrowIcon from '@frontend/assets/icon/arrow-left.svg';

    @Component({
        components: {
            PageContentComponent,
            PageTitleComponent,
            ButtonComponent,
            LoadingComponent,
            EditIcon,
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
    .blog-post-view {

        .return-container {
            padding: 1rem;
            margin-bottom: 2rem;
            border: 1px solid theme(secondary);
            border-radius: border-radius();

            & > * {
                margin: auto 0;
            }

            .icon-arrow-left {
                margin-right: 0.25rem;
            }

            .edit {
                margin-left: 0.25rem;
            }
        }
    }
</style>
