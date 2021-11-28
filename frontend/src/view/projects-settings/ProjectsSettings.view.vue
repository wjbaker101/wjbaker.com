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
        <div v-else>
        </div>
    </PageContentComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ProjectTagComponent from '@/view/projects/component/ProjectTag.component.vue';
import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/PageTitle.component.vue';
import PageActionsBarComponent from '@/component/PageActionsBar.component.vue';
import LoadingComponent from '@/component/Loading.component.vue';
import ButtonComponent from '@/component/Button.component.vue';
import ErrorComponent from '@/component/Error.component.vue';

export default defineComponent({
    name: 'ProjectSettingsView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        PageActionsBarComponent,
        LoadingComponent,
        ButtonComponent,
        ErrorComponent,
        ProjectTagComponent,
    },

    setup() {
        return {
        }
    },
});
</script>

<style lang="scss">
</style>