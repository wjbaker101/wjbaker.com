<template>
    <div class="page-content">
        <h1>{{ projectItem.title }}</h1>
        <p>
            <router-link to="/projects"><BackIcon /> Return to projects</router-link>
        </p>
        <p>{{ projectItem.summary }}</p>
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import API from '@/api/API.js';
    import BackIcon from '@/assets/icons/arrow-left.svg';

    export default {
        name: 'ProjectRoute',

        mixins: [ BaseRouteMixin ],

        components: {
            BackIcon,
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
