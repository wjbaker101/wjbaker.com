<template>
    <div class="blog-post-component">
        <h3>{{ blogPost.title }}</h3>
        <p>
            <small>{{ date }}</small>
        </p>
        <p>{{ blogPost.summary }}</p>
        <p class="actions-container flex">
            <router-link
                :to="`/blog/post/${blogPost.id}/${blogPost.urlTitle}`"
                class="flex-1"
            >
                <ButtonComponent>Read Full Post</ButtonComponent>
            </router-link>
            <router-link
                v-if="user !== null && user.isAdmin"
                :to="`/blog/edit/${blogPost.id}`"
                class="edit flex-auto"
            >
                <ButtonComponent :isGhost="true">
                    <EditIcon />
                </ButtonComponent>
            </router-link>
        </p>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { DateUtils } from '@frontend/util/DateUtils';

    import { BlogPostModel } from '@common/model/BlogPostModel';
    import { UserModel } from '@common/model/UserModel';

    import ButtonComponent from '@frontend/component/ButtonComponent.vue';

    import EditIcon from '@frontend/assets/icon/pencil.svg';

    @Component({
        components: {
            ButtonComponent,
            EditIcon,
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

        get user(): UserModel {
            return this.$store.state.user;
        }
    }
</script>

<style lang="scss">
    .blog-post-component {

        :first-child {
            margin-top: 0;
        }

        :last-child {
            margin-bottom: 0;
        }

        .edit {
            margin-left: 0.25rem;
        }

        & + .blog-post-component {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid theme(secondary);
        }
    }
</style>
