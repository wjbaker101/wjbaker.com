<template>
    <InnerCardComponent class="project-item">
        <p><small>{{ projectItem.date }}</small></p>
        <h2>{{ projectItem.title }}</h2>
        <div v-html="projectItem.summary"></div>
        <p>
            <router-link :to="`/projects/${projectItem.id}`">
                <button>View</button>
            </router-link>
        </p>
    </InnerCardComponent>
</template>

<script>
    import InnerCardComponent from '@/components/item/InnerCardComponent.vue';

    export default {
        name: 'ProjectItemComponent',

        props: [ 'projectItem' ],

        components: {
            InnerCardComponent,
        },
    }
</script>

<style lang="scss">
    .project-item {
        border-top: 1px solid theme(grey-dark);
        border-left: 2px solid theme(secondary);
    }
</style>
