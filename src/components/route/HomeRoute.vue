<template>
    <div class="page-content">
        <h1>About</h1>
        <p>Hey, my name's Will! I'm a 20 year old software developer with an interest in software, web and mobile development.</p>
        <p>I have been programming for over 10 years and over this time have utilised a wide range of languages, frameworks and techniques to create my projects.</p>
        <p>Here are my links:</p>
        <ul>
            <li><ExternalLink href="https://github.com/wjbaker101">GitHub</ExternalLink></li>
            <li><ExternalLink href="https://linkedin.com/in/wjbaker101">Linkedin</ExternalLink></li>
        </ul>
    </div>
</template>

<script>
    import ExternalLink from '@/components/ExternalLink.vue';

    export default {
        name: 'HomeRoute',

        components: {
            ExternalLink,
        },

        props: [ 'page' ],

        created() {
            this.$emit('navpageinit', this.page);
        },
    }
</script>

<style>
</style>