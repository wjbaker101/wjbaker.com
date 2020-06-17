<template>
    <button class="button-component">
        <slot />
    </button>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class ButtonComponent extends Vue {
    }
</script>

<style lang="scss">
    .button-component {
        width: 100%;
        padding: 0.75rem 1rem;
        font: inherit;
        line-height: 1em;
        letter-spacing: inherit;
        background-color: theme(primary);
        border: 1px solid theme(tertiary);
        border-radius: border-radius();
        color: theme(white);
        cursor: pointer;
        transition: background-color animation(duration-short);

        &:hover {
            background-color: theme(primary-dark);
        }
    }
</style>
