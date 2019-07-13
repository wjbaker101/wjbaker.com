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
    @import '@/style/vue-wysiwyg.scss';

    :root {
        --primary: #176bc0;
        --secondary: #59c3c3;
        --tertiary: #52489c;
        --white: #fff;
        --grey: #ebebeb;

        --content-width: 720px;
        --content-padding: 1rem;

        --border-thickness: 1px;
    }

    html,
    body,
    .body-content {
        height: 100%;
    }

    body {
        margin: 0;
        font-family: 'Heebo', sans-serif;
        font-size: 18px;
        font-variant-ligatures: none;
        -webkit-font-variant-ligatures: none;
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        font-smoothing: antialiased;
        -webkit-font-smoothing: antialiased;
        line-height: 1.8em;
        letter-spacing: 1px;
        background-color: theme(grey);
        color: theme(black);
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    h1, h2, h3, h4, h5, h6 {
        letter-spacing: 1.5px;
        color: theme(black-dark);
        line-height: 1.25em;
    }

    a {
        color: theme(primary);
        font-weight: bold;
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
            color: theme(primary-dark);
            text-decoration: underline;
        }
    }

    .link-no-style {
        color: inherit;
        text-decoration: none;
        font-weight: normal;

        &:hover {
            color: inherit;
            text-decoration: none;
            font-weight: normal;
        }
    }

    main {
        min-height: 100%;
        position: relative;
        margin-left: layout(aside-nav-width);
        padding: 6rem 2rem 2rem 2rem;

        @media screen and (max-width: 1024px) {
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
            animation: page-heading-anim 0.5s;
        }

        @media screen and (max-width: 1024px) {
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

            @media screen and (max-width: 1024px) {
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

    .code-block,
    .note {
        margin: 1rem -2rem;
        padding: 0.5rem 2rem;
        border-top: 1px solid theme(grey-dark);
        border-bottom: 1px solid theme(grey-dark);
        border-left: 2px solid theme(primary-dark);
        background-color: theme(primary-light);
        color: theme(black-dark);
    }

    .code-block {
        overflow-x: auto;
    }

    .flex-row {
        display: flex;

        & > * {
            flex: 1;
        }
    }

    .text-centered { text-align: center; }

    .icon {
        width: 1rem;
        height: 1rem;
        vertical-align: middle;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    input[type=text],
    input[type=password],
    textarea {
        max-width: 100%;
        padding: 0 0.5rem;
        background-color: theme(white);
        border: 1px solid theme(primary);
        border-radius: layout(border-radius);
        font: inherit;

        &:focus {
            border-color: theme(tertiary);
        }
    }

    textarea {
        resize: vertical;
        min-height: 5rem;
    }

    .icon-animated {
        vertical-align: middle;
    }
</style>
