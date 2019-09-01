<template>
    <div class="loading-component" v-if="isVisible">
        <div class="loading-spinner" :class="{ 'has-text': hasText }">
            <span class="loading-text" v-if="hasText">{{ text }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LoadingComponent',

        props: {
            text: {
                default: null,
            },
            isVisible: {
                default: false,
            },
        },

        computed: {
            hasText() {
                return this.text !== null;
            },
        },
    }
</script>

<style lang="scss">
    .loading-component {
        padding: 0.5rem;
        text-align: center;

        $spinner-size: 2rem;
        $spinner-speed: animation(duration-extended);

        .loading-spinner {
            min-width: $spinner-size;
            min-height: $spinner-size;
            display: inline-block;
            position: relative;
            animation: loading-spin $spinner-speed infinite;

            @keyframes loading-spin {
                from {
                    transform: rotate(0);
                }

                to {
                    transform: rotate(360deg);
                }
            }

            &::before,
            &::after {
                content: '';
                width: 0.75rem;
                height: 0.5rem;
                display: table;
                position: absolute;
                transition: border-color animation(duration-short), opacity animation(duration-short), transform animation(duration-short);
            }

            &::before {
                top: 0;
                left: 0;
                border-top: 2px solid theme(secondary);
                border-left: 2px solid theme(secondary);
                border-top-left-radius: layout(border-radius);
                animation: loading-top-left-anim $spinner-speed infinite;

                @keyframes loading-top-left-anim {
                    0% {
                        top: 0;
                        left: 0;
                    }

                    50% {
                        top: 25%;
                        left: 25%;
                    }

                    100% {
                        top: 0;
                        left: 0;
                    }
                }
            }

            &::after {
                bottom: 0;
                right: 0;
                border-bottom: 2px solid theme(secondary);
                border-right: 2px solid theme(secondary);
                border-bottom-right-radius: layout(border-radius);
                animation: loading-bottom-right-anim $spinner-speed infinite;

                @keyframes loading-bottom-right-anim {
                    0% {
                        bottom: 0;
                        right: 0;
                    }

                    50% {
                        bottom: 25%;
                        right: 25%;
                    }

                    100% {
                        bottom: 0;
                        right: 0;
                    }
                }
            }

            &.has-text {
                animation: none;

                &::before,
                &::after {
                    animation: none;
                }
            }
        }
    }
</style>
