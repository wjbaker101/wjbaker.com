<template>
    <div class="page-content">
        <h1>Projects</h1>
        <p v-if="!isLoaded">
            <LoadingIcon class="loading-projects-icon" /> Loading projects
        </p>
        <ProjectItemComponent
            v-if="isLoaded"
            v-bind:key="index"
            v-for="(project, index) in projects"
            :projectItem="project" />
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import API from '@/api/ProjectAPI.js';
    import LoadingIcon from '@/assets/icons/loading.svg';

    import ProjectItemComponent
            from '@/components/projects/ProjectItemComponent.vue';

    export default {
        name: 'ProjectsRoute',

        mixins: [ BaseRouteMixin ],

        components: {
            ProjectItemComponent,
            LoadingIcon,
        },

        data() {
            return {
                isLoaded: false,
                projects: [],
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