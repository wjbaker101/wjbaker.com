<template>
    <div id="app" class="flex">
        <AsideComponent />
        <div class="aside-placeholder"></div>
        <main class="flex-1">
            <router-view></router-view>
        </main>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import AsideComponent from '@frontend/component/page/AsideComponent.vue';

    @Component({
        components: {
            AsideComponent,
        },
    })
    export default class LoginView extends Vue {
    }
</script>

<style lang="scss">
    @import './style/main';
    // @import './style/wysiwyg';
    @import '~vue-wysiwyg-lite/dist/vueWysiwyg.css';

    #app {
        height: 100%;

        @media screen and (max-width: breakpoint()) {
            height: auto;
            display: block;
        }

        .aside-placeholder {
            width: 25%;
            min-width: 300px;
            max-width: 430px;
        }
    }
</style>
