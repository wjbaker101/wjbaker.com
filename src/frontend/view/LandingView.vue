<template>
    <div class="landing-view flex">
        <Particles
            type="cobweb"
            color="#176bc0"
            :bg="true"
            :config="config"
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
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { ParticlesBg as Particles } from "particles-bg-vue";

    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';

    @Component({
        components: {
            PageTitleComponent,
            Particles,
        },
    })
    export default class LandingView extends Vue {

        private config: Object = {
            type: 'cobweb',
            alpha: [0.1, 0],
        };
    }
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
        .particles-js-canvas-el {
            position: absolute;
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
