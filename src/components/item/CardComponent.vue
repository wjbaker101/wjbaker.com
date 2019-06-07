<template>
    <div class="card">
        <slot />
    </div>
</template>

<script>
    export default {
        name: 'CardComponent',
    }
</script>

<style lang="scss">
    .card {
        padding: 1rem;
        border: 1px solid theme(grey-dark);
        border-left: 2px solid theme(primary);
        border-radius: layout(border-radius);

        & + .card {
            margin-top: 1rem;
        }
    }
</style>
