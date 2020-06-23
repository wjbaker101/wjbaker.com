<template>
    <PageContentComponent class="about-view">
        <PageTitleComponent title="About" />
        <div class="flex flex-responsive">
            <div class="flex-auto flex-v-center text-center">
                <img
                    width="240" height="240"
                    class="me"
                    src="/resource/image/me.jpg"
                    alt="Photo of me!"
                >
            </div>
            <div class="flex-1 flex-v-center">
                <p>Hello, welcome to my personal website!</p>
                <p>I'm a software developer originally from Kent, with an interest in web, mobile and software development, tennis, cooking and baking!</p>
                <p>The main purpose of this website is to create a space where I can showcase some of the projects I have been working on.</p>
                <p>Feel free to look around, play with or download my projects.</p>
            </div>
        </div>
        <p>I have been programming for over 10 years and over this time have utilised a wide range of languages, frameworks and techniques. Another aim for my website is to able to visualise the development of my skills over time when looking at old projects versus new ones.</p>
        <p>If you'd like to see the source code of my projects, please visit my <LinkComponent href="https://github.com/wjbaker101">GitHub</LinkComponent> page!</p>
        <h2>Career</h2>
        <p>For more information on my career path and experience, feel free to visit my <LinkComponent href="https://linkedin.com/in/wjbaker101">LinkedIn</LinkComponent> or <router-link to="/about/cv">view my CV</router-link>!</p>
        <p>Prior to uni, I had never had a job related to programming. During the summer of my first year, I contacted a company in Ashford called Bradleys who specialise in wholesale bakery deliveries where they I got the job as an IT Project Assistant.</p>
        <p>In my time at Bradleys I mainly worked on content management and SEO optimisation of their main website. Later on, I was given the project to create the website <LinkComponent href="https://cakecraftcentrenorwich.co.uk">cakecraftcentrenorwich.co.uk</LinkComponent>. I still continue to update and maintain the website.</p>
        <p>Moving on deeper into univeristy, as part of my Computer Science course, I also did a year in industry. So, for a year, I worked at Yell as a Backend Software Developer in Reading.</p>
        <p>Here, I would maintain and extend backend systems for the Yell websites and mobile apps. This involved mainly using Java Springboot, but also involved lots of other languages and development tools such as Docker, AWS and Jenkins.</p>
        <p>After completing my uni course, I got a job at Codeweavers in Stafford as a Backend Developer. This mainly revolved around using C#.</p>
    </PageContentComponent>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import PageContentComponent from '@frontend/component/page/PageContentComponent.vue';
    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';

    @Component({
        components: {
            PageContentComponent,
            PageTitleComponent,
        },
    })
    export default class AboutView extends Vue {
    }
</script>

<style lang="scss">
    .about-view {

        .me {
            max-width: initial;
            margin-right: 1rem;
            background-color: theme(primary);
            border-radius: 50%;
            color: theme(white);

            @media screen and (max-width: breakpoint-large()) {
                margin-right: 0;
            }
        }
    }
</style>
