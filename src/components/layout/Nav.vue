<template>
    <nav>
        <div class="nav-content">
            <h1>Will Baker</h1>
            <ul class="nav-links">
                <router-link
                    :to="link.location"
                     v-bind:key="index"
                     v-for="(link, index) in links"
                     v-bind:class="{ selected: link.visible }">

                    <li>{{ link.name }}</li>
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Nav',

        props: [ 'page' ],

        data() {
            return {
                links: {
                    'about': {
                        name: 'About',
                        location: '/',
                        visible: false,
                    },
                    'projects': {
                        name: 'Projects',
                        location: '/projects',
                        visible: false,
                    },
                    'blog': {
                        name: 'Blog',
                        location: '/blog',
                        visible: false,
                    },
                    'login': {
                        name: 'Login',
                        location: '/login',
                        visible: false,
                    },
                },
            }
        },

        watch: {
            page(to, from) {
                this.setSelectedPage(to);
            },
        },

        methods: {
            setSelectedPage(page) {
                for (let l in this.links) {
                    this.links[l].visible = false;
                }

                if (!(page in this.links)) {
                    return;
                }

                this.links[page].visible = true;
            },
        },
    }
</script>

<style lang="scss">
    nav {
        width: 25%;
        flex: 0 0 1;
        display: flex;
        padding: 2rem;
        color: theme(white);
        background-color: theme(primary);
        border-right: var(--border-thickness) solid theme(primary-dark);
        border-top-right-radius: layout(border-radius);
        border-bottom-right-radius: layout(border-radius);

        h1 {
            color: inherit;
            text-align: center;
        }

        @media screen and (max-width: 1024px) {
            width: 100%;
            padding: 0 2rem;
            border-top-right-radius: 0;
            border-right: 0;
            border-bottom: var(--border-thickness) solid theme(primary-dark);
            border-bottom-left-radius: layout(border-radius);
            border-bottom-right-radius: layout(border-radius);
        }
    }

    .nav-content {
        width: 100%;
        overflow: hidden;
        display: block;
        flex: 1;
        margin: auto;
    }

    .nav-links {
        list-style: none;
        padding-left: 0;

        @media screen and (max-width: 1024px) {
            width: 100%;
            position: relative;
            padding: 0.25rem;
            text-align: center;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            border: 1px solid theme(primary-dark);
            border-radius: layout(border-radius);
        }

        & > * {
            display: table;
            margin: 1rem auto;
            line-height: 1em;
            padding: 0.5rem 1rem;
            position: relative;
            color: theme(white);
            text-decoration: none;
            cursor: pointer;

            &:hover {
                color: theme(white);
                text-decoration: none;
            }

            &::before,
            &::after {
                content: '';
                width: 0.5rem;
                height: 0.5rem;
                display: table;
                position: absolute;
                opacity: 0;
                transition: border-color 0.2s, opacity 0.2s, transform 0.2s;
            }

            &::before {
                top: 0;
                left: 0;
                border-top: 1px solid theme(White);
                border-left: 1px solid theme(white);
                border-top-left-radius: layout(border-radius);
                transform: translate(-0.5rem, -0.5rem);
            }

            &::after {
                bottom: 0;
                right: 0;
                border-bottom: 1px solid theme(white);
                border-right: 1px solid theme(white);
                border-bottom-right-radius: layout(border-radius);
                transform: translate(0.5rem, 0.5rem);
            }

            &:hover::before,
            &:hover::after,
            &.selected::before,
            &.selected::after {
                opacity: 1;
                border-color: theme(secondary);
                transform: translate(0, 0);
            }

            &:not(.selected):hover::before,
            &:not(.selected):hover::after {
                border-color: theme(white);
            }

            @media screen and (max-width: 1024px) {
                display: inline-block;
                margin: 0;
            }
        }
    }
</style>