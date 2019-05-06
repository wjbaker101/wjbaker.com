<template>
    <div class="page-content">
        <h1>About</h1>
        <p>Hey, my name's Will! I'm a software developer with an interest in web, mobile and software development.</p>
        <p>I have been programming for over 10 years and over this time have utilised a wide range of languages, frameworks and techniques.</p>
        <p>If you have any interest in what I have been creating, feel free to have a look at my GitHub page!</p>
        <div class="code-block flex-row text-centered">
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
        </div>
        <p>I am a 3rd year Computer Science student at Loughborough University, currently doing a placement year at Yell.</p>
        <p>Additional information about my experiences can be found on my Linkedin page!</p>
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';

    import ExternalLink from '@/components/ExternalLink.vue';
    import GitHubIcon from '@/assets/icons/github.svg';
    import LinkedinIcon from '@/assets/icons/linkedin.svg';

    export default {
        name: 'HomeRoute',

        mixins: [ BaseRouteMixin ],

        components: {
            ExternalLink,
            GitHubIcon,
            LinkedinIcon,
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
</style>