<template>
    <div class="page-content">
        <h1>Projects</h1>
        <p v-if="!isLoaded"><LoadingIcon /> Loading projects</p>
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

                projects: [
                    // {
                    //     id: 'gocart',
                    //     title: 'GoCart',
                    //     description: 'GoCart is an Android mobile app which allows the user to quickly create a shopping list containing Tesco specific products and view it during a shopping trip.',
                    //     imageURL: '/website-banner.jpg',
                    //     date: 'May 2018',
                    // },
                    // {
                    //     id: 'normal-distribution-graph',
                    //     title: 'Normal Distribution Graph',
                    //     description: 'The Normal Distribution Graph webpage is a web-based application designed as a graphical, interactive way of viewing a Normal Distribution Graph.',
                    //     imageURL: 'https://wjbaker.com/projects/assets/1/screenshot.jpg',
                    //     date: 'March 2016',
                    // },
                    // {
                    //     id: 'wjbaker-com',
                    //     title: 'wjbaker.com',
                    //     description: 'The website you are on right now! My personal website.',
                    //     imageURL: '',
                    //     date: 'April 2019',
                    // },
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
</style>