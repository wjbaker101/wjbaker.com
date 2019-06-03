<template>
    <main>
        <div id="particles-container">
            <div class="landing-title-container">
                <h1>
                    William Baker<br>
                    <span class="title-subheading">Software Developer</span>
                </h1>
            </div>
        </div>
    </main>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import particlesJSConfig from '@/external/particles-js/config.json';

    export default {
        name: 'LandingRoute',

        mixins: [ BaseRouteMixin() ],

        mounted() {
            require('particles.js');

            this.$nextTick(() => {
                this.init();
            });
        },

        methods: {
            init() {
                particlesJS('particles-container', particlesJSConfig);
            },
        },
    }
</script>

<style lang="scss">
    .landing-title-container {
        display: table;
        margin: auto;
        width: layout(max-width);
        max-width: 100%;
        padding: 2rem 0;
        padding-right: 4rem;
        padding-left: 2rem;
        text-align: center;

        & > * {
            width: 100%;
            margin: auto;
        }

        @media screen and (max-width: 1024px) {
            width: layout(max-width) / 1.5;
        }
    }

    .title-subheading {
        font-weight: normal;
        font-size: 1.3rem;
        color: theme(primary-light);
    }

    #particles-container,
    .particles-js-canvas-el {
        display: flex;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .particles-js-canvas-el {
        z-index: -1;
    }
</style>
