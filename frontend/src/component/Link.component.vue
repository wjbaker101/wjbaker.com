<template>
    <a
        class="link-component"
        target="_blank"
        rel="noopener noreferrer"
        :href="href"
        :title="title"
    >
        <slot />
    </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LinkComponent',

    props: {
        href: String,
        title: String,
    },

    setup() {},
});
</script>

<style lang="scss">
</style>