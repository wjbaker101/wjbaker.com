<template>
    <article>
        <div class="image-container text-centered" v-if="projectItem.imageURL">
            <img :src="projectItem.imageURL">
        </div>
        <h2>{{ projectItem.title }}</h2>
        <p><small>{{ projectItem.date }}</small></p>
        <p>{{ projectItem.description }}</p>
        <p>
            <button>View</button>
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
    article {
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
