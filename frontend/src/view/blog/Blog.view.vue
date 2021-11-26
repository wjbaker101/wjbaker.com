<template>
    <PageContentComponent class="blog-view">
        <PageTitleComponent title="Blog" />
        <div v-if="isLoading">
            <LoadingComponent message="Loading Blog Posts" />
        </div>
        <ErrorComponent
            v-else-if="isError"
            message="Unable to load blog; try refreshing the page."
        />
        <div class="blog-posts" v-else>
            <BlogPostComponent
                :key="blogPost"
                v-for="blogPost in blogPosts"
                :blogPost="blogPost"
            />
        </div>
    </PageContentComponent>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/PageTitle.component.vue';
import LoadingComponent from '@/component/Loading.component.vue';
import ErrorComponent from '@/component/Error.component.vue';
import BlogPostComponent from '@/view/blog/component/BlogPost.component.vue';

import { blogClient } from '@/api/client/blog/Blog.client';

import { BlogPost } from '@/model/BlogPost.model';
import dayjs from 'dayjs';

export default defineComponent({
    name: 'BlogView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        LoadingComponent,
        ErrorComponent,
        BlogPostComponent,
    },

    setup() {
        const blogPosts = ref<Array<BlogPost>>([]);
        const isLoading = ref<boolean>(false);
        const isError = ref<boolean>(false);

        onMounted(async () => {
            isLoading.value = true;
            isError.value = false;

            const result = await blogClient.searchBlog(1);
            if (result instanceof Error) {
                isLoading.value = false;
                isError.value = true;
                return;
            }

            blogPosts.value = result.posts.map(x => ({
                reference: x.reference,
                title: x.title,
                urlSlug: x.urlSlug,
                postedAt: dayjs(x.postedAt),
                summary: x.summary,
                content: null
            }));

            isLoading.value = false;
            isError.value = false;
        });

        return {
            blogPosts,
            isLoading,
            isError,
        }
    },
});
</script>

<style lang="scss">
</style>