<template>
    <PageContentComponent class="project-view" v-if="project !== null">
        <PageTitleComponent :title="project.title" />
        <div class="return-container">
            <div class="return">
                <router-link to="/projects">
                    <LeftArrowIcon />Return to Projects
                </router-link>
            </div>
            <LinkComponent
                class="github"
                :href="project.sourceCodeURL"
                v-if="project.sourceCodeURL !== null"
                target="_blank"
            >
                <ButtonComponent>
                    <GitHubIcon />
                </ButtonComponent>
            </LinkComponent>
        </div>
        <div v-if="isLoading">
            <LoadingComponent message="Loading Project Details" />
        </div>
        <div v-else v-html="project.description"></div>
    </PageContentComponent>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { ProjectModel } from '@common/model/ProjectModel';

    import { API } from '@frontend/api/API';

    import PageContentComponent from '@frontend/component/page/PageContentComponent.vue';
    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';

    import ButtonComponent from '@frontend/component/ButtonComponent.vue';
    import LoadingComponent from '@frontend/component/LoadingComponent.vue';

    import GitHubIcon from '@frontend/assets/icon/github.svg';
    import LeftArrowIcon from '@frontend/assets/icon/arrow-left.svg';

    @Component({
        components: {
            PageContentComponent,
            PageTitleComponent,
            ButtonComponent,
            LoadingComponent,
            GitHubIcon,
            LeftArrowIcon,
        },
    })
    export default class ProjectView extends Vue {

        private project: ProjectModel | null = null;

        private isLoading: boolean = false;

        async created(): Promise<void> {
            const projects: ProjectModel[] = this.$store.state.projects;

            if (projects !== null) {
                this.project = projects
                        .filter(p => p.id === this.$route.params.projectID)[0];
            }
        }

        async mounted(): Promise<void> {
            this.isLoading = true;

            const project = await API.getProject(this.$route.params.projectID);

            if (project instanceof Error) {
                return;
            }

            if (project === null) {
                return;
            }

            this.project = project;
            this.isLoading = false;
        }
    }
</script>

<style lang="scss">
    .project-view {

        .return-container {
            display: flex;
            padding: 1rem;
            margin-bottom: 2rem;
            border: 1px solid theme(secondary);
            border-radius: border-radius();

            & > * {
                margin: auto 0;
            }

            .return {
                flex: 1;

                .svg-icon {
                    margin-right: 0.25rem;
                }
            }

            .github {
                flex: 0 0 auto;
            }
        }
    }
</style>
