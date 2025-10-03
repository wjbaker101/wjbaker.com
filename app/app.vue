<template>
    <NuxtLayout>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>

<script setup lang="ts">
</script>

<style lang="css">
@reference '~/styling/main.css';

html,
body,
#__nuxt {
    @apply h-full;
}

body {
    @apply relative bg-amber-50 transition-none;

    font-family: 'Nunito', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}

*,
*::before,
*::after {
    @apply transition-all;
}
</style>