<template>
    <main>
        <router-view @navpageinit="onNavPageinit"></router-view>
        <Footer />
    </main>
</template>

<script>
    import Footer from '@/components/layout/Footer.vue';

    export default {
        name: 'PageRoute',

        components: {
            Footer,
        },

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
