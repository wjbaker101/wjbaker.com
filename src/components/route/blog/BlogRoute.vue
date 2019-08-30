<template>
    <div class="page-content">
        <h1>
            <span class="page-heading">Blog</span>
        </h1>
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <LoadingComponent :isVisible="!isLoaded" />
        <div class="blog-post-container" v-if="isLoaded">
            <BlogPostItemComponent
                v-bind:key="index"
                v-for="(blogPost, index) in blogPosts"
                :blogPostItem="blogPost" />
        </div>
        <AdminControlsContainer :contents="adminContent" :user="currentUser" />
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import API from '@/api/API.js';

    import PlusIcon from '@/assets/icons/plus.svg';

    import LoadingComponent from '@/components/LoadingComponent.vue';
    import BlogPostItemComponent from '@/components/blog/BlogPostItemComponent.vue';
    import AdminControlsContainer from '@/components/admin/AdminControlsContainer.vue';

    export default {
        name: 'BlogRoute',

        mixins: [ BaseRouteMixin() ],

        components: {
            LoadingComponent,
            BlogPostItemComponent,
            AdminControlsContainer,
        },

        data() {
            return {
                isLoaded: false,
                errorMessage: null,
                blogPosts: [],

                adminContent: [
                    {
                        icon: PlusIcon,
                        action: () => {
                            this.$router.push({
                                path: `/blog/create`,
                            });
                        },
                    },
                ],
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
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 1rem;

        & > * {
            grid-column: span 1;
        }
    }
</style>
