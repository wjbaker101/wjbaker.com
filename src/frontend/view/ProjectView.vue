<template>
    <PageContentComponent class="project-view" v-if="project !== null">
        <PageTitleComponent :title="project.title" />
        <ReturnContainerComponent
            returnLink="/projects"
            returnText="Return to Projects"
        >
            <LinkComponent
                :href="project.sourceCodeURL"
                v-if="project.sourceCodeURL !== null"
                target="_blank"
            >
                <ButtonComponent>
                    <GitHubIcon />
                </ButtonComponent>
            </LinkComponent>
            <router-link
                v-if="user !== null && user.isAdmin"
                :to="`/projects/edit/${project.id}`"
            >
                <ButtonComponent :isGhost="true">
                    <EditIcon />
                </ButtonComponent>
            </router-link>
        </ReturnContainerComponent>
        <div v-if="isLoading">
            <LoadingComponent message="Loading Project Details" />
        </div>
        <div v-else v-html="project.description"></div>
    </PageContentComponent>
    <PageContentComponent class="project-view" v-else-if="!isLoading">
        <PageTitleComponent title="Project Not Found" />
        <ErrorComponent message="The project you were looking for could not be found." />
        <p>
            <router-link to="/projects">
                <ButtonComponent>Return to Projects</ButtonComponent>
            </router-link>
        </p>
    </PageContentComponent>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { ProjectModel } from '@common/model/ProjectModel';
    import { UserModel } from '@common/model/UserModel';

    import { API } from '@frontend/api/API';
    import { Utils } from '@frontend/util/Utils';

    import PageContentComponent from '@frontend/component/page/PageContentComponent.vue';
    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';
    import ReturnContainerComponent from '@frontend/component/page/ReturnContainerComponent.vue';

    import ButtonComponent from '@frontend/component/ButtonComponent.vue';
    import ErrorComponent from '@frontend/component/ErrorComponent.vue';
    import LoadingComponent from '@frontend/component/LoadingComponent.vue';

    import GitHubIcon from '@frontend/assets/icon/github.svg';
    import EditIcon from '@frontend/assets/icon/pencil.svg';

    @Component({
        components: {
            PageContentComponent,
            PageTitleComponent,
            ReturnContainerComponent,
            ButtonComponent,
            ErrorComponent,
            LoadingComponent,
            GitHubIcon,
            EditIcon,
        },
    })
    export default class ProjectView extends Vue {

        private project: ProjectModel | null = null;

        private isLoading: boolean = false;

        get user(): UserModel {
            return this.$store.state.user;
        }

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

            this.project = project;
            this.isLoading = false;

            if (this.project === null) {
                return;
            }

            Utils.updateTitle(this.project.title);
        }
    }
</script>

<style lang="scss">
</style>
