<template>
    <footer>
        <small>
            <p>
                <span class="social-links-container">
                    <router-link to="/about" title="About">
                        <UserIcon class="social-icon" />
                    </router-link>
                    <router-link to="/projects" title="Projects">
                        <ProjectsIcon class="social-icon" />
                    </router-link>
                    <router-link to="/blog" title="Blog">
                        <BlogIcon class="social-icon" />
                    </router-link>
                    <span>|</span>
                    <ExternalLink href="https://github.com/wjbaker101" title="GitHub">
                        <GitHubIcon class="social-icon" />
                    </ExternalLink>
                    <ExternalLink href="https://linkedin.com/in/wjbaker101" title="Linkedin">
                        <LinkedinIcon class="social-icon" />
                    </ExternalLink>
                    <ExternalLink href="https://instagram.com/wjbaker101" title="Instagram">
                        <InstagramIcon class="social-icon" />
                    </ExternalLink>
                </span>
                <br>
                Copyright &copy; William Baker 2015 &mdash; {{ year }},<br>
                All rights reserved.
            </p>
            <p>
                Icons provided by
                <ExternalLink href="https://fontawesome.com/license">Font Awesome</ExternalLink>.
            </p>
        </small>
    </footer>
</template>

<script>
    import GitHubIcon from '@/assets/icons/github-logo.svg';
    import LinkedinIcon from '@/assets/icons/linkedin.svg';
    import InstagramIcon from '@/assets/icons/instagram.svg';
    import ProjectsIcon from '@/assets/icons/open-folder.svg';
    import BlogIcon from '@/assets/icons/book.svg';
    import UserIcon from '@/assets/icons/user.svg';

    import ExternalLink from '@/components/ExternalLink.vue';

    export default {
        name: 'FooterComponent',

        components: {
            GitHubIcon,
            LinkedinIcon,
            InstagramIcon,
            ProjectsIcon,
            BlogIcon,
            UserIcon,
            ExternalLink,
        },

        data() {
            return {
                year: new Date().getFullYear(),
            }
        },
    }
</script>

<style lang="scss">
    footer {
        padding-bottom: 1rem;
        margin: auto;
        max-width: layout(max-width);

        @media screen and (max-width: 1024px) {
            padding: 0 2rem;
        }


        .social-links-container {
            & > * + * {
                margin-left: 0.5rem;
            }

            .social-icon {
                width: 1em;
                height: 1em;
                vertical-align: middle;
            }
        }
    }
</style>
