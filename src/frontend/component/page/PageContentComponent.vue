<template>
    <div class="page-content-component">
        <div class="content">
            <slot />
        </div>
        <FooterComponent />
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import FooterComponent from '@frontend/component/page/FooterComponent.vue';

    import FileIcon from '@frontend/assets/icon/file.svg';
    import GithubIcon from '@frontend/assets/icon/github.svg';
    import LinkedInIcon from '@frontend/assets/icon/linkedin.svg';

    @Component({
        components: {
            FooterComponent,
            FileIcon,
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
    }
</style>
