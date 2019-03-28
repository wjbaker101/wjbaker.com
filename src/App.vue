<template>
    <div class="page-container">
        <Nav :page="page" />
        <main>
            <router-view @navpageinit="onNavPageinit"></router-view>
        </main>
    </div>
</template>

<script>
    import Nav from '@/components/layout/Nav.vue';
    
    export default {
        name: 'App',

        data() {
            return {
                page: null,
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
        padding: 20vh 2rem 2rem 2rem;
        overflow: auto;
    }

    .page-content {
        max-width: layout(max-width);
        padding: 2rem;
        margin: auto auto 1rem auto;
        background-color: theme(grey-light);
        border: 1px solid theme(grey-dark);
        border-radius: layout(border-radius);
    }
</style>
