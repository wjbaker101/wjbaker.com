<template>
    <NuxtLink v-bind="$props" class="decoration-double underline underline-offset-2 hover:no-underline">
        <slot></slot>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { NuxtLinkProps } from '#app';

defineProps<NuxtLinkProps>();
</script>