<template>
    <div class="top-0 bottom-0 max-sm:static fixed grid grid-rows-[1fr_auto] max-sm:grid-rows-1 bg-primary bg-radial shadow-lg shadow-slate-700/40 md:hover:shadow-slate-700/80 m-4 p-4 rounded-lg sm:w-[min(28rem,33%)] text-slate-200">
        <div class="items-center place-self-center max-sm:place-self-auto gap-8 max-sm:gap-4 grid max-sm:grid-cols-[auto_1fr] text-center">
            <div class="bg-amber-50 shadow-inner shadow-slate-700/40 mx-auto p-4 max-sm:p-2 rounded-full w-fit">
                <img width="40" height="40" src="~/assets/logo.svg" class="max-sm:size-6">
            </div>
            <div class="justify-self-end gap-2 grid max-sm:grid-flow-col w-fit text-sm uppercase">
                <NuxtLink
                    v-for="link in links"
                    :to="link.path"
                    :class="{
                        'outline-secondary-dark': route.path === link.path,
                        'outline-transparent': route.path !== link.path,
                    }"
                    class="hover:bg-primary-light hover:shadow-sm p-2 rounded-lg outline tracking-wide"
                >
                    {{ link.text }}
                </NuxtLink>
            </div>
        </div>
        <div class="max-sm:hidden relative gap-1 grid grid-cols-2 text-center">
            <div class="top-0 right-0 left-0 absolute bg-gradient-to-r from-primary-light to-secondary-dark h-[1px]"></div>
            <NuxtLink target="_blank" to="https://github.com/wjbaker101" class="active:scale-98">
                <div class="place-items-center grid hover:bg-primary-light hover:shadow-sm mt-4 p-4 rounded-lg">
                    <GitHubIcon class="size-4" />
                </div>
            </NuxtLink>
            <NuxtLink target="_blank" to="https://www.linkedin.com/in/wjbaker101" class="active:scale-98">
                <div class="place-items-center grid hover:bg-primary-light hover:shadow-sm mt-4 p-4 rounded-lg">
                    <img src="~/assets/linkedin-logo.png" class="size-4">
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { GitHubIcon } from 'vue3-simple-icons';

const route = useRoute();

interface ILink {
    readonly text: string;
    readonly path: string;
}

const links: Array<ILink> = [
    {
        text: 'About',
        path: '/',
    },
    {
        text: 'Projects',
        path: '/projects',
    },
];
</script>