<template>
    <aside class="aside-component">
        <div class="content">
            <h1>
                <router-link to="/">Will Baker</router-link>
            </h1>
            <ul>
                <li
                    :key="`link-${index}`"
                    v-for="(link, index) in links.concat(userLink)"
                >
                    <router-link
                        :to="link.url"
                        class="link"
                        :class="{
                            'is-selected': currentLocation.startsWith(link.url),
                        }"
                    >
                        {{ link.title }}
                    </router-link>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

    import { UserModel } from '@common/model/UserModel';

    interface Link {
        title: string,
        url: string,
    }

    @Component({
        components: {},
    })
    export default class AsideComponent extends Vue {

        private readonly links: Link[] = [
            this.link('About', '/about'),
            this.link('Projects', '/projects'),
            this.link('Blog', '/blog'),
        ];

        private currentLocation: string = '';

        get user(): UserModel {
            return this.$store.state.user;
        }

        get userLink(): Link {
            if (this.user === null) {
                return this.link('Login', '/user/login');
            }

            return this.link('Your User', '/user');
        }

        private link(title: string, url: string): Link {
            return {
                title,
                url,
            }
        }

        @Watch('$route.path', { deep: true })
        onRouterLocationChanged(location: string, oldLocation: string): void {
            this.currentLocation = location;
        }
    }
</script>

<style lang="scss">
    .aside-component {
        width: 25%;
        min-width: 300px;
        max-width: 430px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex: 0 0 auto;
        border-right: 1px solid theme(primary-dark);
        border-top-right-radius: border-radius();
        border-bottom-right-radius: border-radius();
        background-color: theme(primary);
        color: theme(white);

        .content {
            display: table;
            margin: auto;
            text-align: center;
        }

        h1 {
            font-size: 2rem;
        }

        ul {
            padding-left: 0;
            list-style: none;

            li + li {
                margin-top: 0.5rem;
            }
        }

        .link {
            display: inline-block;
            position: relative;

            &::before,
            &::after {
                content: '';
                width: 0.5rem;
                height: 0.5rem;
                display: table;
                position: absolute;
                opacity: 0;
                transition: border-color animation(duration-short), opacity animation(duration-short), transform animation(duration-short);
            }

            &::before {
                top: -0.125rem;
                left: -0.75rem;
                border-top: 1px solid theme(White);
                border-left: 1px solid theme(white);
                border-top-left-radius: border-radius();
                transform: translate(-0.5rem, -0.5rem);
                box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.2);
            }

            &::after {
                bottom: -0.125rem;
                right: -0.75rem;
                border-bottom: 1px solid theme(white);
                border-right: 1px solid theme(white);
                border-bottom-right-radius: border-radius();
                transform: translate(0.5rem, 0.5rem);
                box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            }

            &:hover::before,
            &:hover::after,
            &.is-selected::before,
            &.is-selected::after {
                opacity: 1;
                border-color: theme(secondary);
                transform: translate(0, 0);
            }

            &:not(.is-selected):hover::before,
            &:not(.is-selected):hover::after {
                border-color: theme(white);
            }
        }

        a {
            color: inherit;
            font-weight: inherit;
            text-decoration: none;
        }
    }
</style>
