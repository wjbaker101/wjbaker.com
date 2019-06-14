<template>
    <InnerCardComponent class="project-item">
        <p><small>{{ projectItem.date }}</small></p>
        <h2>{{ projectItem.title }}</h2>
        <div v-html="projectItem.summary"></div>
        <p>
            <router-link :to="`/projects/${projectItem.id}`">
                <ButtonComponent>View</ButtonComponent>
            </router-link>
        </p>
    </InnerCardComponent>
</template>

<script>
    import InnerCardComponent from '@/components/item/InnerCardComponent.vue';
    import ButtonComponent from '@/components/item/ButtonComponent.vue';

    export default {
        name: 'ProjectItemComponent',

        props: [ 'projectItem' ],

        components: {
            InnerCardComponent,
            ButtonComponent,
        },
    }
</script>

<style lang="scss">
    .project-item {
        border-top: 1px solid theme(grey-dark);
        border-left: 2px solid theme(secondary);
    }
</style>
