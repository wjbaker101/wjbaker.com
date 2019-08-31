<template>
    <div class="page-content" v-if="projectItem">
        <h1>
            <span class="page-heading">{{ projectItem.title }}</span>
        </h1>
        <p>
            <router-link to="/projects"><BackIcon /> Return to projects</router-link>
        </p>
        <p><small>{{ projectItem.date }}</small></p>
        <div v-html="projectItem.content"></div>
        <AdminControlsContainer :contents="adminContent" :user="currentUser" />
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import API from '@/api/API.js';

    import BackIcon from '@/assets/icons/arrow-left.svg';
    import PencilIcon from '@/assets/icons/pencil.svg';

    import AdminControlsContainer from '@/components/admin/AdminControlsContainer.vue';

    export default {
        name: 'ProjectRoute',

        mixins: [ BaseRouteMixin() ],

        components: {
            BackIcon,
            AdminControlsContainer,
        },

        data() {
            return {
                projectItem: null,

                adminContent: [
                    {
                        icon: PencilIcon,
                        action: () => {
                            this.$router.push({
                                path: `/projects/${this.$route.params.projectID}/edit`,
                            });
                        },
                    },
                ],
            }
        },

        async beforeRouteEnter(to, from, next) {
            const response = await API.getProject(to.params.projectID);
            next(vm => vm.setProject(response.result));
        },

        async beforeRouteUpdate(to, from, next) {
            if (to.params.projectID === from.params.projectID) {
                return;
            }

            const response = await API.getProject(to.params.projectID);
            this.setProject(response.result);
            next();
        },

        methods: {
            setProject(project) {
                this.projectItem = project;
            },
        },
    }
</script>

<style lang="scss">

</style>
