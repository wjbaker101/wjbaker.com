<template>
    <PageContentComponent class="project-edit-view">
        <PageTitleComponent title="Edit Project" :subheading="projectReference" />
        <div v-if="isLoading">
            <LoadingComponent message="Loading Project" />
        </div>
        <ErrorComponent
            v-else-if="isError"
            message="Unable to load project; please try refreshing the page."
        />
        <div v-else>
            <label>
                <strong>Title</strong>
                <input type="text" placeholder="My Project" v-model="titleField">
            </label>
            <label>
                <strong>Url Slug</strong>
                <input type="text" placeholder="my-project" v-model="urlSlugField">
            </label>
            <label>
                <strong>Start Date</strong>
                <input type="date" v-model="startDateField" min="2000-01-01" max="2100-01-01">
            </label>
            <label>
                <strong>Summary</strong>
                <textarea rows="4" placeholder="Brief description of what the project is" v-model="summaryField"></textarea>
            </label>
            <label>
                <strong>Source Code Url</strong>
                <input type="text" placeholder="https://source.code/my-project" v-model="sourceCodeUrlField">
            </label>
            <label>
                <strong>View Url</strong>
                <input type="text" placeholder="https://my-project.net" v-model="viewUrlField">
            </label>
            <label>
                <strong>Preview Image Url</strong>
                <input type="text" placeholder="https://images.com/my-project" v-model="previewImageUrlField">
            </label>
            <label>
                <strong>Tags (comma separated)</strong>
                <input type="text" placeholder="Java, .Net Core, SQL" v-model="tagsField">
            </label>
            <label>
                <strong>Description <LinkComponent href="https://www.markdownguide.org/basic-syntax/">(markdown)</LinkComponent></strong>
                <textarea rows="60" placeholder="Deeper dive into what the project is, why it exists and how it was created. Other thoughts such as struggles and the future of the project." v-model="descriptionField"></textarea>
            </label>
            <label>
                <ButtonComponent @click="onUpdateProject">Update Project</ButtonComponent>
            </label>
        </div>
    </PageContentComponent>
</template>

<script lang="ts">  
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/PageTitle.component.vue';
import LoadingComponent from '@/component/Loading.component.vue';
import ErrorComponent from '@/component/Error.component.vue';
import ButtonComponent from '@/component/Button.component.vue';

import { projectClient } from '@/api/client/projects/Project.client';

import { Project } from '@/model/Project.model';
import LinkComponent from '@/component/Link.component.vue';

export default defineComponent({
    name: 'ProjectEditView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        LoadingComponent,
        ErrorComponent,
        ButtonComponent,
        LinkComponent,
    },

    setup() {
        const route = useRoute();
        const router = useRouter();

        const projectReference = ref<string | null>(route.params.reference?.toString() || null);

        const project = ref<Project | null>(null);
        const isLoading = ref<boolean>(false);
        const isError = ref<boolean>(false);

        const titleField = ref<string>('');
        const urlSlugField = ref<string>('');
        const startDateField = ref<string>('');
        const summaryField = ref<string>('');
        const sourceCodeUrlField = ref<string>('');
        const viewUrlField = ref<string>('');
        const previewImageUrlField = ref<string>('');
        const tagsField = ref<string>('');
        const descriptionField = ref<string>('');

        onMounted(async () => {
            if (projectReference.value === null)
                return;

            isLoading.value = true;
            isError.value = false;

            const result = await projectClient.getProjectByReference(projectReference.value);
            if (result instanceof Error) {
                isLoading.value = false;
                isError.value = true;
                return;
            }

            project.value = {
                reference: result.reference,
                title: result.title,
                urlSlug: result.urlSlug,
                startedAt: dayjs(result.startedAt),
                summary: result.summary,
                description: result.description,
                sourceCodeUrl: result.sourceCodeUrl,
                previewImageUrl: result.previewImageUrl,
                displayOrder: result.displayOrder,
                createdAt: dayjs(result.createdAt),
                viewUrl: result.viewUrl,
                tags: result.tags,
            };

            titleField.value = project.value.title;
            urlSlugField.value = project.value.urlSlug;
            startDateField.value = project.value.startedAt.format('YYYY-MM-DD');
            summaryField.value = project.value.summary;
            sourceCodeUrlField.value = project.value.sourceCodeUrl ?? '';
            viewUrlField.value = project.value.viewUrl ?? '';
            previewImageUrlField.value = project.value.previewImageUrl ?? '';
            tagsField.value = project.value.tags.join(', ');
            descriptionField.value = project.value.description ?? '';

            isLoading.value = false;
            isError.value = false;
        });

        return {
            projectReference,
            isLoading,
            isError,
            titleField,
            urlSlugField,
            startDateField,
            summaryField,
            sourceCodeUrlField,
            viewUrlField,
            previewImageUrlField,
            tagsField,
            descriptionField,

            async onUpdateProject() {
                if (titleField.value.length < 3)
                    return;
                if (startDateField.value.length < 3)
                    return;
                if (summaryField.value.length < 3)
                    return;
                if (tagsField.value.length < 3)
                    return;
                if (descriptionField.value.length < 3)
                    return;

                if (project.value === null) {
                    const result = await projectClient.createProject({
                        title: titleField.value,
                        urlSlug: urlSlugField.value || null,
                        startedAt: dayjs(startDateField.value).toISOString(),
                        summary: summaryField.value,
                        description: descriptionField.value,
                        sourceCodeUrl: sourceCodeUrlField.value || null,
                        previewImageUrl: previewImageUrlField.value || null,
                        displayOrder: 11,
                        viewUrl: viewUrlField.value || null,
                        tags: tagsField.value.split(',').map(x => x.trim()),
                    });
                    if (result instanceof Error) {
                        isError.value = true;
                        return;
                    }

                    router.push({
                        path: `/project/edit/${result.reference}`,
                    });
                }
                else {
                    const result = await projectClient.updateProject(project.value.reference, {
                        title: titleField.value,
                        urlSlug: urlSlugField.value || null,
                        startedAt: dayjs(startDateField.value).toISOString(),
                        summary: summaryField.value,
                        description: descriptionField.value,
                        sourceCodeUrl: sourceCodeUrlField.value || null,
                        previewImageUrl: previewImageUrlField.value || null,
                        displayOrder: 11,
                        viewUrl: viewUrlField.value || null,
                        tags: tagsField.value.split(',').map(x => x.trim()),
                    });
                    if (result instanceof Error) {
                        isError.value = true;
                        return;
                    }

                    router.push({
                        path: `/project/edit/${result.reference}`,
                    });
                }
            },
        }
    },
});
</script>

<style lang="scss">
</style>