<template>
    <div class="blog-post-component">
        <h3>{{ blogPost.title }}</h3>
        <p>
            <small>{{ date }}</small>
        </p>
        <p>{{ blogPost.summary }}</p>
        <p>
            <router-link :to="`/blog/post/${blogPost.id}`">
                <ButtonComponent>Read Full Post</ButtonComponent>
            </router-link>
        </p>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { DateUtils } from '@frontend/util/DateUtils';

    import { BlogPostModel } from '@common/model/BlogPostModel';

    import ButtonComponent from '@frontend/component/ButtonComponent.vue';

    @Component({
        components: {
            ButtonComponent,
        },
    })
    export default class BlogPostComponent extends Vue {

        @Prop({
            required: true,
        })
        private readonly blogPost!: BlogPostModel;

        get date(): string {
            return DateUtils.dateTimeVariableYear(this.blogPost.postDate);
        }
    }
</script>

<style lang="scss">
    .blog-post-component {

        & + .blog-post-component {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid theme(secondary);
        }
    }
</style>
