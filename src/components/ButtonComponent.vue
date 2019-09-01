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

        props: [ 'isLoading', 'isDisabled', 'isGhostButton', 'isIconButton', 'isNegative' ],

        components: {
            LoadingIcon,
        },

        computed: {
            classList: function() {
                return {
                    'is-ghost': this.isGhostButton,
                    'is-loading': this.isLoading,
                    'is-icon-button': this.isIconButton,
                    'is-negative': this.isNegative,
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
        transition: all animation(duration-short);

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

        &.is-negative {
            border-color: theme(negative);
            color: theme(negative);

            &:hover {
                border-color: theme(negative-dark);
                color: theme(negative-dark);
            }

            &.is-icon-button {
                &:hover {
                    background-color: theme(negative-light);
                }
            }
        }

        & + .wjb-button {
            margin-left: 0.5rem;
        }
    }
</style>
