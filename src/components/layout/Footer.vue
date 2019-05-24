<template>
    <footer>
        <small>
            <p>
                Copyright &copy; William Baker 2015 &mdash; {{ year }},<br>
                All rights reserved.
            </p>
            <p>
                Icons provided by
                <ExternalLink href="https://fontawesome.com/license">Font Awesome</ExternalLink>.
            </p>
        </small>
    </footer>
</template>

<script>
    import ExternalLink from '@/components/ExternalLink.vue';

    export default {
        name: 'Footer',

        components: {
            ExternalLink,
        },

        data() {
            return {
                year: new Date().getFullYear(),
            }
        },
    }
</script>

<style lang="scss">

</style>
