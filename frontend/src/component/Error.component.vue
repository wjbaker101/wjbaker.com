<template>
    <div class="error-component flex">
        <ErrorIcon class="flex-auto" />
        <div>
            <span>{{ message }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ErrorIcon from '@/component/icon/ExclamationCircleIcon.component.vue';

export default defineComponent({
    name: 'ErrorComponent',

    components: {
        ErrorIcon,
    },

    props: {
        message: String,
    },

    setup() {},
});
</script>

<style lang="scss">
.error-component {
    padding: 1rem;
    background-color: theme(negative-light);
    border: 1px solid theme(negative);
    border-radius: border-radius();
    color: theme(white);

    .icon-exclamation-circle {
        margin: auto 1rem auto 0;
    }
}
</style>