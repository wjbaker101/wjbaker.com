<template>
    <div class="page-content">
        <h1>
            <span class="page-heading">Blog</span>
        </h1>
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
    import BlogPostItemComponent from '@/components/blog/BlogPostItemComponent.vue';

    export default {
        name: 'BlogRoute',

        mixins: [ BaseRouteMixin() ],

        components: {
            LoadingIcon,
            BlogPostItemComponent,
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

                if (Array(this.blogPosts).length) {
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
