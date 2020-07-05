<template functional>
    <small class="project-tag-component">
        <span>{{ props.tag.name }}</span>
        <strong v-if="props.tag.frequency"> ({{ props.tag.frequency }})</strong>
    </small>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { ProjectTag } from '@frontend/model/ProjectTag';

    @Component({
        components: {},
    })
    export default class ProjectTagComponent extends Vue {

        @Prop({
            required: true,
        })
        private readonly tag!: ProjectTag;
    }
</script>

<style lang="scss">
    .project-tag-component {
        padding: 0.25rem;
        margin: 0.125rem;
        display: inline-block;
        line-height: 1em;
        background-color: theme(secondary);
        border: 1px solid theme(secondary-dark);
        border-radius: border-radius();
        color: theme(white);
    }
</style>
