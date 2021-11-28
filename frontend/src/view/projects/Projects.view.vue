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
            <PageActionsBarComponent v-if="isAdmin">
                <template v-slot:right>
                    <router-link to="/project/edit">
                        <ButtonComponent><AddIcon /></ButtonComponent>
                    </router-link>
                    <router-link to="/projects/settings">
                        <ButtonComponent><EditIcon /></ButtonComponent>
                    </router-link>
                </template>
            </PageActionsBarComponent>
            <section class="projects">
                <ProjectItemComponent
                    :key="project.reference"
                    v-for="project in projects"
                    :project="project"
                />
            </section>
            <section class="page-navigation" v-if="maxPages > 1">
                <PageActionsBarComponent>
                    <template v-slot:center>
                        <div class="flex-1 text-center" :class="{ 'is-disabled': currentPage === 1 }">
                            <router-link :to="routerPrevPage">
                                <ArrowLeftIconComponent />
                            </router-link>
                        </div>
                        <div class="flex-auto text-center">
                            <strong>{{ currentPage }}</strong> <small>/ {{ maxPages }}</small>
                        </div>
                        <div class="flex-1 text-center" :class="{ 'is-disabled': currentPage === maxPages }">
                            <router-link :to="routerNextPage">
                                <ArrowRightIconComponent />
                            </router-link>
                        </div>
                    </template>
                </PageActionsBarComponent>
            </section>
            <section>
                <h3>Tags</h3>
                <p>
                    <ProjectTagComponent
                        :key="`tagFrequency-${index}`"
                        v-for="(tagFrequency, index) in tagFrequencies"
                        :tag="tagFrequency.tag"
                        :frequency="tagFrequency.frequency"
                    />
                </p>
            </section>
        </div>
    </PageContentComponent>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import dayjs from 'dayjs';

import ProjectTagComponent from '@/view/projects/component/ProjectTag.component.vue';
import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/layout/PageTitle.component.vue';
import PageActionsBarComponent from '@/component/layout/PageActionsBar.component.vue';
import LoadingComponent from '@/component/Loading.component.vue';
import ButtonComponent from '@/component/Button.component.vue';
import ErrorComponent from '@/component/Error.component.vue';
import ProjectItemComponent from '@/view/projects/component/ProjectItem.component.vue';
import ArrowLeftIconComponent from '@/component/icon/ArrowLeftIcon.component.vue';
import ArrowRightIconComponent from '@/component/icon/ArrowRightIcon.component.vue';
import EditIcon from '@/component/icon/PencilIcon.component.vue';
import AddIcon from '@/component/icon/PlusIcon.component.vue';

import { projectClient } from '@/api/client/projects/Project.client';
import { userService } from '@/service/user/User.service';

import { Project } from '@/model/Project.model';
import { UserType } from '@/model/User.model';

interface TagFrequency {
    tag: string;
    frequency: number;
}

export default defineComponent({
    name: 'ProjectsView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        PageActionsBarComponent,
        LoadingComponent,
        ButtonComponent,
        ErrorComponent,
        ProjectItemComponent,
        ProjectTagComponent,
        ArrowLeftIconComponent,
        ArrowRightIconComponent,
        EditIcon,
        AddIcon,
    },

    setup() {
        const route = useRoute();

        const authDetails = userService.getAuthDetails();
        const isAdmin = computed<boolean>(() => authDetails.value?.user.type === UserType.Admin);

        const projects = ref<Array<Project>>([]);
        const isLoading = ref<boolean>(false);
        const isError = ref<boolean>(false);

        const tagFrequencies = ref<Array<TagFrequency> | null>(null);

        const currentPage = computed<number>(() => Number(route.query.page ?? 1));
        const total = ref<number | null>(null);
        const pageSize = ref<number | null>(null);

        const maxPages = computed<number>(() => {
            if (total.value === null || pageSize.value === null)
                return Number.MAX_VALUE;

            return Math.ceil(total.value / pageSize.value);
        });

        const routerPrevPage = computed<RouteLocationNormalizedLoaded>(() => ({
            ...route,
            query: {
                ...route.query,
                page: String(Math.max(1, currentPage.value - 1)),
            },
        }));
        const routerNextPage = computed<RouteLocationNormalizedLoaded>(() => ({
            ...route,
            query: {
                ...route.query,
                page: String(Math.min(maxPages.value, currentPage.value + 1)),
            },
        }));

        const loadProjects = async function () {
            isLoading.value = true;
            isError.value = false;

            const response = await projectClient.searchProjects(currentPage.value);
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

            total.value = response.total;
            pageSize.value = response.pageSize;

            isLoading.value = false;
        };

        watch(currentPage, async () => {
            await loadProjects();
        });

        onMounted(async () => {
            await loadProjects();
        });

        return {
            isAdmin,
            projects,
            isLoading,
            isError,
            currentPage,
            total,
            pageSize,
            maxPages,
            routerPrevPage,
            routerNextPage,
            tagFrequencies,
        }
    },
});
</script>

<style lang="scss">
.projects-view {
    .page-navigation {
        margin-top: 3rem;

        .is-disabled a {
            color: theme(grey-dark);
        }
    }
}
</style>