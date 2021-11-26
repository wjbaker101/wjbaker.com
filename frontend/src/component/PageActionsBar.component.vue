<template>
    <div class="page-actions-bar-component flex">
        <div class="return flex-1">
            <router-link
                v-if="returnLink !== undefined"
                :to="returnLink"
            >
                <ArrowLeftComponent />
                {{ returnText }}
            </router-link>
        </div>
        <div class="actions flex gap-small flex-auto">
            <slot />
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

    .return {
        margin: auto 0;

        .svg-icon {
            margin-right: 0.25rem;
        }
    }
}
</style>