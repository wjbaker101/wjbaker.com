<template>
    <div class="page-content">
        <h1>Projects</h1>
        <article v-bind:key="article.id" v-for="article in articles">
            <h2>{{ article.title }}</h2>
            <p>{{ article.description }}</p>
            <p>
                <button>View</button>
            </p>
        </article>
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';

    export default {
        name: 'ProjectsRoute',

        mixins: [ BaseRouteMixin ],

        data() {
            return {
                articles: [
                    {
                        id: 'gocart',
                        title: 'GoCart',
                        description: 'asdlkihafyohclskdf',
                    },
                    {
                        id: 'normal-distribution-graph',
                        title: 'Normal Distribution Graph',
                        description: 'asdlkihafyohclskdf',
                    },
                    {
                        id: 'wjbaker-com',
                        title: 'wjbaker.com',
                        description: 'asdlkihafyohclskdf',
                    },
                ],
            }
        },
    }
</script>

<style lang="scss">
    article {
        padding: 1rem;

        & + article {
            border-top: 1px solid theme(grey-dark);
        }
    }
</style>