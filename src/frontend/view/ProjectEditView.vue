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
                <label>Viewable Link URL</label>
                <input type="text" v-model="viewLink">
            </p>
            <p>
                <label>Source Code URL</label>
                <input type="text" v-model="sourceCodeURL">
            </p>
            <p>
                <label>Preview Image</label>
                <input id="previewImageInput" type="file" @change="onImageUploaded">
                <label for="previewImageInput">Upload File</label>
                <img ref="imagePreview" class="preview-image" :src="project === null ? '' : project.previewImageURL">
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
    import { Component, Prop, Vue, Ref } from 'vue-property-decorator';

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

        @Ref('imagePreview')
        private readonly imagePreview!: HTMLImageElement;

        private project: ProjectModel | null = null;

        private title: string = '';
        private startDate: string = '';
        private viewLink: string | null = null;
        private sourceCodeURL: string | null = null;
        private previewImageBase64: string | null = null;
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
            this.viewLink = project.viewLink;
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

            const viewLink = (this.viewLink === null
                    || this.viewLink.length === 0)
                            ? null
                            : this.viewLink;

            if (this.$route.params.projectID && this.project !== null) {
                const result = await API.updateProject({
                    ...this.project,
                    title: this.title,
                    startDate: this.startDate,
                    viewLink,
                    sourceCodeURL,
                    previewImageBase64: this.previewImageBase64,
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
                    viewLink,
                    sourceCodeURL,
                    previewImageURL: null,
                    previewImageBase64: this.previewImageBase64,
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

        onImageUploaded(event: Event): void {
            const fileInput = event.target as HTMLInputElement;

            if (fileInput.files === null) {
                return;
            }

            const fileReader = new FileReader();
            fileReader.readAsDataURL(fileInput.files[0]);

            fileReader.onload = () => {
                const imageBase64 = String(fileReader.result);

                this.imagePreview.src = imageBase64;
                this.previewImageBase64 = imageBase64;
            };
        }
    }
</script>

<style lang="scss">
    .project-edit-view {

        .preview-image {
            margin-top: 1rem;
            border-radius: border-radius();
        }
    }
</style>
