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
            <div>
                <h3>Tags</h3>
                <p>
                    <ProjectTagComponent
                        :key="`tagFrequency-${index}`"
                        v-for="(tagFrequency, index) in tagFrequencies"
                        :tag="tagFrequency.tag"
                        :frequency="tagFrequency.frequency"
                    />
                </p>
            </div>
        </div>
    </PageContentComponent>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import dayjs from 'dayjs';

import ProjectTagComponent from '@/view/projects/component/ProjectTag.component.vue';
import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/PageTitle.component.vue';
import LoadingComponent from '@/component/Loading.component.vue';
import ErrorComponent from '@/component/Error.component.vue';
import ProjectItemComponent from '@/view/projects/component/ProjectItem.component.vue';

import { projectClient } from '@/api/client/projects/Project.client';

import { Project } from '@/model/Project.model';

interface TagFrequency {
    tag: string;
    frequency: number;
}

export default defineComponent({
    name: 'ProjectsView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        LoadingComponent,
        ErrorComponent,
        ProjectItemComponent,
        ProjectTagComponent,
    },

    setup() {
        const projects = ref<Array<Project>>([]);
        const isLoading = ref<boolean>(false);
        const isError = ref<boolean>(false);

        const tagFrequencies = ref<Array<TagFrequency> | null>(null);

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

            tagFrequencies.value = response.tagFrequencies.map(x => ({
                tag: x.tag,
                frequency: x.frequency,
            }));

            isLoading.value = false;
        });

        return {
            projects,
            isLoading,
            isError,
            tagFrequencies,
        }
    },
});
</script>

<style lang="scss">
</style>