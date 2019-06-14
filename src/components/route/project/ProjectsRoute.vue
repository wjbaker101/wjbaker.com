<template>
    <div class="page-content">
        <h1>
            <span class="page-heading">Projects</span>
        </h1>
        <InnerCardComponent v-if="currentUser && currentUser.isAdmin">
            <router-link :to="`/projects/create`">
                <PlusIcon /> New Project
            </router-link>
        </InnerCardComponent>
        <p v-if="!isLoaded">
            <LoadingIcon class="loading-projects-icon" /> Loading projects
        </p>
        <div v-if="isLoaded">
            <ProjectItemComponent
                v-bind:key="index"
                v-for="(project, index) in projects"
                :projectItem="project" />
        </div>
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import API from '@/api/API.js';
    import LoadingIcon from '@/assets/icons/loading.svg';
    import PlusIcon from '@/assets/icons/plus.svg';

    import ProjectItemComponent
            from '@/components/projects/ProjectItemComponent.vue';

    import InnerCardComponent
            from '@/components/item/InnerCardComponent.vue';

    export default {
        name: 'ProjectsRoute',

        mixins: [ BaseRouteMixin() ],

        components: {
            ProjectItemComponent,
            LoadingIcon,
            InnerCardComponent,
            PlusIcon,
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