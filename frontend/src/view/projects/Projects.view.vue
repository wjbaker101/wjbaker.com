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
            <section class="projects">
                <ProjectItemComponent
                    :key="project.reference"
                    v-for="project in projects"
                    :project="project"
                />
            </section>
            <section class="page-navigation">
                <PageActionsBarComponent>
                    <template v-slot:center>
                        <div class="flex-1 text-center" :class="{ 'is-disabled': currentPage === 1 }">
                            <router-link :to="routerPrevPage">
                                <ArrowLeftIconComponent />
                            </router-link>
                        </div>
                        <div class="flex-auto text-center">
                            {{ currentPage }}
                        </div>
                        <div class="flex-1 text-center">
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
import PageTitleComponent from '@/component/PageTitle.component.vue';
import PageActionsBarComponent from '@/component/PageActionsBar.component.vue';
import LoadingComponent from '@/component/Loading.component.vue';
import ErrorComponent from '@/component/Error.component.vue';
import ProjectItemComponent from '@/view/projects/component/ProjectItem.component.vue';
import ArrowLeftIconComponent from '@/component/icon/ArrowLeftIcon.component.vue';
import ArrowRightIconComponent from '@/component/icon/ArrowRightIcon.component.vue';

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
        PageActionsBarComponent,
        LoadingComponent,
        ErrorComponent,
        ProjectItemComponent,
        ProjectTagComponent,
        ArrowLeftIconComponent,
        ArrowRightIconComponent,
    },

    setup() {
        const route = useRoute();

        const projects = ref<Array<Project>>([]);
        const isLoading = ref<boolean>(false);
        const isError = ref<boolean>(false);

        const tagFrequencies = ref<Array<TagFrequency> | null>(null);

        const currentPage = computed<number>(() => Number(route.query.page));
        const maxPages = ref<number>(Number.MAX_VALUE);

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

            isLoading.value = false;
        };

        watch(currentPage, async () => {
            await loadProjects();
        });

        onMounted(async () => {
            await loadProjects();
        });

        return {
            projects,
            isLoading,
            isError,
            currentPage,
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
        .is-disabled {
            color: theme(grey-dark);
        }
    }
}
</style>