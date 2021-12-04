<template>
    <PageContentComponent class="blog-post-view">
        <PageTitleComponent :title="blogPost?.title ?? 'Loading Blog Post'" />
        <PageActionsBarComponent returnLink="/blog" returnText="Return to Blog">
            <template v-slot:right v-if="blogPost !== null">
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
        <UserMessageComponent :details="userMessage" />
        <div v-if="!isLoading && !userMessage.isVisible" v-html="markdown"></div>
    </PageContentComponent>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/layout/PageTitle.component.vue';
import PageActionsBarComponent from '@/component/layout/PageActionsBar.component.vue';
import ButtonComponent from '@/component/Button.component.vue';
import LinkComponent from '@/component/Link.component.vue';
import UserMessageComponent, { UserMessage } from '@/component/UserMessage.component.vue';
import LoadingComponent from '@/component/Loading.component.vue';
import EditIcon from '@/component/icon/PencilIcon.component.vue';

import { blogClient } from '@/api/client/blog/Blog.client';
import { markdownService } from '@/service/markdown/Markdown.service';
import { userService } from '@/service/user/User.service';

import { BlogPost } from '@/model/BlogPost.model';
import { UserType } from '@/model/User.model';

export default defineComponent({
    name: 'BlogPostView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        PageActionsBarComponent,
        ButtonComponent,
        LinkComponent,
        UserMessageComponent,
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

        const userMessage = ref<UserMessage>(UserMessage.none());

        const displayPostedAt = computed<string>(() => blogPost?.value?.postedAt.format('Do MMMM YYYY') ?? '');
        const displayPostedAtDifference = computed<string>(() => blogPost?.value?.postedAt.fromNow() ?? '');

        const markdown = computed<string>(() => {
            if (blogPost.value === null || blogPost.value.content === null)
                return '';

            return markdownService.parse(blogPost.value.content);
        });

        onMounted(async () => {
            isLoading.value = true;
            userMessage.value = UserMessage.none();

            const result = await blogClient.getBlogPostByUrlSlug(urlSlug);
            if (result instanceof Error) {
                isLoading.value = false;
                userMessage.value = UserMessage.error(result.message || 'Unable to load blog post, please try and refresh.');
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
            userMessage.value = UserMessage.none();
        });

        return {
            isAdmin,
            blogPost,
            userMessage,
            isLoading,
            displayPostedAt,
            displayPostedAtDifference,
            markdown,
        }
    },
});
</script>

<style lang="scss">
</style>