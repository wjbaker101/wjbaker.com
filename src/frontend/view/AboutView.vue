<template>
    <PageContentComponent class="about-view">
        <PageTitleComponent title="About" />
        <div class="flex flex-responsive">
            <div class="flex-auto flex-v-center text-center">
                <img
                    width="240" height="240"
                    class="me"
                    src="@frontend/assets/image/me-about.jpg"
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
        <p>I went to Loughborough University to study Computer Science, where I also did a placement year (more on that later!).</p>
        <h2>Career &amp; Education</h2>
        <p>A timeline with career and educational events over the course of my lifetime.</p>
        <div class="note">
            <p>For more information on my career path and experience, feel free to visit my <LinkComponent href="https://linkedin.com/in/wjbaker101">LinkedIn</LinkComponent> page or <router-link to="/about/cv">view my CV</router-link>!</p>
        </div>
        <TimelineComponent :timeline="timeline" />
        <!-- <p>After completing my uni course, I got a job at Codeweavers in Stafford as a Backend Developer. This mainly revolved around using C#.</p> -->
    </PageContentComponent>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { TimelineItem } from '@frontend/model/TimelineItem';

    import EducationIcon from '@frontend/assets/icon/graduation-cap.svg';
    import JobIcon from '@frontend/assets/icon/briefcase.svg';

    import PageContentComponent from '@frontend/component/page/PageContentComponent.vue';
    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';

    import TimelineComponent from '@frontend/component/TimelineComponent.vue';

    const timelineItems = [
        {
            date: 'November 2015',
            type: 'project',
            summary: 'The first iteration of this website went live.',
        },
        {
            date: 'September 2016',
            type: 'education',
            summary: 'Started my Computer Science degree at Loughborough University.',
            icon: EducationIcon,
        },
        {
            date: 'August 2017–Present',
            type: 'career',
            summary: 'Started a new job at Bradleys Foods as an IT Project Assistant.',
            icon: JobIcon,
            content: '<p>During the summer of my first year, I contacted a company in Ashford called Bradleys who specialise in wholesale bakery deliveries where they I got the job as an IT Project Assistant.</p><p>In my time at Bradleys I mainly worked on content management and SEO optimisation of their main website. Later on, I was given the project to create the website <a href="https://cakecraftcentrenorwich.co.uk" target="_blank" rel="noopener noreferrer">cakecraftcentrenorwich.co.uk</a>. I still continue to update and maintain the website.</p>',
        },
        {
            date: 'July 2018–2019',
            type: 'career',
            summary: 'Began my university placement year at Yell as Undergraduate Software Developer.',
            icon: JobIcon,
            content: '<p>Moving on deeper into univeristy, as part of my Computer Science course, I also did a year in industry. So, for the year I worked at Yell as a Backend Software Developer in Reading.</p><p>Here, I would maintain, extend and develop backend systems for the Yell websites and mobile apps. This involved mainly using Java Springboot, but also involved lots of other languages and development tools such as Docker, AWS and Jenkins.</p>',
        },
        {
            date: 'August–September 2019',
            type: 'education',
            summary: 'Lived in Taiwan for a 6 week Mandarin course at the Taiwanese Mandarin Institute.',
            icon: EducationIcon,
        },
        {
            date: 'July 2020',
            type: 'education',
            summary: 'Graduated university with a Bachelor\'s degree in Computer Science.',
            icon: EducationIcon,
        },
        // {
        //     date: 'September 2020–Present',
        //     type: 'career',
        //     summary: 'Started a new job at Codeweavers as a Backend Software Developer.',
        //     icon: JobIcon,
        // },
        {
            date: 'Here and Now!',
            type: 'education',
            summary: '',
        },
    ];

    @Component({
        components: {
            EducationIcon,
            JobIcon,
            PageContentComponent,
            PageTitleComponent,
            TimelineComponent,
        },
    })
    export default class AboutView extends Vue {

        private readonly timeline: TimelineItem[] = timelineItems;
    }
</script>

<style lang="scss">
    .about-view {

        .me {
            max-width: initial;
            margin-right: 1rem;
            background-color: theme(primary);
            border-radius: 50%;
            border: 1px solid theme(tertiary);
            color: theme(white);

            @media screen and (max-width: breakpoint-large()) {
                margin-right: 0;
            }
        }
    }
</style>
