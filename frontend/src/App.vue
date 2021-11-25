<template>
    <AsideComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AsideComponent from '@/component/layout/Aside.component.vue';

export default defineComponent({
    name: 'App',

    components: {
        AsideComponent,
    },

    setup() {},
});
</script>

<style lang="scss">
@import './style/main';

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