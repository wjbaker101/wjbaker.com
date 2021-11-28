<template>
    <PageContentComponent class="project-view">
        <PageTitleComponent :title="project?.title ?? 'Loading Projects'" />
        <PageActionsBarComponent returnLink="/projects" returnText="Return to Projects">
            <template v-slot:right v-if="project !== null">
                <LinkComponent v-if="project.viewUrl !== null" :href="project.viewUrl">
                    <ButtonComponent><LinkIcon /></ButtonComponent>
                </LinkComponent>
                <LinkComponent v-if="project.sourceCodeUrl !== null" :href="project.sourceCodeUrl">
                    <ButtonComponent><GitHubIcon /></ButtonComponent>
                </LinkComponent>
                <router-link v-if="isAdmin" :to="`/project/edit/${project.reference}`">
                    <ButtonComponent><EditIcon /></ButtonComponent>
                </router-link>
            </template>
        </PageActionsBarComponent>
        <div v-if="isLoading">
            <LoadingComponent message="Loading Project Details" />
        </div>
        <UserMessageComponent :details="userMessage" />
        <div v-if="!isLoading && !userMessage.isVisible" v-html="markdown"></div>
    </PageContentComponent>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import MarkdownIt from 'markdown-it';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/layout/PageTitle.component.vue';
import PageActionsBarComponent from '@/component/layout/PageActionsBar.component.vue';
import ButtonComponent from '@/component/Button.component.vue';
import LinkComponent from '@/component/Link.component.vue';
import UserMessageComponent, { UserMessage } from '@/component/UserMessage.component.vue';
import LoadingComponent from '@/component/Loading.component.vue';
import LinkIcon from '@/component/icon/ExternalLinkIcon.component.vue';
import GitHubIcon from '@/component/icon/GitHubIcon.component.vue';
import EditIcon from '@/component/icon/PencilIcon.component.vue';

import { projectClient } from '@/api/client/projects/Project.client';
import { userService } from '@/service/user/User.service';

import { Project } from '@/model/Project.model';
import { UserType } from '@/model/User.model';

const markdownIt = new MarkdownIt();

export default defineComponent({
    name: 'ProjectView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        PageActionsBarComponent,
        ButtonComponent,
        LinkComponent,
        UserMessageComponent,
        LoadingComponent,
        LinkIcon,
        GitHubIcon,
        EditIcon,
    },

    setup() {
        const route = useRoute();

        const project = ref<Project | null>(null);
        const isLoading = ref<boolean>(false);

        const userMessage = ref<UserMessage>(UserMessage.none());

        const markdown = computed<string | null>(() => {
            if (project.value === null || project.value.description === null)
                return null;

            return markdownIt.render(project.value.description);
        });

        const authDetails = userService.getAuthDetails();
        const isAdmin = computed<boolean>(() => authDetails.value?.user.type === UserType.Admin);

        onMounted(async () => {
            const urlSlug = route.params.urlSlug as string;

            isLoading.value = true;
            userMessage.value = UserMessage.none();

            const result = await projectClient.getProjectByUrlSlug(urlSlug);
            if (result instanceof Error) {
                isLoading.value = false;
                userMessage.value = UserMessage.error(result.message || 'Unable to load project, please try refreshing the page.');
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

            isLoading.value = false;
            userMessage.value = UserMessage.none();
        });

        return {
            project,
            isLoading,
            userMessage,
            markdown,
            isAdmin,
        }
    },
});
</script>

<style lang="scss">
</style>