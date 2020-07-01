<template>
    <div class="page-content-component">
        <div class="content">
            <slot />
        </div>
        <footer>
            <p class="social-link">
                <LinkComponent href="https://github.com/wjbaker101">
                    <GithubIcon />
                    <span>GitHub</span>
                </LinkComponent>
                <LinkComponent href="https://linkedin.com/in/wjbaker101">
                    <LinkedInIcon />
                    <span>LinkedIn</span>
                </LinkComponent>
            </p>
            <p>
                Copyright © William Baker 2015&ndash;{{ year }},
                <br>
                All rights reserved.
            </p>
            <p>Icons provided by <LinkComponent href="https://fontawesome.com/license">Font Awesome</LinkComponent>.</p>
        </footer>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import GithubIcon from '@frontend/assets/icon/github.svg';
    import LinkedInIcon from '@frontend/assets/icon/linkedin.svg';

    @Component({
        components: {
            GithubIcon,
            LinkedInIcon,
        },
    })
    export default class PageContentComponent extends Vue {

        private readonly year: number = new Date().getFullYear();
    }
</script>

<style lang="scss">
    .page-content-component {
        max-width: 720px;
        margin: 8rem auto 1rem auto;

        @media screen and (max-width: breakpoint()) {
            margin-top: 0;
        }

        .content {
            padding: 2rem;
            background-color: theme(white);
            border: 1px solid theme(grey);
            border-radius: border-radius();

            h2, h3, h4, h5, h6 {
                text-shadow: none;
                color: theme(black);
            }

            p, h2, h3, h4, h5, h6 {
                max-width: 32rem;
                margin-right: auto;
                margin-left: auto;
            }
        }

        footer {
            padding: 0 2rem;
            color: #888;
        }

        & > :first-child {
            margin-top: 0;
        }

        & > :last-child {
            margin-bottom: 0;
        }

        a {
            color: theme(primary);
            font-weight: bold;
            text-decoration: underline;

            &:hover {
                text-decoration: none;
            }
        }

        .social-link {
            svg {
                margin-right: 0.25rem;
            }

            & a + a {
                margin-left: 1rem;
            }
        }
    }
</style>
