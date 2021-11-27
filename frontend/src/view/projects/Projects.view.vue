<template>
    <PageContentComponent class="projects-view">
        <PageTitleComponent title="Projects" />
        <div v-if="isLoading">
            <LoadingComponent message="Loading Projects" />
        </div>
        <ErrorComponent
            v-else-if="isError"
            message="Unable to load projects; try refreshing the page."
        />
        <div v-else>
            <div class="projects">
                <ProjectItemComponent
                    :key="project.reference"
                    v-for="project in projects"
                    :project="project"
                />
            </div>
        </div>
    </PageContentComponent>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import dayjs from 'dayjs';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/PageTitle.component.vue';
import LoadingComponent from '@/component/Loading.component.vue';
import ErrorComponent from '@/component/Error.component.vue';
import ProjectItemComponent from '@/view/projects/component/ProjectItem.component.vue';

import { projectClient } from '@/api/client/projects/Project.client';

import { Project } from '@/model/Project.model';

export default defineComponent({
    name: 'ProjectsView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        LoadingComponent,
        ErrorComponent,
        ProjectItemComponent,
    },

    setup() {
        const projects = ref<Array<Project>>([]);
        const isLoading = ref<boolean>(false);
        const isError = ref<boolean>(false);

        onMounted(async () => {
            isLoading.value = true;
            isError.value = false;

            const response = await projectClient.searchProjects(1);
            if (response instanceof Error) {
                isLoading.value = false;
                isError.value = true;
                return;
            }

            projects.value = response.projects.map(x => ({
                reference: x.reference,
                title: x.title,
                urlSlug: x.urlSlug,
                startedAt: dayjs(x.startedAt),
                summary: x.summary,
                description: null,
                sourceCodeUrl: x.sourceCodeUrl,
                previewImageUrl: x.previewImageUrl,
                displayOrder: x.displayOrder,
                createdAt: dayjs(x.createdAt),
                viewUrl: x.viewUrl,
                tags: x.tags,
            }));

            isLoading.value = false;
        });

        return {
            projects,
            isLoading,
            isError,
        }
    },
});
</script>

<style lang="scss">
</style>