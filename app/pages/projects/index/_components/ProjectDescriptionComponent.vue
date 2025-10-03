<template>
    <div v-if="isSelected" class="grid col-span-2 max-md:col-span-1 px-4 py-8 border border-slate-300 rounded-md text-center">
        <h2 class="mb-4 text-3xl">{{ project.title }}</h2>
        <div class="bg-gradient-to-r from-secondary-light to-primary-light mx-auto mb-8 rounded-full w-16 h-0.25"></div>
        <div class="mx-auto max-w-md">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IProject } from '~/pages/projects/index/_logic/Project';

defineProps<{
    project: IProject;
    isSelected: boolean;
}>();
</script>