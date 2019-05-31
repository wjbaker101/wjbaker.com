<template>
    <div class="page-content">
        <h1>Blog</h1>
        <p v-if="!isLoaded">
            <LoadingIcon class="loading-projects-icon" /> Loading Blog posts
        </p>
        <div v-if="isLoaded">
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

                this.blogPosts = blogPosts.result;

                this.isLoaded = true;
            },
        },
    }
</script>

<style lang="scss">
</style>
