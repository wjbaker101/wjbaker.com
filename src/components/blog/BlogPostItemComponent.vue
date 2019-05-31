<template>
    <InnerCardComponent class="blog-post-item">
        <p><small>{{ blogPostItem.createdOn }}</small></p>
        <h2>{{ blogPostItem.title }}</h2>
        <div v-html="blogPostItem.summary"></div>
        <p>
            <router-link :to="`/blog/${blogPostItem.blogID}`">
                <button>View</button>
            </router-link>
        </p>
    </InnerCardComponent>
</template>

<script>
    import InnerCardComponent from '@/components/item/InnerCardComponent.vue';

    export default {
        name: 'BlogPostItemComponent',

        props: [ 'blogPostItem' ],

        components: {
            InnerCardComponent,
        },
    }
</script>

<style lang="scss">

</style>
