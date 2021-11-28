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
        <TimelineComponent :timeline="timeline" />
    </PageContentComponent>
</template>

<script lang="ts">
import { defineComponent, readonly } from 'vue';
import dayjs from 'dayjs';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/PageTitle.component.vue';
import LinkComponent from '@/component/Link.component.vue';
import TimelineComponent from '@/view/about/component/Timeline.component.vue';

import { Timeline, TimelineType } from '@/model/Timeline.model';

export default defineComponent({
    name: 'AboutView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        LinkComponent,
        TimelineComponent,
    },

    setup() {
        const timeline = readonly<Timeline>({
            items: [
                {
                    date: dayjs('2020-09'),
                    endDate: dayjs(),
                    type: TimelineType.Work,
                    summary: 'Started a new job at Codeweavers as a Backend Software Developer.',
                },
                {
                    date: dayjs('2020-06'),
                    endDate: null,
                    type: TimelineType.Education,
                    summary: 'Graduated university with a First Class Honours Bachelor\'s degree in Computer Science.',
                },
                {
                    date: dayjs('2016-09'),
                    endDate: null,
                    type: TimelineType.Work,
                    summary: 'Started my Computer Science degree at Loughborough University.',
                },
                {
                    date: dayjs('2019-08'),
                    endDate: dayjs('2019-09'),
                    type: TimelineType.Education,
                    summary: 'Lived in Taiwan for a 6 week Mandarin course at the Taiwanese Mandarin Institute.',
                },
                {
                    date: dayjs('2018-07'),
                    endDate: dayjs('2019-07'),
                    type: TimelineType.Work,
                    summary: 'Began my university placement year at Yell as Undergraduate Software Developer.',
                },
                {
                    date: dayjs('2017-08'),
                    endDate: dayjs(),
                    type: TimelineType.Work,
                    summary: 'Started a new job at Bradleys Foods as an IT Project Assistant.',
                },
                {
                    date: dayjs('2016-09'),
                    endDate: null,
                    type: TimelineType.Education,
                    summary: 'Started my Computer Science degree at Loughborough University.',
                },
                {
                    date: dayjs('2015-11'),
                    endDate: null,
                    type: TimelineType.None,
                    summary: 'The first iteration of this website went live.',
                },
            ],
        });

        return {
            timeline,
        }
    },
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