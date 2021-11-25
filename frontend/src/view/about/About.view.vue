<template>
    <PageContentComponent class="about-view">
        <PageTitleComponent title="About" />
        <div class="flex gap flex-responsive">
            <div class="flex-auto flex-v-center text-center">
                <img
                    width="240" height="240"
                    class="me"
                    src="@/assets/image/me-about.jpg"
                    alt="Photo of me!"
                >
            </div>
            <div class="flex-1 flex-v-center">
                <p>Hello, welcome to my personal website!</p>
                <p>I'm a software developer originally from Kent, who's goal is creating interesting and helpful software which anyone can use.</p>
                <p>The main purpose of this website is for you to know me better and to create a space where I can showcase some of the projects I have been working on.</p>
                <p>Feel free to read about, play with and download what you find!</p>
            </div>
        </div>
        <h2>About Me</h2>
        <p>Of course, my main interest is in software development; but tennis, gaming, cooking and baking are all passions of mine!</p>
        <p>I have been programming for over 10 years and over this time have utilised a wide range of languages, frameworks and techniques. Another aim for my website is to able to visualise the development of my skills over time when looking at old projects versus new ones.</p>
        <p>If you'd like to see the source codes and additional projects, please visit my <LinkComponent href="https://github.com/wjbaker101">GitHub</LinkComponent> page!</p>
        <h2>Career &amp; Education</h2>
        <p>A timeline with career and educational events over the course of my lifetime.</p>
        <div class="note">
            <p>For more information on my career path and experience, feel free to visit my <LinkComponent href="https://linkedin.com/in/wjbaker101">LinkedIn</LinkComponent> page or <router-link to="/about/cv">view my CV</router-link>!</p>
        </div>
    </PageContentComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import LinkComponent from '@/component/Link.component.vue';
import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/PageTitle.component.vue';

export default defineComponent({
    name: 'AboutView',

    components: {
        LinkComponent,
        PageContentComponent,
        PageTitleComponent,
    },

    setup() {},
});
</script>

<style lang="scss">
.about-view {
    .me {
        max-width: initial;
        background-color: theme(primary);
        border-radius: 50%;
        border: 1px solid theme(tertiary);
        color: theme(white);
    }
}
</style>