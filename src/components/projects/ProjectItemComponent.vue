<template>
    <article class="note project-item">
        <h2>{{ projectItem.title }}</h2>
        <p><small>{{ projectItem.date }}</small></p>
        <div v-html="projectItem.summary"></div>
        <p>
            <router-link :to="`/projects/${projectItem.id}`">
                <button>View</button>
            </router-link>
        </p>
    </article>
</template>

<script>
    export default {
        name: 'ProjectItemComponent',

        props: [ 'projectItem' ],
    }
</script>

<style lang="scss">
    .project-item {
        padding: 0.5rem 2rem;
        margin: 0 -2rem;
        border-left: 2px solid theme(primary);

        & + article {
            margin-top: 1rem;
        }

        .image-container {
            padding-top: 1rem;

            img {
                border-radius: layout(border-radius);
                border: 1px solid theme(grey-dark);
            }
        }
    }
</style>
