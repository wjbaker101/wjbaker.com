<template>
    <div v-if="details.isVisible" class="user-message-component flex align-items-center" :class="{ [details.type]: true }">
        <Component :is="icon" :width="18" :height="18" class="flex-auto" />
        <div class="flex-1">
            <p class="text">{{ details.message }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import ErrorIcon from '@/component/icon/ExclamationCircleIcon.component.vue';
import TickCircleIcon from '@/component/icon/TickCircleIcon.component.vue';

const props = defineProps<{
    details: UserMessage;
}>();

const icon = computed<any | null>(() => {
    switch (props.details.type) {
        case 'error': return ErrorIcon;
        case 'success': return TickCircleIcon;
        default:
            return null;
    }
});
</script>

<script lang="ts">
import { defineComponent } from 'vue';

type UserMessageType = 'error' | 'success';

export class UserMessage {

    private _isVisible!: boolean;
    private _type!: UserMessageType;
    private _message!: string;

    constructor(isVisible: boolean, type: UserMessageType, message: string) {
        this._isVisible = isVisible;
        this._type = type;
        this._message = message;
    }

    get isVisible(): boolean { return this._isVisible; }
    get type(): UserMessageType { return this._type; }
    get message(): string { return this._message; }

    public static none(): UserMessage {
        return new UserMessage(false, 'error', '');
    }

    public static error(message: string): UserMessage {
        return new UserMessage(true, 'error', message);
    }

    public static success(message: string): UserMessage {
        return new UserMessage(true, 'success', message);
    }
}

export default defineComponent({
    name: 'UserMessageComponent',
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