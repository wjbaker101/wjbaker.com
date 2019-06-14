<template>
    <div class="page-content">
        <h1>
            <span class="page-heading">Blog</span>
        </h1>
        <InnerCardComponent v-if="currentUser && currentUser.isAdmin">
            <router-link :to="`/blog/create`">
                <PlusIcon /> New Post
            </router-link>
        </InnerCardComponent>
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <p v-if="!isLoaded">
            <LoadingIcon class="loading-projects-icon" /> Loading Blog posts
        </p>
        <div class="blog-post-container" v-if="isLoaded">
            <BlogPostItemComponent
                v-bind:key="index"
                v-for="(blogPost, index) in blogPosts"
                :blogPostItem="blogPost" />
        </div>
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import API from '@/api/API.js';
    import LoadingIcon from '@/assets/icons/loading.svg';
    import PlusIcon from '@/assets/icons/plus.svg';
    import BlogPostItemComponent from '@/components/blog/BlogPostItemComponent.vue';
    import InnerCardComponent from '@/components/item/InnerCardComponent.vue';

    export default {
        name: 'BlogRoute',

        mixins: [ BaseRouteMixin() ],

        components: {
            LoadingIcon,
            BlogPostItemComponent,
            InnerCardComponent,
            PlusIcon,
        },

        data() {
            return {
                isLoaded: false,
                errorMessage: null,
                blogPosts: [],
            }
        },

        async mounted() {
            await this.loadBlogPosts();
        },

        methods: {
            async loadBlogPosts() {
                this.isLoaded = false;

                const blogPosts = await API.getPublishedBlogPosts();

                if (!blogPosts || blogPosts.error) {
                    this.errorMessage = blogPosts.error;
                }

                this.blogPosts = blogPosts.result;

                if (this.blogPosts.length === 0) {
                    this.errorMessage = 'No Blog posts yet, make sure to check back at a later date!';
                }

                this.isLoaded = true;
            },
        },
    }
</script>

<style lang="scss">
    .blog-post-container {
        display: flex;
        align-items: stretch;

        & > * {
            width: 50%;
            flex: 1;

            &:nth-child(odd) {
                margin-right: 0.5rem;
            }

            &:nth-child(even) {
                margin-left: 0.5rem;
            }
        }
    }
</style>
