<template>
    <div class="page-content">
        <h1>Projects</h1>
    </div>
</template>

<script>
    export default {
        name: 'ProjectsRoute',

        props: [ 'page' ],

        created() {
            this.$emit('navpageinit', this.page);
        },
    }
</script>

<style>
</style>