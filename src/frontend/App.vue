<template>
    <div id="app">
        <AsideComponent />
        <div class="aside-placeholder"></div>
        <main>
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
        display: flex;

        @media screen and (max-width: breakpoint()) {
            height: auto;
            display: block;
        }

        main {
            flex: 1;
        }

        .aside-placeholder {
            width: 25%;
            min-width: 300px;
            max-width: 430px;
        }
    }
</style>
