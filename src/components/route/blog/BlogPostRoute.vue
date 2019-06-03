<template>
    <div class="page-content" v-if="blogPostItem">
        <h1>
            <span class="page-heading">{{ blogPostItem.title }}</span>
        </h1>
        <p>
            <router-link to="/blog"><BackIcon /> Return to Blog</router-link>
        </p>
        <p><small>{{ date }}</small></p>
        <div v-html="blogPostItem.content"></div>
        <InnerCardComponent v-if="currentUser && currentUser.isAdmin">
            <router-link :to="`/blog/${$route.params.blogPostID}/edit`">
                <EditIcon /> Edit Blog Post
            </router-link>
        </InnerCardComponent>
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import API from '@/api/API.js';
    import BackIcon from '@/assets/icons/arrow-left.svg';
    import EditIcon from '@/assets/icons/edit.svg';
    import CarouselComponent from '@/components/CarouselComponent.vue';
    import InnerCardComponent from '@/components/item/InnerCardComponent.vue';
    import DateUtils from '@/util/DateUtils.js';

    export default {
        name: 'ProjectRoute',

        mixins: [ BaseRouteMixin() ],

        components: {
            BackIcon,
            EditIcon,
            CarouselComponent,
            InnerCardComponent,
        },

        data() {
            return {
                blogPostItem: null,
            }
        },

        computed: {
            date: function() {
                if (!this.blogPostItem) {
                    return '';
                }

                return DateUtils.formatDate(new Date(this.blogPostItem.createdOn));
            },
        },

        async beforeRouteEnter(to, from, next) {
            const response = await API.getBlogPost(to.params.blogPostID);
            next(vm =>{
                vm.setBlogPost(response.result);
                next(`/blog/${vm.blogPostItem.blogID}/${vm.blogPostItem.titleUrl}`);
            });
        },

        async beforeRouteUpdate(to, from, next) {
            if (to.params.blogPostID === from.params.blogPostID) {
                next();
                return;
            }

            const response = await API.getBlogPost(to.params.blogPostID);
            this.setBlogPost(response.result);
            next(`/blog/${this.blogPostItem.blogID}/${this.blogPostItem.titleUrl}`);
        },

        methods: {
            setBlogPost(blogPost) {
                this.blogPostItem = blogPost;
            },
        },
    }
</script>

<style lang="scss">

</style>
