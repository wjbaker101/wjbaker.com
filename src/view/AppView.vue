<template>
    <div class="body-content">
        <AsideNavigationComponent :page="page" />
        <main>
            <router-view @navpageinit="onNavPageinit" />
        </main>
    </div>
</template>

<script>
    import AsideNavigationComponent from '@/components/layout/AsideNavigationComponent.vue';

    export default {
        name: 'App',

        data() {
            return {
                page: '',
            }
        },

        components: {
            AsideNavigationComponent,
        },

        methods: {
            onNavPageinit(page) {
                this.page = page;
            },
        },
    }
</script>

<style lang="scss">
    @import '@/external/vue-wysiwyg/styling.scss';

    @import '@/style/partial/_all.scss';
    @import '@/style/partial/_body.scss';
    @import '@/style/partial/_code-block.scss';
    @import '@/style/partial/_flex.scss';
    @import '@/style/partial/_headings.scss';
    @import '@/style/partial/_icons.scss';
    @import '@/style/partial/_img.scss';
    @import '@/style/partial/_inputs.scss';
    @import '@/style/partial/_links.scss';
    @import '@/style/partial/_text.scss';

    main {
        min-height: 100%;
        position: relative;
        margin-left: layout(aside-nav-width);
        padding: 6rem 2rem 2rem 2rem;

        @media screen and (max-width: layout(breakpoint-large)) {
            min-height: calc(100% - 175px);
            padding: 2rem 0;
            margin-left: 0;
        }
    }

    main h1 {
        position: relative;
        font-size: 2.5rem;
        padding: 6rem;
        margin: 0 4rem 5rem 0;
        transform-style: preserve-3d;
        background-color: theme(primary);
        border: 1px solid theme(primary-dark);
        border-radius: layout(border-radius);
        color: theme(white);

        .page-heading {
            display: inline-block;
            animation: page-heading-anim animation(duration-mid);
        }

        @media screen and (max-width: layout(breakpoint-large)) {
            font-size: 1.5rem;
            padding: 3rem 2rem;
            margin: 0 2rem 4rem 0;
        }

        &::after {
            content: '';
            position: absolute;
            top: 4rem;
            left: 4rem;
            bottom: -4rem;
            right: -4rem;
            transform: translateZ(-1px);
            background-color: theme(grey);
            border: 1px solid theme(grey-dark);
            border-radius: layout(border-radius);

            @media screen and (max-width: layout(breakpoint-large)) {
                right: -2rem;
                left: 2rem;
                top: 2rem;
                bottom: -2rem;
            }
        }
    }

    @keyframes page-heading-anim {
        from {
            transform: translateX(-2rem);
            opacity: 0.1;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
</style>
