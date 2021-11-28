<template>
    <PageContentComponent class="blog-post-view" v-if="blogPost !== null">
        <PageTitleComponent :title="blogPost.title" />
        <PageActionsBarComponent returnLink="/blog" returnText="Return to Blog">
            <template v-slot:right>
                <div>
                    <strong>Posted:</strong> {{ displayPostedAt }} ({{ displayPostedAtDifference }})
                </div>
            </template>
        </PageActionsBarComponent>
        <div v-if="isLoading">
            <LoadingComponent message="Loading Blog post" />
        </div>
        <div v-else v-html="blogPost.content"></div>
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

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/PageTitle.component.vue';
import PageActionsBarComponent from '@/component/PageActionsBar.component.vue';
import ButtonComponent from '@/component/Button.component.vue';
import LinkComponent from '@/component/Link.component.vue';
import ErrorComponent from '@/component/Error.component.vue';
import LoadingComponent from '@/component/Loading.component.vue';

import { BlogPost } from '@/model/BlogPost.model';

import { blogClient } from '@/api/client/blog/Blog.client';

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
    },

    setup() {
        const route = useRoute();

        const urlSlug = route.params.urlSlug as string;

        const blogPost = ref<BlogPost | null>(null);
        const isLoading = ref<boolean>(false);
        const isError = ref<boolean>(false);
        
        const displayPostedAt = computed<string>(() => blogPost?.value?.postedAt.format('Do MMMM YYYY') ?? '');
        const displayPostedAtDifference = computed<string>(() => blogPost?.value?.postedAt.fromNow() ?? '');

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
            blogPost,
            isLoading,
            isError,
            displayPostedAt,
            displayPostedAtDifference,
        }
    },
});
</script>

<style lang="scss">
</style>