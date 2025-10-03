<template>
    <div class="group relative py-8 text-center cursor-pointer">
        <div class="top-0 right-0 left-0 absolute bg-gradient-to-r from-primary-light to-secondary-light h-[1px]"></div>
        <img :src="project.imageUrl" class="mx-auto mb-4 max-h-[100px] group-hover:scale-110">
        <h2 class="mb-2 text-2xl">{{ project.title }}</h2>
        <p class="text-slate-600">{{ project.timePeriod }}</p>
        <div
            :class="{
                'opacity-0 -translate-y-4': !isSelected,
                'opacity-100 translate-y-0': isSelected,
            }"
            class="-bottom-8 left-1/2 absolute -translate-x-1/2 pointer-events-none"
        >
            <ChevronDownIcon class="size-8 text-slate-500" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from 'lucide-vue-next';

import type { IProject } from '~/pages/projects/index/_logic/Project';

defineProps<{
    project: IProject;
    isSelected: boolean;
}>();
</script>