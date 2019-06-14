<template>
    <button
        class="wjb-button"
        :disabled="isDisabled"
        v-bind:class="{ 'ghost-button': isGhostButton }">

        <LoadingIcon v-if="doShowLoadingIcon" />
        <slot />
    </button>
</template>

<script>
    import LoadingIcon from '@/assets/icons/loading.svg';

    export default {
        name: 'ButtonComponent',

        components: {
            LoadingIcon,
        },

        props: [ 'doShowLoadingIcon', 'isDisabled', 'isGhostButton' ],
    }
</script>

<style lang="scss">
    .wjb-button {
        padding: 0.75rem 1rem;
        font: inherit;
        line-height: 1em;
        background-color: theme(tertiary);
        border-radius: layout(border-radius);
        border: 2px solid theme(tertiary-dark);
        color: theme(white);
        cursor: pointer;
        vertical-align: middle;
        transition: background-color 0.2s;

        &:hover {
            background-color: theme(tertiary-dark);
        }

        .icon-loading {
            width: 0;
            opacity: 0;
            color: theme(white);

            &.visible {
                width: 2rem;
                opacity: 1;
            }
        }

        &[disabled] {
            background-color: theme(primary-light);
            color: theme(grey-dark);
            border-color: theme(grey-dark);
            cursor: not-allowed;
        }

        & + button {
            margin-left: 0.5rem;
        }

        &.ghost-button {
            border: 2px solid theme(tertiary);
            background-color: theme(white);
            color: theme(black);

            &:hover {
                border: 2px solid theme(tertiary-dark);
                background-color: theme(tertiary);
                color: theme(white);
            }
        }
    }
</style>
