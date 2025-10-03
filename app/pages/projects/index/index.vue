<template>
    <HeadingComponent>Projects</HeadingComponent>
    <div class="gap-16 grid grid-cols-2 max-md:grid-cols-1">

        <ProjectComponent :project="projects[0]!" @click="select(0)" :is-selected="selectedProject === 0" class="order-1" />
        <ProjectDescriptionComponent :is-selected="selectedProject === 0" :project="projects[0]!" class="order-4 max-md:order-2">
            <p class="mb-4">A Minecraft mod that allows you to change the style of your crosshair and adds dynamic movement when doing certain actions.</p>
            <p class="mb-4">It has been in development since 2016 with the first Minecraft version being 1.7.10.</p>
            <p class="mb-4">On 12th December 2023 the mod reached 1M downloads.</p>
            <p class="mb-4">On 10th September 2025 the mod reached 2M downloads.</p>
            <h3 class="mb-4 text-2xl">Tech Stack</h3>
            <p class="mb-4">Java, Minecraft, Fabric, Forge, NeoForge</p>
            <p>
                <LinkComponent to="https://customcrosshairmod.com" target="_blank">
                    <ExternalLinkIcon class="inline-block mr-1 size-4 align-middle" />
                    <span class="align-middle">Official Website</span>
                </LinkComponent>
            </p>
        </ProjectDescriptionComponent>

        <ProjectComponent :project="projects[1]!" @click="select(1)" :is-selected="selectedProject === 1" class="order-3" />
        <ProjectDescriptionComponent :is-selected="selectedProject === 1" :project="projects[1]!" class="order-4 max-md:order-5">
            <p class="mb-4">ClickStitch is a cross-stitching tracking and organisation app! Your companion for every project.</p>
            <h3 class="mb-4 text-2xl">Tech Stack</h3>
            <p class="mb-4">Nuxt, .NET, Postgres</p>
            <p>
                <LinkComponent to="https://clickstitch.app" target="_blank">
                    <ExternalLinkIcon class="inline-block mr-1 size-4 align-middle" />
                    <span class="align-middle">Official Website</span>
                </LinkComponent>
            </p>
        </ProjectDescriptionComponent>

        <ProjectComponent :project="projects[2]!" @click="select(2)" :is-selected="selectedProject === 2" class="order-6" />
        <ProjectDescriptionComponent :is-selected="selectedProject === 2" :project="projects[2]!" class="order-9 max-md:order-7">
            <p class="mb-4">My personal website.</p>
            <h3 class="mb-4 text-2xl">Tech Stack</h3>
            <p>Current: Nuxt</p>
            <p>Old: Vue, Postgres</p>
            <p>Really Old: PHP, MySQL</p>
        </ProjectDescriptionComponent>

        <ProjectComponent :project="projects[3]!" @click="select(3)" :is-selected="selectedProject === 3" class="order-8" />
        <ProjectDescriptionComponent :is-selected="selectedProject === 3" :project="projects[3]!" class="order-9 max-md:order-10">
            <p class="mb-4">
                <em>Tesco's API no longer works, therefore GoCart is unable to search for products. :(</em>
            </p>
            <p class="mb-4">GoCart is a companion to users wanting to make their shopping experience more efficient. It integrates the Tesco API to allow for Tesco-specific products to be added to it.</p>
            <p class="mb-4">The main goals of the project are to make shopping more efficient and potentially reduce costs and promote healthier eating.</p>
            <p class="mb-4">It comes in 2 forms: an Android App and a webapp.</p>
            <p class="mb-4">Initially, as part of the Mobile App Development coursework at university I decided to create a shopping list app with the focus that it would integrate the Tesco API. Then for my final year project, I decided to recreate the project in the form of a webapp.</p>
            <h3 class="mb-4 text-2xl">Capabilities</h3>
            <p class="mb-4">Both apps allows the user to create a shopping list where they are able to "check" and "uncheck" items during a shop, meaning they will have a clear list of remaining items they need to get.</p>
            <p class="mb-4">Prior to a shop, they can compile their shopping list by searching for individual products which will result in a list of actual Tesco products.</p>
            <p class="mb-4">When viewing such products, user's will be able to review its price, ingredients and nutritional values. Furthermore, similar - more healthy or cheaper - products are suggested which aims to reach the goal of reducing costs of shops and promoting healthier eating.</p>
            <h3 class="mb-4 text-2xl">Tech Stack</h3>
            <p>Android App: Java</p>
            <p class="mb-4">Webapp: Vue, Java, Spring Boot, Tesco API</p>
            <p>
                <LinkComponent to="https://gocart.wjbaker.com" target="_blank">
                    <ExternalLinkIcon class="inline-block mr-1 size-4 align-middle" />
                    <span class="align-middle">Official Website</span>
                </LinkComponent>
            </p>
        </ProjectDescriptionComponent>
        
        <ProjectComponent :project="projects[4]!" @click="select(4)" :is-selected="selectedProject === 4" class="order-11" />
        <ProjectDescriptionComponent :is-selected="selectedProject === 4" :project="projects[4]!" class="order-14 max-md:order-12">
            <p class="mb-8">
                <ExpandableImageComponent src="/static/projects/glimpse_preview.jpg" class="shadow-md rounded-md" alt="The main dashbaord for Glimpse; a sidebar of different views with the current view being message statistics in the UK." />
            </p>
            <p class="mb-4">During my placement year at Yell, on top of the day-to-day work, we had a side project where we had to create an internal tool for any department within Yell.</p>
            <p class="mb-4">So as a team of 4 people we decided to create a web application that would aid the project managers and marketing in analysing the trends and statistics of the, then, newly released messaging feature.</p>
            <p class="mb-4">The completed project included an interactive dashboard that displayed graphs and statistics on many aspects of the messaging feature. Initially, data was manually imported from the existing Yell databases and transformed into a format we wanted.</p>
            <p class="mb-4">By the end we were able to enable real-time data, such that when a new message or channel was created, the dashboard would update.</p>
            <h3 class="mb-4 text-2xl">Tech Stack</h3>
            <p class="mb-4">Vue, Java, Spring Boot, MySQL, SendBird</p>
        </ProjectDescriptionComponent>
        
        <ProjectComponent :project="projects[5]!" @click="select(5)" :is-selected="selectedProject === 5" class="order-13" />
        <ProjectDescriptionComponent :is-selected="selectedProject === 5" :project="projects[5]!" class="order-14 max-md:order-15">
            <p class="mb-4">The Normal Distribution Graph webpage is a web-based application designed as a graphical, interactive way of viewing a Normal Distribution Graph.</p>
            <p class="mb-4">It was made for my Computing project at seconday school which was to create an application. I decided to create something for the Maths department to aid in helping students learn more about normal distribution.</p>
            <p class="mb-4">A form of backing up "snapshots" of current settings is also available. Users can save and load what values are currently displayed so that they can be demonstrated when they are needed.</p>
            <h3 class="mb-4 text-2xl">Tech Stack</h3>
            <p>JavaScript, jQuery, PHP, MySQL</p>
        </ProjectDescriptionComponent>

    </div>
</template>

<script setup lang="ts">
import { ExternalLinkIcon } from 'lucide-vue-next';

import ProjectComponent from '~/pages/projects/index/_components/ProjectComponent.vue';
import ProjectDescriptionComponent from '~/pages/projects/index/_components/ProjectDescriptionComponent.vue';

import type { IProject } from '~/pages/projects/index/_logic/Project';

const selectedProject = ref<number | null>(null);

function select(value: number) {
    if (selectedProject.value === value) {
        selectedProject.value = null;
    }
    else {
        selectedProject.value = value;
    }
}

const projects: Array<IProject> = [
    {
        title: 'Custom Crosshair Mod',
        imageUrl: '/static/projects/custom-crosshair-mod.png',
        timePeriod: '2016—Present',
    },
    {
        title: 'ClickStitch',
        imageUrl: '/static/projects/clickstitch.png',
        timePeriod: '2023—Present',
    },
    {
        title: 'wjbaker.com',
        imageUrl: '/static/projects/wjbaker.com.svg',
        timePeriod: '2015—Present',
    },
    {
        title: 'GoCart',
        imageUrl: '/static/projects/gocart.png',
        timePeriod: '2018—2021',
    },
    {
        title: 'Glimpse',
        imageUrl: '/static/projects/glimpse.png',
        timePeriod: '2019',
    },
    {
        title: 'Normal Distribution Graph',
        imageUrl: '/static/projects/normal-distribution-graph.jpg',
        timePeriod: '2016',
    },
];

onMounted(() => {
    document.body.style.overflowY = 'scroll';
});

onUnmounted(() => {
    document.body.style.overflowY = '';
});
</script>