<template>
    <div class="page-content">
        <h1>
            <span class="page-heading">Projects</span>
        </h1>
        <LoadingComponent :isVisible="!isLoaded" />
        <div v-if="isLoaded">
            <ProjectItemComponent
                v-bind:key="index"
                v-for="(project, index) in projects"
                :projectItem="project" />
        </div>
        <AdminControlsContainer :contents="adminContent" :user="currentUser" />
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import API from '@/api/API.js';

    import PlusIcon from '@/assets/icons/plus.svg';

    import LoadingComponent from '@/components/LoadingComponent.vue';
    import ProjectItemComponent from '@/components/projects/ProjectItemComponent.vue';
    import AdminControlsContainer from '@/components/admin/AdminControlsContainer.vue';

    export default {
        name: 'ProjectsRoute',

        mixins: [ BaseRouteMixin() ],

        components: {
            LoadingComponent,
            ProjectItemComponent,
            AdminControlsContainer,
        },

        data() {
            return {
                isLoaded: false,
                projects: [],

                adminContent: [
                    {
                        icon: PlusIcon,
                        action: () => {
                            this.$router.push({
                                path: `/projects/create`,
                            });
                        },
                    },
                ],
            }
        },

        async mounted() {
            await this.loadProjects();
        },

        methods: {
            async loadProjects() {
                this.isLoaded = false;

                const projects = await API.getProjects();

                this.projects = projects.result.map(project => {
                    return {
                        id: project.urlID,
                        title: project.title,
                        summary: project.summary,
                        imageURL: `https://wjbaker.com/projects/assets/1/screenshot.jpg`,
                        date: project.date,
                    }
                });

                this.isLoaded = true;
            },
        },
    }
</script>

<style lang="scss">
    .loading-projects-icon {
        color: theme(primary);
    }
</style>