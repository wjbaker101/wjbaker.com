<template>
    <div class="landing-title-container">
        <h1>
            William Baker<br>
            <span class="title-subheading">Software Developer</span>
        </h1>
    </div>
</template>

<script>
    import particlesJSConfig from '@/external/particles-js/config.json';

    export default {
        name: 'LandingRoute',

        mounted() {
            require('particles.js');

            this.$nextTick(() => {
                this.init();
            });
        },

        methods: {
            init() {
                // particlesJS('particles-container', particlesJSConfig);
            },
        },
    }
</script>

<style lang="scss">
    .landing-title-container {
        height: calc(100% - 143px);
        display: flex;
        padding-right: 4rem;
        align-items: flex-start;
        max-width: layout(max-width);
        margin: auto;
        text-align: center;

        & > * {
            width: 100%;
            margin: auto;
        }
    }

    .title-subheading {
        font-weight: normal;
        font-size: 1.3rem;
        color: theme(primary-light);
    }
</style>
