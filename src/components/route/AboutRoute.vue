<template>
    <div class="page-content">
        <h1>About</h1>
        <p>Hey, my name's Will! I'm a software developer with an interest in web, mobile and software development.</p>
        <p>I have been programming for over 10 years and over this time have utilised a wide range of languages, frameworks and techniques.</p>
        <p>If you have any interest in what I have been creating, feel free to have a look at my GitHub or projects page!</p>
        <div class="note flex-row text-centered">
            <div class="link-container">
                <ExternalLink href="https://github.com/wjbaker101">
                    <GitHubIcon />
                </ExternalLink>
                <h2>GitHub</h2>
            </div>
            <div class="link-container">
                <ExternalLink href="https://linkedin.com/in/wjbaker101">
                    <LinkedinIcon />
                </ExternalLink>
                <h2>Linkedin</h2>
            </div>
            <div class="link-container">
                <router-link to="/projects">
                    <ProjectsIcon />
                </router-link>
                <h2>Projects</h2>
            </div>
        </div>
        <p>I am a 3rd year Computer Science student at Loughborough University, currently doing a placement year at Yell.</p>
        <p>Additional information about my experiences can be found on my Linkedin page!</p>
        <!-- <h2 class="text-centered">Important Events Timeline</h2>
        <div class="timeline-container">
            <article>
                <h3>
                    <span>October 2016</span>
                    <div class="node"></div>
                </h3>
                <p>Started at Loughborough University.</p>
                <p>The beginning of my Computer Science BSci course.</p>
            </article>
            <article>
                <h3>
                    <span>August 2017</span>
                    <div class="node"></div>
                </h3>
                <p>Started at Bradleys as Temporary IT Project Assistant.</p>
            </article>
            <article>
                <h3>
                    <span>July 2018</span>
                    <div class="node"></div>
                </h3>
                <p>Started at Yell as Undergraduate Software Developer.</p>
                <p>For my University placement year.</p>
            </article>
            <article>
                <h3>
                    <span>Today</span>
                    <div class="node"></div>
                </h3>
            </article>
        </div> -->
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';

    import ExternalLink from '@/components/ExternalLink.vue';
    import GitHubIcon from '@/assets/icons/github.svg';
    import LinkedinIcon from '@/assets/icons/linkedin.svg';
    import ProjectsIcon from '@/assets/icons/open-folder.svg';

    export default {
        name: 'HomeRoute',

        mixins: [ BaseRouteMixin() ],

        components: {
            ExternalLink,
            GitHubIcon,
            LinkedinIcon,
            ProjectsIcon,
        },
    }
</script>

<style lang="scss">
    .link-container {
        padding-top: 1rem;

        .icon {
            $size: 5rem;

            width: $size;
            height: $size;
            color: theme(tertiary);
            transition: color 0.2s;

            &:hover {
                color: theme(tertiary-dark);
            }
        }
    }

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
                border-right: 2px solid theme(primary);
                text-align: right;

                .node {
                    right: calc(-1rem - 0.375em - 1px);
                }
            }

            &:nth-child(even) {
                margin-right: 2px;
                margin-left: auto;
                padding-left: 1rem;
                border-left: 2px solid theme(primary);

                .node {
                    left: calc(-1rem - 0.375em);
                }
            }
        }
    }
</style>