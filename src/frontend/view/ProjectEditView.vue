<template>
    <PageContentComponent class="project-edit-view">
        <PageTitleComponent :title="pageTitle" />
        <LoadingComponent v-if="isLoading" message="Loading Project" />
        <ErrorComponent
            v-else-if="this.$route.params.projectID && project === null"
            message="Unable to load project; please check the ID is correct."
        />
        <div v-else>
            <p>
                <label>Title</label>
                <input type="text" v-model="title">
            </p>
            <p>
                <label>Start Date</label>
                <input type="text" class="small" v-model="startDate">
            </p>
            <p>
                <label>Source Code URL</label>
                <input type="text" v-model="sourceCodeURL">
            </p>
            <p>
                <label>Summary</label>
                <textarea v-model="summary"></textarea>
            </p>
            <p>
                <label>Description</label>
                <wysiwyg v-model="description"></wysiwyg>
            </p>
            <p>
                <ButtonComponent @click.native="submitProject">
                    Submit Project
                </ButtonComponent>
            </p>
            <ErrorComponent v-if="error !== null" :message="error" />
        </div>
    </PageContentComponent>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { API } from '@frontend/api/API';
    import { Utils } from '@frontend/util/Utils';

    import { ProjectModel } from '@common/model/ProjectModel';

    import PageContentComponent from '@frontend/component/page/PageContentComponent.vue';
    import ErrorComponent from '@frontend/component/ErrorComponent.vue';
    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';

    import ButtonComponent from '@frontend/component/ButtonComponent.vue';
    import LoadingComponent from '@frontend/component/LoadingComponent.vue';

    @Component({
        components: {
            PageContentComponent,
            ErrorComponent,
            PageTitleComponent,
            ButtonComponent,
            LoadingComponent,
        },
    })
    export default class ProjectEditView extends Vue {

        private project: ProjectModel | null = null;

        private title: string = '';
        private startDate: string = '';
        private sourceCodeURL: string | null = '';
        private summary: string = '';
        private description: string = '';

        private error: string | null = null;
        private isLoading: boolean = false;
        private isSubmitting: boolean = false;

        get pageTitle(): string {
            return this.$route.params.projectID
                    ? 'Edit Project'
                    : 'Create New Project';
        }

        async mounted(): Promise<void> {
            if (!this.$route.params.projectID) {
                return;
            }

            await this.getProject();
        }

        async getProject(): Promise<void> {
            this.isLoading = true;
            this.error = null;

            const project = await API.getProject(this.$route.params.projectID);

            this.isLoading = false;

            if (project instanceof Error || project === null) {
                this.error = 'Sorry, the project was unable to be retrieved';
                return;
            }

            this.project = project;

            this.title = project.title;
            this.startDate = project.startDate;
            this.sourceCodeURL = project.sourceCodeURL;
            this.summary = project.summary;
            this.description = project.description || '';

            this.isLoading = false;
        }

        async submitProject(): Promise<void> {
            this.isSubmitting = true;

            const sourceCodeURL = (this.sourceCodeURL === null
                    || this.sourceCodeURL.length === 0)
                            ? null
                            : this.sourceCodeURL;

            if (this.$route.params.projectID && this.project !== null) {
                const result = await API.updateProject({
                    ...this.project,
                    title: this.title,
                    startDate: this.startDate,
                    sourceCodeURL,
                    summary: this.summary,
                    description: this.description,
                });

                this.isSubmitting = true;

                if (result instanceof Error) {
                    this.error = 'Sorry, the project was unable to be updated.';
                    return;
                }

                this.$router.push({ path: `/project/${this.project.id}`, });
            }
            else {
                const project = await API.createProject({
                    id: '',
                    title: this.title,
                    startDate: this.startDate,
                    sourceCodeURL,
                    summary: this.summary,
                    description: this.description,
                });

                this.isSubmitting = true;

                if (project instanceof Error) {
                    this.error = 'Sorry, the project was unable to be created.';
                    return;
                }

                this.$router.push({ path: `/project/${project.id}`, });
            }
        }
    }
</script>

<style lang="scss">
</style>
