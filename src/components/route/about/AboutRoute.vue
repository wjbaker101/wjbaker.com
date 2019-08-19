<template>
    <div class="page-content">
        <h1>
            <span class="page-heading">About</span>
        </h1>
        <div class="flex-row">
            <div class="text-centered">
                <img width="240" height="240" src="@/assets/images/me_09-08-2019.jpg" alt="That's me! William Baker." class="photo-image">
            </div>
            <div class="flex-row">
                <div style="margin: auto">
                    <p>Hey, I'm Will!</p>
                    <p>I'm a software developer originally from Kent, with an interest in web, mobile and software development, tennis, cooking and baking!</p>
                </div>
            </div>
        </div>
        <p>This website will mainly act as a way of showcasing what projects I have worked on so you can view and learn more about them.</p>
        <p>I have been programming for over 10 years and over this time have utilised a wide range of languages, frameworks and techniques. Another aim for this website is to hopefully be able to see the development of my skills in the projects I take on.</p>
        <p>If you have any interest in what I have been doing, feel free to have a look at my GitHub, Linkedin or projects page! Links found here:</p>
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
        <h2>Present Day</h2>
        <p>I am a final year Computer Science student at Loughborough University, including a placement year (where I was fortunate enough to work at Yell!)</p>
        <p>A lot of my career activity is viewable on Linkedin, however if you would like to see a copy of my CV <router-link to="/about/cv">click here</router-link>. This will give you even more of an understanding of what skills I will have.</p>
        <h2>In the Past</h2>
        <p>If you've had enough of looking at text but want to know more about when certain events happened, <router-link to="/about/timeline">view my events timeline</router-link>!</p>
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

    .photo-image {
        border-radius: 50%;
        background-color: theme(grey);
        border: 2px solid theme(grey-dark);
    }
</style>