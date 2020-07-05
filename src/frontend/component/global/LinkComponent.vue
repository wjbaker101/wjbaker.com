<template functional>
    <a
        class="link-component"
        target="_blank"
        rel="noopener noreferrer"
        :href="props.href"
    >
        <slot />
    </a>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class LinkComponent extends Vue {

        @Prop()
        private readonly href!: string;
    }
</script>

<style lang="scss">
</style>
