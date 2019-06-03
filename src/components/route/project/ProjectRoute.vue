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
        <InnerCardComponent v-if="currentUser && currentUser.isAdmin">
            <router-link :to="`/projects/${$route.params.projectID}/edit`">
                <EditIcon /> Edit Project
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
                projectItem: null,
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
