<template>
    <PageContentComponent class="project-view" v-if="project !== null">
        <PageTitleComponent :title="project.title" />
        <PageActionsBarComponent
            returnLink="/projects"
            returnText="Return to Projects"
        >
            <LinkComponent
                :href="project.viewLink"
                v-if="project.viewLink !== null"
            >
                <ButtonComponent>
                    <LinkIcon />
                </ButtonComponent>
            </LinkComponent>
            <LinkComponent
                :href="project.sourceCodeURL"
                v-if="project.sourceCodeURL !== null"
            >
                <ButtonComponent>
                    <GitHubIcon />
                </ButtonComponent>
            </LinkComponent>
        </PageActionsBarComponent>
        <div v-if="isLoading">
            <LoadingComponent message="Loading Project Details" />
        </div>
        <div v-else v-html="project.description"></div>
    </PageContentComponent>
    <PageContentComponent class="project-view" v-else-if="isError">
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
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/PageTitle.component.vue';
import PageActionsBarComponent from '@/component/PageActionsBar.component.vue';
import ButtonComponent from '@/component/Button.component.vue';
import LinkComponent from '@/component/Link.component.vue';
import ErrorComponent from '@/component/Error.component.vue';
import LoadingComponent from '@/component/Loading.component.vue';
import LinkIcon from '@/component/icon/ExternalLinkIcon.component.vue';
import GitHubIcon from '@/component/icon/GitHubIcon.component.vue';
import EditIcon from '@/component/icon/PencilIcon.component.vue';

import { projectClient } from '@/api/client/projects/Project.client';

import { Project } from '@/model/Project.model';

export default defineComponent({
    name: 'ProjectView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        PageActionsBarComponent,
        ButtonComponent,
        LinkComponent,
        ErrorComponent,
        LoadingComponent,
        LinkIcon,
        GitHubIcon,
        EditIcon,
    },

    setup() {
        const route = useRoute();

        const project = ref<Project | null>(null);
        const isLoading = ref<boolean>(false);
        const isError = ref<boolean>(false);

        onMounted(async () => {
            const urlSlug = route.params.urlSlug as string;

            isLoading.value = true;
            isError.value = false;

            const result = await projectClient.getProjectByUrlSlug(urlSlug);
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
            };

            isLoading.value = false;
            isError.value = false;
        });

        return {
            project,
            isLoading,
            isError,
        }
    },
});
</script>

<style lang="scss">
</style>