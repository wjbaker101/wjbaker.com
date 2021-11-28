<template>
    <PageContentComponent class="blog-post-view" v-if="blogPost !== null">
        <PageTitleComponent :title="blogPost.title" />
        <PageActionsBarComponent returnLink="/blog" returnText="Return to Blog">
            <template v-slot:right>
                <div>
                    <strong>Posted:</strong> {{ displayPostedAt }} ({{ displayPostedAtDifference }})
                </div>
                <router-link v-if="isAdmin" :to="`/blog/post/edit/${blogPost.reference}`">
                    <ButtonComponent><EditIcon /></ButtonComponent>
                </router-link>
            </template>
        </PageActionsBarComponent>
        <div v-if="isLoading">
            <LoadingComponent message="Loading Blog post" />
        </div>
        <div v-else v-html="markdown"></div>
    </PageContentComponent>
    <PageContentComponent class="blog-post-view" v-else-if="isError">
        <PageTitleComponent title="Blog Post Not Found" />
        <ErrorComponent message="The blog post you were looking for could not be found." />
        <p>
            <router-link to="/blog">
                <ButtonComponent>Return to Blog</ButtonComponent>
            </router-link>
        </p>
    </PageContentComponent>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import MarkdownIt from 'markdown-it';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/PageTitle.component.vue';
import PageActionsBarComponent from '@/component/layout/PageActionsBar.component.vue';
import ButtonComponent from '@/component/Button.component.vue';
import LinkComponent from '@/component/Link.component.vue';
import ErrorComponent from '@/component/Error.component.vue';
import LoadingComponent from '@/component/Loading.component.vue';
import EditIcon from '@/component/icon/PencilIcon.component.vue';

import { blogClient } from '@/api/client/blog/Blog.client';
import { userService } from '@/service/user/User.service';

import { BlogPost } from '@/model/BlogPost.model';
import { UserType } from '@/model/User.model';

const markdownIt = new MarkdownIt();

export default defineComponent({
    name: 'BlogPostView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        PageActionsBarComponent,
        ButtonComponent,
        LinkComponent,
        ErrorComponent,
        LoadingComponent,
        EditIcon,
    },

    setup() {
        const route = useRoute();

        const authDetails = userService.getAuthDetails();
        const isAdmin = computed<boolean>(() => authDetails.value?.user.type === UserType.Admin);

        const urlSlug = route.params.urlSlug as string;

        const blogPost = ref<BlogPost | null>(null);
        const isLoading = ref<boolean>(false);
        const isError = ref<boolean>(false);

        const displayPostedAt = computed<string>(() => blogPost?.value?.postedAt.format('Do MMMM YYYY') ?? '');
        const displayPostedAtDifference = computed<string>(() => blogPost?.value?.postedAt.fromNow() ?? '');

        const markdown = computed<string | null>(() => {
            if (blogPost.value === null || blogPost.value.content === null)
                return null;

            return markdownIt.render(blogPost.value.content);
        });

        onMounted(async () => {
            isLoading.value = false;
            isError.value = false;

            const result = await blogClient.getBlogPostByUrlSlug(urlSlug);
            if (result instanceof Error) {
                isLoading.value = false;
                isError.value = true;
                return;
            }

            blogPost.value = {
                reference: result.reference,
                title: result.title,
                urlSlug: result.urlSlug,
                postedAt: dayjs(result.postedAt),
                summary: result.summary,
                content: result.content,
            };

            isLoading.value = false;
            isError.value = false;
        });

        return {
            isAdmin,
            blogPost,
            isLoading,
            isError,
            displayPostedAt,
            displayPostedAtDifference,
            markdown,
        }
    },
});
</script>

<style lang="scss">
</style>