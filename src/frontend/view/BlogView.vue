<template>
    <PageContentComponent class="blog-view">
        <PageTitleComponent title="Blog" />
        <PageActionsComponent v-if="user !== null && user.isAdmin">
            <router-link to="/blog/create">
                <ButtonComponent :isGhost="true">+</ButtonComponent>
            </router-link>
        </PageActionsComponent>
        <div v-if="isLoading">
            <LoadingComponent message="Loading Blog Posts" />
        </div>
        <ErrorComponent
            v-else-if="blogPosts === null"
            message="Unable to load blog; try refreshing the page."
        />
        <div class="blog-posts" v-else>
            <BlogPostComponent
                :key="`post-${index}`"
                v-for="(blogPost, index) in blogPosts"
                :blogPost="blogPost"
            />
        </div>
    </PageContentComponent>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { API } from '@frontend/api/API';
    import { DateUtils } from '@frontend/util/DateUtils';

    import { BlogPostModel } from '@common/model/BlogPostModel';

    import PageContentComponent from '@frontend/component/page/PageContentComponent.vue';
    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';
    import PageActionsComponent from '@frontend/component/page/PageActionsComponent.vue';
    import BlogPostComponent from '@frontend/component/view/BlogPostComponent.vue';

    import ButtonComponent from '@frontend/component/ButtonComponent.vue';
    import ErrorComponent from '@frontend/component/ErrorComponent.vue';
    import LoadingComponent from '@frontend/component/LoadingComponent.vue';
import { UserModel } from '../../common/model/UserModel';

    @Component({
        components: {
            PageContentComponent,
            PageTitleComponent,
            PageActionsComponent,
            BlogPostComponent,
            ButtonComponent,
            ErrorComponent,
            LoadingComponent,
        },
    })
    export default class BlogView extends Vue {

        private isLoading: boolean = false;

        get user(): UserModel | null {
            return this.$store.state.user;
        }

        get blogPosts(): BlogPostModel[] | null {
            return this.$store.state.blogPosts;
        }

        async mounted(): Promise<void> {
            if (this.blogPosts !== null) {
                return;
            }

            await this.getBlogPosts();
        }

        async getBlogPosts(): Promise<void> {
            this.isLoading = true;

            const blogPosts = await API.getBlogPosts();

            if (blogPosts instanceof Error) {
                this.isLoading = false;
                return;
            }

            this.$store.dispatch('setBlogPosts', blogPosts);
            this.isLoading = false;
        }
    }
</script>

<style lang="scss">
</style>
