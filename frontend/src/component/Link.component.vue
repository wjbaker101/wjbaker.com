<template>
    <a
        class="link-component"
        target="_blank"
        rel="noopener noreferrer"
        :href="href"
        :title="title"
    >
        <slot></slot>
    </a>
</template>

<script setup lang="ts">
defineProps<{
    href: string;
    title?: string;
}>();
</script>

<style lang="scss">
</style>