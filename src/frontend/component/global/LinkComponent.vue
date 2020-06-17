<template>
    <a class="link-component" target="_blank" rel="noopener noreferrer">
        <slot />
    </a>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class LinkComponent extends Vue {
    }
</script>

<style lang="scss">
</style>
