<template>
    <button
        class="button-component"
        :class="{ 'is-ghost': isGhost }"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    isGhost: boolean;
}>();
</script>

<style lang="scss">
.button-component {
    width: 100%;
    padding: (0.75rem - 0.4rem) 1rem;
    font: inherit;
    letter-spacing: inherit;
    background-color: theme(primary);
    border: 1px solid theme(tertiary);
    border-radius: border-radius();
    color: theme(white);
    cursor: pointer;
    transition: all animation(duration-short);

    &:hover {
        background-color: theme(primary-dark);
    }

    &.is-ghost {
        border: 1px solid theme(primary);
        background-color: transparent;
        color: theme(black);

        &:hover {
            background-color: theme(tertiary);
        }
    }
}
</style>