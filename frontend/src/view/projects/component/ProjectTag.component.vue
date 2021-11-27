<template>
    <small class="project-tag-component">
        <span>{{ tag }}</span>
        <strong v-if="frequency"> ({{ frequency }})</strong>
    </small>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ProjectTagComponent',

    props: {
        tag: {
            type: String,
            required: true,
        },
        frequency: {
            type: Number,
            required: false,
        },
    },

    setup() {},
});
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