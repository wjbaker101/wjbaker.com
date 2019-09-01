<template>
    <div id="particles-container">
        <div class="landing-title-container">
            <h1>
                <span class="landing-title-content">
                    William Baker<br>
                    <span class="title-subheading">Software Developer</span>
                </span>
            </h1>
        </div>
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import particlesJSConfig from '@/external/particles-js/config.json';

    export default {
        name: 'LandingRoute',

        mixins: [ BaseRouteMixin() ],

        props: [ 'doInit' ],

        mounted() {
            require('particles.js');

            this.$nextTick(() => {
                this.init();
            });
        },

        methods: {
            init() {
                particlesJS('particles-container', particlesJSConfig);
                this.$emit('particlesinit');
            },
        },
    }
</script>

<style lang="scss">
    .landing-title-container {
        display: table;
        margin: auto;
        width: layout(breakpoint-small);
        max-width: 100%;
        padding: 2rem 0;
        padding-right: 4rem;
        padding-left: 2rem;
        text-align: center;

        & > * {
            width: 100%;
            margin: auto;
        }

        @media screen and (max-width: layout(breakpoint-large)) {
            width: layout(breakpoint-small) / 1.5;
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

    .landing-title-content {
        display: inline-block;
        animation: landing-anim animation(duration-long);
    }

    .title-subheading {
        display: inline-block;
        animation: landing-subheading-anim animation(duration-long);
    }

    @keyframes landing-anim {
        from {
            transform: translateX(-2rem);
            opacity: 0.1;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes landing-subheading-anim {
        from {
            transform: translateX(4rem);
            opacity: 0.1;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
</style>
