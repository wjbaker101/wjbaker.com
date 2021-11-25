<template>
    <div class="landing-view flex">
        <Particles
            id="particles"
            type="cobweb"
            color="#176bc0"
            :options="{
                fpsLimit: 60,
                particles: {
                    color: {
                        value: '#176bc0',   
                    },
                    links: {
                        color: '#176bc0',
                        distance: 150,
                        enable: true,
                        opacity: 0.4,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: 'none',
                        enable: true,
                        outMode: 'bounce',
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            value_area: 1000,
                        },
                        value: 60,
                    },
                    opacity: {
                        value: 0.4,
                    },
                    shape: {
                        type: 'circle',
                    },
                    size: {
                        random: true,
                        value: 5,
                    },
                },
                detectRetina: true,
            }"
        />
        <div class="title-container">
            <PageTitleComponent
                title="William Baker"
                subheading="Software Developer"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PageTitleComponent from '@/component/PageTitle.component.vue';

export default defineComponent({
    name: 'LandingView',

    components: {
        PageTitleComponent,
    },

    setup() {},
});
</script>

<style lang="scss">
.landing-view {
    height: 100%;
    padding: 1rem;
    position: relative;

    @media screen and (max-width: breakpoint()) {
        height: calc(100vh - 114px);
    }

    #particles,
    #particles .tsparticles-canvas-el {
        position: absolute !important;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
    }

    .title-container {
        width: 100%;
        margin: auto;
    }
}
</style>