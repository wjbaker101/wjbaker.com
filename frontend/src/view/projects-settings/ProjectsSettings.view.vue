<template>
    <PageContentComponent class="projects-settings-view">
        <PageTitleComponent title="Projects Settings" />
        <div v-if="isLoading">
            <LoadingComponent message="Loading projects settings" />
        </div>
        <ErrorComponent
            v-else-if="isError"
            message="Unable to load projects settings; please try refreshing the page."
        />
        <div v-else-if="settings !== null">
            <section class="display-order">
                <h2>Display Order</h2>
                <Draggable v-model="settings.displayOrder" tag="ol" item-key="reference">
                    <template #item="{element}">
                        <li>{{ element.title }}</li>
                    </template>
                </Draggable>
                <ButtonComponent @click="onUpdateDisplayOrder">Update Display Order</ButtonComponent>
            </section>
        </div>
    </PageContentComponent>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import Draggable from 'vuedraggable';

import ProjectTagComponent from '@/view/projects/component/ProjectTag.component.vue';
import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/PageTitle.component.vue';
import PageActionsBarComponent from '@/component/PageActionsBar.component.vue';
import LoadingComponent from '@/component/Loading.component.vue';
import ButtonComponent from '@/component/Button.component.vue';
import ErrorComponent from '@/component/Error.component.vue';

import { projectsSettingsClient } from '@/api/client/projects-settings/ProjectsSettings.client';

interface ProjectsSettings {
    displayOrder: Array<DisplayOrder>;
}

interface DisplayOrder {
    reference: string;
    title: string;
}

export default defineComponent({
    name: 'ProjectSettingsView',

    components: {
        Draggable,
        PageContentComponent,
        PageTitleComponent,
        PageActionsBarComponent,
        LoadingComponent,
        ButtonComponent,
        ErrorComponent,
        ProjectTagComponent,
    },

    setup() {
        const settings = ref<ProjectsSettings | null>(null);
        const isLoading = ref<boolean>(false);
        const isError = ref<boolean>(false);

        onMounted(async () => {
            isLoading.value = true;
            isError.value = false;

            const result = await projectsSettingsClient.getProjectsSettings();
            if (result instanceof Error) {
                isLoading.value = false;
                isError.value = true;
                return;
            }

            settings.value = {
                displayOrder: result.displayOrder.map(x => ({
                    reference: x.reference,
                    title: x.title,
                })),
            };

            isLoading.value = false;
            isError.value = false;
        });

        return {
            settings,
            isLoading,
            isError,

            async onUpdateDisplayOrder() {
                if (settings.value === null)
                    return;

                const result = await projectsSettingsClient.updateProjectsSettings({
                    displayOrder: settings.value.displayOrder.map(x => x.reference),
                });
                if (result instanceof Error) {
                    return;
                }
            },
        }
    },
});
</script>

<style lang="scss">
</style>