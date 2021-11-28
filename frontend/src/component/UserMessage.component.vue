<template>
    <div v-if="details.isVisible" class="user-message-component flex align-items-center" :class="{ [details.type]: true }">
        <Component :is="icon" :width="18" :height="18" class="flex-auto" />
        <div class="flex-1">
            <p class="text">{{ details.message }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, computed, defineComponent, PropType } from 'vue';

import ErrorIcon from '@/component/icon/ExclamationCircleIcon.component.vue';
import TickCircleIcon from '@/component/icon/TickCircleIcon.component.vue';

export interface UserMessageDetails {
    isVisible: boolean;
    type: UserMessageType;
    message: string;
}

type UserMessageType = 'error' | 'success';

export default defineComponent({
    name: 'UserMessageComponent',

    props: {
        details: {
            type: Object as PropType<UserMessageDetails>,
            required: true,
        },
    },

    setup(props) {
        const icon = computed<Component | null>(() => {
            switch (props.details.type) {
                case 'error': return ErrorIcon;
                case 'success': return TickCircleIcon;
                default:
                    return null;
            }
        });

        return {
            icon,
        }
    },
});
</script>

<style lang="scss">
.user-message-component {
    margin: 1rem 0;
    border-radius: border-radius();

    &.error {
        border: 1px solid theme(negative-light);
        border-left: 3px solid theme(negative-dark);
        background-color: transparentize(theme(negative), 0.7);
        color: theme(negative-dark);
    }

    &.success {
        border: 1px solid theme(positive-light);
        border-left: 3px solid theme(positive-dark);
        background-color: transparentize(theme(positive), 0.7);
        color: theme(positive-dark);
    }

    .svg-icon {
        margin: 1rem 2rem;
    }

    p.text {
        margin-left: 0;
    }
}
</style>