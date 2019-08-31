<template>
    <div class="form-card-container">
        <h2>{{ title }}</h2>
        <slot />
    </div>
</template>

<script>
    export default {
        name: 'FormContainerComponent',

        props: [ 'title' ],
    }
</script>

<style lang="scss">
    .form-card-container {
        padding: 1rem;
        background-color: theme(grey-light);
        border: 1px solid theme(grey-dark);
        border-radius: layout(border-radius);

        & + .form-card-container {
            margin-top: 1rem;
        }
    }
</style>
