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
        <AdminControlsContainer :contents="adminContent" :user="currentUser" />
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import API from '@/api/API.js';

    import BackIcon from '@/assets/icons/arrow-left.svg';
    import PencilIcon from '@/assets/icons/pencil.svg';

    import AdminControlsContainer from '@/components/admin/AdminControlsContainer.vue';

    import DateUtils from '@/util/DateUtils.js';

    export default {
        name: 'ProjectRoute',

        mixins: [ BaseRouteMixin() ],

        components: {
            BackIcon,
            AdminControlsContainer,
        },

        data() {
            return {
                blogPostItem: null,

                adminContent: [
                    {
                        icon: PencilIcon,
                        action: () => {
                            this.$router.push({
                                path: `/blog/${this.$route.params.blogPostID}/edit`,
                            });
                        },
                    },
                ],
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
                next();
            });
        },

        async beforeRouteUpdate(to, from, next) {
            if (to.params.blogPostID === from.params.blogPostID) {
                next();
                return;
            }

            const response = await API.getBlogPost(to.params.blogPostID);
            this.setBlogPost(response.result);
            next();
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
