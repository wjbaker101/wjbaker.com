<template>
    <main>
        <router-view @navpageinit="onNavPageinit"></router-view>
        <Footer />
    </main>
</template>

<script>
    export default {
        name: 'PageRoute',

        methods: {
            /**
             * Bubble the page navigation event up to the parent route.
             */
            onNavPageinit(page) {
                this.$emit('navpageinit', page);
            },
        },
    }
</script>

<style lang="scss">

</style>
