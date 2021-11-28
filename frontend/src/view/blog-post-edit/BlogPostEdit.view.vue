<template>
    <PageContentComponent class="blog-post-edit-view">
        <PageTitleComponent :title="isNew ? 'New Blog Post' : 'Edit Blog Post'" :subheading="blogPostReference" />
        <div v-if="isLoading">
            <LoadingComponent message="Loading Blog Post" />
        </div>
        <UserMessageComponent :details="loadUserMessage" />
        <div v-if="!isLoading && !loadUserMessage.isVisible">
            <PageActionsBarComponent :returnLink="returnLink" :returnText="returnText">
            </PageActionsBarComponent>
            <label>
                <strong>Title</strong>
                <input type="text" placeholder="My Blog Post" v-model="titleField">
            </label>
            <label>
                <strong>Url Slug</strong>
                <input type="text" placeholder="my-blog-post" v-model="urlSlugField">
            </label>
            <label>
                <strong>Summary</strong>
                <textarea rows="4" placeholder="Brief description of what the blog post is" v-model="summaryField"></textarea>
            </label>
            <label>
                <strong>Content <LinkComponent href="https://www.markdownguide.org/basic-syntax/">(markdown)</LinkComponent></strong>
                <textarea rows="60" placeholder="Deeper dive into what the blog post is, why it exists and how it was created." v-model="contentField"></textarea>
            </label>
            <label>
                <ButtonComponent @click="onUpdateBlogPost">{{ isNew ? 'Create Blog Post' : 'Update Blog Post' }}</ButtonComponent>
            </label>
            <UserMessageComponent :details="submitUserMessage" />
        </div>
    </PageContentComponent>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/layout/PageTitle.component.vue';
import PageActionsBarComponent from '@/component/layout/PageActionsBar.component.vue';
import LoadingComponent from '@/component/Loading.component.vue';
import UserMessageComponent, { UserMessage } from '@/component/UserMessage.component.vue';
import ButtonComponent from '@/component/Button.component.vue';
import LinkComponent from '@/component/Link.component.vue';

import { blogClient } from '@/api/client/blog/Blog.client';

import { BlogPost } from '@/model/BlogPost.model';

export default defineComponent({
    name: 'BlogPostEditView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        PageActionsBarComponent,
        LoadingComponent,
        UserMessageComponent,
        ButtonComponent,
        LinkComponent,
    },

    setup() {
        const route = useRoute();
        const router = useRouter();

        const blogPostReference = ref<string | null>(route.params.reference?.toString() || null);

        const isNew = computed<boolean>(() => blogPostReference.value === null);

        const blogPost = ref<BlogPost | null>(null);
        const isLoading = ref<boolean>(false);

        const loadUserMessage = ref<UserMessage>(UserMessage.none());
        const submitUserMessage = ref<UserMessage>(UserMessage.none());

        const titleField = ref<string>('');
        const urlSlugField = ref<string>('');
        const summaryField = ref<string>('');
        const contentField = ref<string>('');

        const returnText = computed<string>(() => isNew.value ? 'Return to Blog' : 'Return to Blog Post');
        const returnLink = computed<string>(() => isNew.value ? `/blog` : `/blog/post/${blogPost.value?.urlSlug}`);

        onMounted(async () => {
            if (blogPostReference.value === null)
                return;

            isLoading.value = true;
            loadUserMessage.value = UserMessage.none();

            const result = await blogClient.getBlogPostByReference(blogPostReference.value);
            if (result instanceof Error) {
                isLoading.value = false;
                loadUserMessage.value = UserMessage.error(result.message || 'Unable to load blog post; please try refreshing the page.');
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

            titleField.value = blogPost.value.title;
            urlSlugField.value = blogPost.value.urlSlug;
            summaryField.value = blogPost.value.summary;
            contentField.value = blogPost.value.content ?? '';

            isLoading.value = false;
            loadUserMessage.value = UserMessage.none();
        });

        return {
            blogPostReference,
            isNew,
            isLoading,
            loadUserMessage,
            submitUserMessage,
            titleField,
            urlSlugField,
            summaryField,
            contentField,
            returnText,
            returnLink,

            async onUpdateBlogPost() {
                if (titleField.value.length < 3)
                    return;
                if (summaryField.value.length < 3)
                    return;
                if (contentField.value.length < 3)
                    return;

                submitUserMessage.value = UserMessage.none();

                if (blogPost.value === null) {
                    const result = await blogClient.createBlogPost({
                        title: titleField.value,
                        urlSlug: urlSlugField.value,
                        summary: summaryField.value,
                        content: contentField.value,
                    });
                    if (result instanceof Error) {
                        submitUserMessage.value = UserMessage.error(result.message || 'Unable to create new blog post, please try refreshing the page and trying again.');
                        return;
                    }

                    submitUserMessage.value = UserMessage.success('Successfully created new blog post.');

                    router.push({
                        path: `/blog/post/edit/${result.reference}`,
                    });
                }
                else {
                    const result = await blogClient.updateBlogPost(blogPost.value.reference, {
                        title: titleField.value,
                        urlSlug: urlSlugField.value,
                        summary: summaryField.value,
                        content: contentField.value,
                    });
                    if (result instanceof Error) {
                        submitUserMessage.value = UserMessage.error(result.message || 'Unable to update blog post, please try refreshing the page and trying again.');
                        return;
                    }

                    submitUserMessage.value = UserMessage.success('Successfully updated blog post.');

                    router.push({
                        path: `/blog/post/edit/${result.reference}`,
                    });
                }
            },
        }
    },
});
</script>

<style lang="scss">
</style>