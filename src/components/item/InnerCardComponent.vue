<template>
    <div class="inner-card">
        <slot />
    </div>
</template>

<script>
    export default {
        name: 'InnerCardComponent',
    }
</script>

<style lang="scss">
    .inner-card {
        padding: 1rem;
        background-color: theme(grey);
        border: 1px solid theme(grey-dark);
        border-top: 2px solid theme(secondary);
        border-radius: layout(border-radius);

        & + .inner-card {
            margin-top: 1rem;
        }
    }
</style>
