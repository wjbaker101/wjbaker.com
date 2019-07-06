<template>
    <button
        class="wjb-button"
        :disabled="disabled"
        :class="classList">

        <LoadingIcon class="button-loading-icon" />
        <span class="button-content">
            <slot></slot>
        </span>
    </button>
</template>

<script>
    import LoadingIcon from '@/assets/icons/loading.svg';

    export default {
        name: 'ButtonComponent',

        props: [ 'isLoading', 'isDisabled', 'isGhostButton', 'isIconButton' ],

        components: {
            LoadingIcon,
        },

        computed: {
            classList: function() {
                return {
                    'is-ghost': this.isGhostButton,
                    'is-loading': this.isLoading,
                    'is-icon-button': this.isIconButton,
                }
            },
            disabled: function() {
                return this.isDisabled || this.isLoading;
            },
        },
    }
</script>

<style lang="scss">
    .wjb-button {
        padding: 0.75rem 1rem;
        font: inherit;
        letter-spacing: inherit;
        line-height: 1rem;
        background-color: theme(tertiary);
        border-radius: layout(border-radius);
        border: 2px solid theme(tertiary-dark);
        color: theme(white);
        cursor: pointer;
        vertical-align: middle;
        transition: background-color 0.2s;

        .button-content {
            vertical-align: middle;
        }

        &:hover {
            background-color: theme(tertiary-dark);
        }

        .button-loading-icon {
            width: 0;
            opacity: 0;
            pointer-events: none;
            vertical-align: middle;
        }

        &.is-loading {
            .button-loading-icon {
                width: auto;
                opacity: 1;
                margin-right: 0.5rem;
                pointer-events: all;
            }
        }

        &.is-ghost {
            background-color: theme(white);
            border-color: theme(tertiary-light);
            color: theme(black-dark);

            &:hover {
                background-color: theme(tertiary-light);
                border-color: theme(tertiary);
                color: theme(White);
            }
        }

        &:disabled:not(.is-loading) {
            background-color: theme(primary-light);
            color: theme(grey-dark);
            border-color: theme(grey-dark);
            cursor: not-allowed;
        }

        &.is-icon-button {
            padding: 0.5rem;
            border-radius: 50%;
            color: theme(secondary);
            background-color: theme(white);
            border-color: theme(secondary);

            &:hover {
                background-color: theme(secondary);
                color: theme(white);
                border-color: theme(secondary-dark);
            }
        }

        & + .wjb-button {
            margin-left: 0.5rem;
        }
    }
</style>
