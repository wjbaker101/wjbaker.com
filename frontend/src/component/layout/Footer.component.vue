<template>
    <footer class="footer-component">
        <p class="social-links">
            <LinkComponent href="https://github.com/wjbaker101">
                <GitHubIcon />
                <span>GitHub</span>
            </LinkComponent>
            <LinkComponent href="https://linkedin.com/in/wjbaker101">
                <LinkedInIcon />
                <span>LinkedIn</span>
            </LinkComponent>
            <router-link to="/about/cv">
                <FileIcon />
                <span>My CV</span>
            </router-link>
        </p>
        <p>
            Copyright &copy; William Baker 2015&ndash;{{ new Date().getFullYear() }},
            <br>
            All rights reserved.
        </p>
        <p>Icons provided by <LinkComponent href="https://fontawesome.com/license">Font Awesome</LinkComponent>.</p>
    </footer>
</template>

<script setup lang="ts">
import LinkComponent from '@/component/Link.component.vue';
import FileIcon from '@/component/icon/FileIcon.component.vue';
import GitHubIcon from '@/component/icon/GitHubIcon.component.vue';
import LinkedInIcon from '@/component/icon/LinkedInIcon.component.vue';
</script>

<style lang="scss">
.footer-component {
    padding: 0 2rem;
    color: #888;

    .social-links {

        @media screen and (min-width: breakpoint()) {
            display: none;
        }

        svg {
            margin-right: 0.25rem;
        }

        & a + a {
            margin-left: 1rem;
        }
    }
}
</style>