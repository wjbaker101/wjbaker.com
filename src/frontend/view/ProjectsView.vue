<template>
    <PageContentComponent class="projects-view">
        <PageTitleComponent title="Projects" />
        <div v-if="isLoading">
            <LoadingComponent message="Loading Projects" />
        </div>
        <ErrorComponent
            v-else-if="projects === null"
            message="Unable to load projects; try refreshing the page."
        />
        <div class="projects" v-else>
            <ProjectComponent
                :key="`project-${index}`"
                v-for="(project, index) in projects"
                :project="project"
            />
        </div>
    </PageContentComponent>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { API } from '@frontend/api/API';

    import { ProjectModel } from '@common/model/ProjectModel';

    import PageContentComponent from '@frontend/component/page/PageContentComponent.vue';
    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';
    import ProjectComponent from '@frontend/component/view/ProjectComponent.vue';

    import ErrorComponent from '@frontend/component/ErrorComponent.vue';
    import LoadingComponent from '@frontend/component/LoadingComponent.vue';

    @Component({
        components: {
            PageContentComponent,
            PageTitleComponent,
            ProjectComponent,
            ErrorComponent,
            LoadingComponent,
        },
    })
    export default class ProjectsView extends Vue {

        private isLoading: boolean = false;

        get projects(): ProjectModel[] | null {
            return this.$store.state.projects;
        }

        async mounted(): Promise<void> {
            if (this.projects !== null) {
                return;
            }

            await this.getProjects();
        }

        async getProjects(): Promise<void> {
            this.isLoading = true;

            const projects = await API.getProjects();

            if (projects instanceof Error) {
                this.isLoading = false;
                return;
            }

            this.$store.dispatch('setProjects', projects);
            this.isLoading = false;
        }
    }
</script>

<style lang="scss">
</style>
