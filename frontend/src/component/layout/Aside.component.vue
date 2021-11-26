<template>
    <aside class="aside-component flex flex-vertical flex-auto">
        <div class="flex flex-1">
            <div class="content flex-vh-center">
                <h1>
                    <router-link to="/">
                        <img src="@/assets/image/me-aside.jpg" alt="A photo of me!">
                        <span>Will Baker</span>
                    </router-link>
                </h1>
                <ul>
                    <li
                        :key="`link-${index}`"
                        v-for="(link, index) in links"
                    >
                        <router-link
                            :to="link.url"
                            class="link"
                            :class="{
                                'is-selected': currentLocation === link.url,
                            }"
                        >
                            {{ link.title }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex flex-auto social-container text-center">
            <LinkComponent href="https://github.com/wjbaker101" title="GitHub">
                <GitHubIcon />
            </LinkComponent>
            <LinkComponent href="https://linkedin.com/in/wjbaker101" title="LinkedIn">
                <LinkedInIcon />
            </LinkComponent>
            <router-link to="/about/cv">CV</router-link>
        </div>
    </aside>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import LinkComponent from '@/component/Link.component.vue';
import GitHubIcon from '@/component/icon/GitHubIcon.component.vue';
import LinkedInIcon from '@/component/icon/LinkedInIcon.component.vue';

import { userService } from '@/service/User.service';

interface AsideLink {
    title: string;
    url: string;
}

export default defineComponent({
    name: 'AsideComponent',

    components: {
        LinkComponent,
        GitHubIcon,
        LinkedInIcon,
    },

    setup() {
        const route = useRoute();

        const currentLocation = computed<string>(() => route?.path);

        const authDetails = userService.getAuthDetails();

        const links = computed<Array<AsideLink>>(() => [
            {
                title: 'About',
                url: '/about',
            },
            {
                title: 'Projects',
                url: '/projects',
            },
            {
                title: 'Blog',
                url: '/blog',
            },
            {
                title: authDetails.value?.user ? 'Your User' : 'Login',
                url: authDetails.value?.user ? '/user' : '/user/login',
            },
        ]);

        return {
            currentLocation,
            links,
        }
    },
});
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
        border-right: 1px solid theme(primary-dark);
        border-top-right-radius: border-radius();
        border-bottom-right-radius: border-radius();
        background-color: theme(primary);
        color: theme(white);

        @media screen and (max-width: breakpoint()) {
            width: 100%;
            max-width: 100%;
            position: static;
            border-right: 0;
            border-bottom: 1px solid theme(primary-dark);
            border-top-right-radius: 0;
            border-bottom-left-radius: border-radius();
        }

        .content {
            display: table;
            text-align: center;

            @media screen and (max-width: breakpoint()) {
                width: 100%;
            }
        }

        h1 {
            font-size: 2rem;

            img {
                border-radius: 50%;
                margin-bottom: 0.25rem;
                border: 1px solid theme(tertiary);
                vertical-align: middle;
                box-shadow: 0 0 0 2px transparent;
                transition: box-shadow animation(duration-mid);

                &:hover {
                    box-shadow: 0 0 0 2px theme(tertiary);
                }

                @media screen and (max-width: breakpoint()) {
                    $size: 55px;

                    width: $size;
                    height: $size;
                    margin-right: 1rem;
                    margin-bottom: 0;
                }
            }

            span {
                display: block;

                @media screen and (max-width: breakpoint()) {
                    display: inline;
                }
            }
        }

        ul {
            padding-left: 0;
            list-style: none;

            li {
                & + li {
                    margin-top: 0.5rem;
                }

                @media screen and (max-width: breakpoint()) {
                    display: inline-block;

                    & + li {
                        margin-top: 0;
                        margin-left: 2rem;
                    }
                }
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

        .social-container {
            background-color: theme(primary-dark);
            border-top: 1px solid theme(primary-light);

            @media screen and (max-width: breakpoint()) {
                display: none;
            }

            a {
                padding: 1rem;
                flex: 1;
                line-height: 1em;
                color: theme(tertiary);
                font-weight: bold;
                transition: background-color animation(duration-short);

                &:hover {
                    background-color: theme(primary);
                }
            }
        }
    }
</style>