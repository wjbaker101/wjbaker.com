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
            <slot name="center" />
        </div>
        <div class="right flex gap-small flex-auto align-items-center">
            <slot name="right" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ArrowLeftComponent from '@/component/icon/ArrowLeftIcon.component.vue';

export default defineComponent({
    name: 'PageActionsBarComponent',

    components: {
        ArrowLeftComponent,
    },

    props: {
        returnLink: {
            type: String,
            required: false,
        },
        returnText: {
            type: String,
            required: false,
        },
    },

    setup() {},
});
</script>

<style lang="scss">
.page-actions-bar-component {
    padding: 1rem;
    margin-bottom: 2rem;
    border: 1px solid theme(secondary);
    border-radius: border-radius();
}
</style>