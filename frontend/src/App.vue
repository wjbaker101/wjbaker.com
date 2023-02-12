<template>
    <AsideComponent />
    <div class="aside-placeholder"></div>
    <main>
        <router-view></router-view>
    </main>
</template>

<script setup lang="ts">
import AsideComponent from '@/component/layout/Aside.component.vue';
</script>

<style lang="scss">
@import './style/main';

#app {
    height: 100%;
    display: flex;

    @media screen and (max-width: breakpoint()) {
        height: auto;
        display: block;
    }

    .aside-placeholder {
        width: 25%;
        min-width: 300px;
        max-width: 430px;
        flex: 0 0 auto;
    }

    main {
        flex: 1;
    }
}
</style>