<template>
    <div class="project-component flex gap flex-responsive">
        <div class="image-container flex-1 flex-vh-center text-center">
            <FolderIcon v-if="project.previewImageUrl === null" />
            <img v-else :src="project.previewImageUrl">
        </div>
        <div class="content-container flex-2">
            <h3>{{ project.title }}</h3>
            <small>{{ displayDate }}</small>
            <p>{{ project.summary }}</p>
            <div class="flex gap-small">
                <div class="flex-1">
                    <LinkComponent :href="url">
                        <ButtonComponent>More Details</ButtonComponent>
                    </LinkComponent>
                </div>
                <div v-if="project.destinationUrl !== null" class="flex-auto">
                    <LinkComponent :href="project.viewUrl">
                        <ButtonComponent><ExternalLinkIcon /></ButtonComponent>
                    </LinkComponent>
                </div>
                <div v-if="project.sourceCodeUrl !== null" class="flex-auto">
                    <LinkComponent :href="project.sourceCodeUrl">
                        <ButtonComponent><GitHubIcon /></ButtonComponent>
                    </LinkComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import ButtonComponent from '@/component/Button.component.vue';
import LinkComponent from '@/component/Link.component.vue';
import ExternalLinkIcon from '@/component/icon/ExternalLinkIcon.component.vue';
import FolderIcon from '@/component/icon/FolderOpenIcon.component.vue';
import GitHubIcon from '@/component/icon/GitHubIcon.component.vue';

import { Project } from '@/model/Project.model';

export default defineComponent({
    name: 'ProjectItemComponent',

    components: {
        ButtonComponent,
        ExternalLinkIcon,
        FolderIcon,
        GitHubIcon,
        LinkComponent,
    },

    props: {
        project: {
            type: Object as PropType<Project>,
            required: true,
        },
    },

    setup(props) {
        const displayDate = computed<string>(() => props.project.startedAt.format('MMMM YYYY'));
        const url = computed<string>(() => `/project/${props.project.urlSlug}`);

        return {
            displayDate,
            url,
        }
    },
});
</script>

<style lang="scss">
.project-component {
    h3 {
        margin-top: 0;
        line-height: 1em;
    }

    & + .project-component {
        $padding: 3rem;

        margin-top: $padding;
        padding-top: $padding;
        border-top: 1px solid theme(grey-dark);
    }
}
</style>