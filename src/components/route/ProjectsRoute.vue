<template>
    <div class="page-content">
        <h1>Projects</h1>
        <ProjectItemComponent
            v-bind:key="index"
            v-for="(project, index) in projects"
            :projectItem="project" />
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';

    import ProjectItemComponent
            from '@/components/projects/ProjectItemComponent.vue';

    export default {
        name: 'ProjectsRoute',

        mixins: [ BaseRouteMixin ],

        components: {
            ProjectItemComponent,
        },

        data() {
            return {
                projects: [
                    {
                        id: 'gocart',
                        title: 'GoCart',
                        description: 'GoCart is an Android mobile app which allows the user to quickly create a shopping list containing Tesco specific products and view it during a shopping trip.',
                        imageURL: '/website-banner.jpg',
                        date: 'May 2018',
                    },
                    {
                        id: 'normal-distribution-graph',
                        title: 'Normal Distribution Graph',
                        description: 'The Normal Distribution Graph webpage is a web-based application designed as a graphical, interactive way of viewing a Normal Distribution Graph.',
                        imageURL: 'https://wjbaker.com/projects/assets/1/screenshot.jpg',
                        date: 'March 2016',
                    },
                    {
                        id: 'wjbaker-com',
                        title: 'wjbaker.com',
                        description: 'The website you are on right now! My personal website.',
                        imageURL: '',
                        date: 'April 2019',
                    },
                ],
            }
        },
    }
</script>

<style lang="scss">
</style>