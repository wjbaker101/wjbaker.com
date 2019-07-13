<template>
    <aside class="navigation">
        <nav>
            <router-link :to="links.landing.location">
                <h1>{{ links.landing.name }}</h1>
            </router-link>
            <ul class="nav-links">
                <router-link
                    :to="link.location"
                     v-bind:key="index"
                     v-for="(link, name, index) in links"
                     v-if="name !== 'landing'"
                     v-bind:class="{ selected: link.visible }">

                    <li>{{ link.name }}</li>
                </router-link>
            </ul>
        </nav>
    </aside>

    <!-- <nav>
        <div class="nav-content">
            <router-link :to="links.landing.location">
                <h1>{{ links.landing.name }}</h1>
            </router-link>
            <ul class="nav-links">
                <router-link
                    :to="link.location"
                     v-bind:key="index"
                     v-for="(link, name, index) in links"
                     v-if="name !== 'landing'"
                     v-bind:class="{ selected: link.visible }">

                    <li>{{ link.name }}</li>
                </router-link>
            </ul>
        </div>
    </nav> -->
</template>

<script>
    export default {
        name: 'AsideNavigationComponent',

        props: [ 'page' ],

        data() {
            return {
                links: {
                    'landing': {
                        name: 'Will Baker',
                        location: '/',
                        visible: false,
                    },
                    'about': {
                        name: 'About',
                        location: '/about',
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
    aside.navigation {
        width: layout(aside-nav-width);
        height: 100%;
        flex: 0 0 1;
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        padding: 2rem;
        color: theme(white);
        background-color: theme(primary);
        border-right: var(--border-thickness) solid theme(primary-dark);
        border-top-right-radius: layout(border-radius);
        border-bottom-right-radius: layout(border-radius);
        text-align: center;

        a {
            color: theme(white);
            text-decoration: none;

            &:hover {
                color: theme(white);
                text-decoration: none;
            }
        }

        h1 {
            color: inherit;
        }

        @media screen and (max-width: 1024px) {
            width: 100%;
            height: auto;
            position: static;
            padding: 0 2rem;
            border-top-right-radius: 0;
            border-right: 0;
            border-bottom: var(--border-thickness) solid theme(primary-dark);
            border-bottom-left-radius: layout(border-radius);
            border-bottom-right-radius: layout(border-radius);
        }

        nav {
            width: 100%;
            overflow: hidden;
            display: block;
            flex: 1;
            margin: auto;
        }
    }

    .nav-links {
        list-style: none;
        padding-left: 0;

        @media screen and (max-width: 1024px) {
            max-width: 100%;
            display: inline-block;
            position: relative;
            padding: 0.25rem;
            text-align: center;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
        }

        & > * {
            display: table;
            margin: 1rem auto;
            line-height: 1em;
            padding: 0.5rem 1rem;
            position: relative;
            cursor: pointer;

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