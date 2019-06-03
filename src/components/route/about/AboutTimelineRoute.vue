<template>
    <div class="page-content">
        <h1>Timeline</h1>
        <p>
            <router-link to="/about"><BackIcon /> Return to About page</router-link>
        </p>
        <div class="timeline-container">
            <article>
                <h3>
                    <span>October 2016</span>
                    <div class="node"></div>
                </h3>
                <p>The beginning of my Computer Science BSci course at Loughborough University</p>
            </article>
            <article>
                <h3>
                    <span>August 2017</span>
                    <div class="node"></div>
                </h3>
                <p>Started at Bradleys as Temporary IT Project Assistant</p>
            </article>
            <article>
                <h3>
                    <span>July 2018</span>
                    <div class="node"></div>
                </h3>
                <p>Started at Yell as Undergraduate Software Developer</p>
                <p>For my University placement year.</p>
            </article>
            <article>
                <h3>
                    <span>Today</span>
                    <div class="node"></div>
                </h3>
            </article>
        </div>
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';

    import BackIcon from '@/assets/icons/arrow-left.svg';

    export default {
        name: 'AboutTimelineRoute',

        mixins: [ BaseRouteMixin() ],

        components: {
            BackIcon,
        },
    }
</script>

<style lang="scss">
    .timeline-container {
        article {
            width: 50%;
            padding: 1rem 0;

            h3 {
                position: relative;
            }

            .node {
                width: 0.75em;
                height: 0.75em;
                position: absolute;
                top: 0.25em;
                border: 1px solid theme(primary);
                border-radius: 50%;
                background-color: theme(secondary);
            }

            :first-child {
                margin-top: 0;
            }

            :last-child {
                margin-bottom: 0;
            }

            &:nth-child(odd) {
                padding-right: 1rem;
                border-right: 1px solid theme(primary);
                text-align: right;

                .node {
                    right: calc(-1rem - 0.375em - 1px);
                }
            }

            &:nth-child(even) {
                margin-right: 1px;
                margin-left: auto;
                padding-left: 1rem;
                border-left: 1px solid theme(primary);

                .node {
                    left: calc(-1rem - 0.375em);
                }
            }
        }
    }
</style>