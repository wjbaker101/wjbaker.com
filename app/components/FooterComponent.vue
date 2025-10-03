<template>
    <div class="mt-16 text-slate-400 text-sm">
        <p>Copyright &copy; William Baker 2015&mdash;{{ year }},</p>
        <p class="pb-2">All rights reserved.</p>
        <p>Fonts by <LinkComponent to="https://fonts.google.com" target="_blank">Google</LinkComponent>, icons by <LinkComponent to="https://lucide.dev" target="_blank">Lucide</LinkComponent> and <LinkComponent to="https://github.com/wyatt-herkamp/vue3-simple-icons" target="_blank">Simple Icons</LinkComponent>.</p>
    </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>