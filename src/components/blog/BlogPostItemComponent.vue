<template>
    <router-link class="link-no-style" :to="`/blog/${blogPostItem.blogID}/${blogPostItem.titleUrl}`">
        <CardComponent class="blog-post-item" v-bind:class="{ 'is-published': blogPostItem.isPublished }">
            <p><small>{{ blogPostDate }}</small></p>
            <h2>{{ blogPostItem.title }}</h2>
            <div v-html="blogPostItem.summary"></div>
        </CardComponent>
    </router-link>
</template>

<script>
    import CardComponent from '@/components/CardComponent.vue';
    import DateUtils from '@/util/DateUtils.js';

    export default {
        name: 'BlogPostItemComponent',

        props: [ 'blogPostItem' ],

        computed: {
            blogPostDate: function() {
                return DateUtils.formatDate(
                        new Date(this.blogPostItem.createdOn));
            },
        },

        components: {
            CardComponent,
        },
    }
</script>

<style lang="scss">
    .blog-post-item {
        height: 100%;
        background-color: theme(grey-dark);
        border-right-color: theme(black-light);
        border-top-color: theme(black-light);
        border-bottom-color: theme(black-light);
        transition: border-color animation(duration-mid);

        &.is-published {
            background-color: theme(grey-light);
        }

        &:hover {
            padding-left: calc(1rem - 2px);
            border-left-width: 4px;
            border-right-color: theme(secondary);
            border-top-color: theme(secondary);
            border-bottom-color: theme(secondary);
        }
    }
</style>
