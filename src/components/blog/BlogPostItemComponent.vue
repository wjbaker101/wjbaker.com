<template>
    <router-link class="link-no-style" :to="`/blog/${blogPostItem.blogID}/${blogPostItem.titleUrl}`">
        <CardComponent class="blog-post-item">
            <p><small>{{ blogPostDate }}</small></p>
            <h2>{{ blogPostItem.title }}</h2>
            <div v-html="blogPostItem.summary"></div>
        </CardComponent>
    </router-link>
</template>

<script>
    import CardComponent from '@/components/item/CardComponent.vue';
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
        background-color: theme(grey-light);
        transition: border-color 0.3s;

        &:hover {
            padding-left: calc(1rem - 2px);
            border-left-width: 4px;
            border-right-color: theme(secondary);
            border-top-color: theme(secondary);
            border-bottom-color: theme(secondary);
        }
    }
</style>
