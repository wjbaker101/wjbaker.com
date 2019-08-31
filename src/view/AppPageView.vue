<template>
    <div>
        <router-view @navpageinit="onNavPageinit"></router-view>
        <FooterComponent />
    </div>
</template>

<script>
    import FooterComponent from '@/components/layout/FooterComponent.vue';

    export default {
        name: 'PageRoute',

        components: {
            FooterComponent,
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
    .page-content {
        position: relative;
        max-width: layout(max-width);
        padding: 2rem;
        margin: auto auto 1rem auto;
        background-color: theme(grey-light);
        border: 1px solid theme(grey-dark);
        border-radius: layout(border-radius);
    }
</style>
