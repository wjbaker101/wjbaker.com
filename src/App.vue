<template>
    <div class="page-container">
        <Nav :page="page" />
        <main>
            <router-view @navpageinit="onNavPageinit"></router-view>
            <footer>
                <small>Copyright &copy; William Baker 2015 &mdash; {{ year }},<br>All rights reserved.</small>
            </footer>
        </main>
    </div>
</template>

<script>
    import Nav from '@/components/layout/Nav.vue';
    
    export default {
        name: 'App',

        data() {
            return {
                page: '',
                year: new Date().getFullYear(),
            }
        },

        components: {
            Nav,
        },

        methods: {
            onNavPageinit(page) {
                this.page = page;
            },
        },
    }
</script>

<style lang="scss">
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
    .page-container {
        height: 100%;
    }

    body {
        margin: 0;
        font-family: 'Heebo', sans-serif;
        font-size: 18px;
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

    .page-container {
        display: flex;
    }

    .page-container > * {
        height: 100%;
    }
    
    main {
        flex: 1;
        padding: 5rem 2rem 2rem 2rem;
        padding: 12vh 2rem 2rem 2rem;
        overflow: auto;
    }

    footer {
        padding-bottom: 1rem;
        margin: auto;
        max-width: layout(max-width);
    }

    .page-content {
        position: relative;
        max-width: layout(max-width);
        padding: 2rem;
        margin: auto auto 1rem auto;
        background-color: theme(grey-light);
        border: 1px solid theme(grey-dark);
        border-radius: layout(border-radius);
    }

    .page-content h1 {
        position: relative;
        font-size: 2.5rem;
        padding: 6rem;
        margin: 0 4rem 6rem 0;
        transform-style: preserve-3d;
        background-color: theme(primary);
        border: 1px solid theme(primary-dark);
        border-radius: layout(border-radius);
        color: theme(white);

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
        }
    }

    .code-block {
        margin: 1rem -2rem;
        padding: 0.5rem 2rem;
        border-top: 1px solid theme(grey-dark);
        border-bottom: 1px solid theme(grey-dark);
        border-left: 2px solid theme(primary-dark);
        background-color: theme(primary-light);
        color: theme(black-dark);
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
</style>
