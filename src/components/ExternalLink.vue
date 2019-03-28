<template>
    <a :href="href" rel="noopener noreferrer" target="_blank">
        <slot></slot>
    </a>
</template>

<script>
export default {
    name: 'ExternalLink',

    props: ['href'],
}
</script>

<style>

</style>
