<template>
    <PageContentComponent class="projects-settings-view">
        <PageTitleComponent title="Projects Settings" />
        <div v-if="isLoading">
            <LoadingComponent message="Loading projects settings" />
        </div>
        <UserMessageComponent :details="loadUserMessage" />
        <div v-if="!isLoading && !loadUserMessage.isVisible">
            <PageActionsBarComponent returnLink="/projects" returnText="Return to Projects">
            </PageActionsBarComponent>
            <section class="display-order">
                <h2>Display Order</h2>
                <Draggable
                    v-if="settings !== null"
                    v-model="settings.displayOrder"
                    tag="table"
                    item-key="reference"
                    class="display-order-table hoverable"
                >
                    <template #header>
                        <thead>
                            <tr>
                                <th class="text-center">Order</th>
                                <th>Project Title</th>
                            </tr>
                        </thead>
                    </template>
                    <template #item="{element}">
                        <tr>
                            <td class="text-center"></td>
                            <td>{{ element.title }}</td>
                        </tr>
                    </template>
                </Draggable>
                <ButtonComponent @click="onUpdateDisplayOrder">Update Display Order</ButtonComponent>
                <UserMessageComponent :details="displayOrderUserMessage" />
            </section>
        </div>
    </PageContentComponent>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Draggable from 'vuedraggable';

import ProjectTagComponent from '@/view/projects/component/ProjectTag.component.vue';
import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/layout/PageTitle.component.vue';
import PageActionsBarComponent from '@/component/layout/PageActionsBar.component.vue';
import LoadingComponent from '@/component/Loading.component.vue';
import ButtonComponent from '@/component/Button.component.vue';
import UserMessageComponent, { UserMessage } from '@/component/UserMessage.component.vue';

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
        ProjectTagComponent,
        PageContentComponent,
        PageTitleComponent,
        PageActionsBarComponent,
        LoadingComponent,
        ButtonComponent,
        UserMessageComponent,
    },

    setup() {
        const settings = ref<ProjectsSettings | null>(null);
        const isLoading = ref<boolean>(false);

        const loadUserMessage = ref<UserMessage>(UserMessage.none());
        const displayOrderUserMessage = ref<UserMessage>(UserMessage.none());

        onMounted(async () => {
            isLoading.value = true;
            loadUserMessage.value = UserMessage.none();

            const result = await projectsSettingsClient.getProjectsSettings();
            if (result instanceof Error) {
                isLoading.value = false;
                loadUserMessage.value = UserMessage.error(result.message || 'Unable to load projects settings; please try refreshing the page.');
                return;
            }

            settings.value = {
                displayOrder: result.displayOrder.map(x => ({
                    reference: x.reference,
                    title: x.title,
                })),
            };

            isLoading.value = false;
            loadUserMessage.value = UserMessage.none();
        });

        return {
            settings,
            isLoading,
            loadUserMessage,
            displayOrderUserMessage,

            async onUpdateDisplayOrder() {
                if (settings.value === null)
                    return;

                displayOrderUserMessage.value = UserMessage.none();

                const result = await projectsSettingsClient.updateProjectsSettings({
                    displayOrder: settings.value.displayOrder.map(x => x.reference),
                });
                if (result instanceof Error) {
                    displayOrderUserMessage.value = UserMessage.error(result.message || 'Unable to update projects display order; please try refreshing the page.');
                    return;
                }

                displayOrderUserMessage.value = UserMessage.success('Successfully updated projects display order.');
            },
        }
    },
});
</script>

<style lang="scss">
.projects-settings-view {
    .display-order-table {
        counter-reset: displayOrder;

        td {
            cursor: grab;

            &:first-child::before {
                counter-increment: displayOrder;
                content: counter(displayOrder);
            }
        }
    }
}
</style>