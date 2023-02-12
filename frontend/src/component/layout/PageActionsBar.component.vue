<template>
    <div class="page-actions-bar-component flex gap align-items-center flex-responsive">
        <div class="left flex-auto">
            <router-link
                v-if="returnLink !== undefined"
                :to="returnLink"
                class="flex gap-small align-items-center"
            >
                <ArrowLeftComponent />
                <span>{{ returnText }}</span>
            </router-link>
        </div>
        <div class="center flex gap-small flex-1 align-items-center">
            <Slot name="center"></Slot>
        </div>
        <div class="right flex gap-small flex-auto align-items-center">
            <Slot name="right"></Slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import ArrowLeftComponent from '@/component/icon/ArrowLeftIcon.component.vue';

defineProps<{
    returnLink?: string;
    returnText?: string;
}>();
</script>

<style lang="scss">
.page-actions-bar-component {
    padding: 1rem;
    margin-bottom: 2rem;
    border: 1px solid theme(secondary);
    border-radius: border-radius();
}
</style>