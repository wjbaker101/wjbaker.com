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
        <div v-else>
            <PageActionsBarComponent v-if="isAdmin">
                <template v-slot:right>
                    <router-link to="/blog/post/edit">
                        <ButtonComponent><AddIcon /></ButtonComponent>
                    </router-link>
                </template>
            </PageActionsBarComponent>
            <section class="blog-posts">
                <BlogPostComponent
                    :key="blogPost"
                    v-for="blogPost in blogPosts"
                    :blogPost="blogPost"
                />
            </section>
            <section class="page-navigation" v-if="maxPages > 1">
                <PageActionsBarComponent>
                    <template v-slot:center>
                        <div class="flex-1 text-center" :class="{ 'is-disabled': currentPage === 1 }">
                            <router-link :to="routerPrevPage">
                                <ArrowLeftIconComponent />
                            </router-link>
                        </div>
                        <div class="flex-auto text-center">
                            <strong>{{ currentPage }}</strong> <small>/ {{ maxPages }}</small>
                        </div>
                        <div class="flex-1 text-center" :class="{ 'is-disabled': currentPage === maxPages }">
                            <router-link :to="routerNextPage">
                                <ArrowRightIconComponent />
                            </router-link>
                        </div>
                    </template>
                </PageActionsBarComponent>
            </section>
        </div>
    </PageContentComponent>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import dayjs from 'dayjs';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/PageTitle.component.vue';
import PageActionsBarComponent from '@/component/PageActionsBar.component.vue';
import LoadingComponent from '@/component/Loading.component.vue';
import ButtonComponent from '@/component/Button.component.vue';
import ErrorComponent from '@/component/Error.component.vue';
import BlogPostComponent from '@/view/blog/component/BlogPost.component.vue';
import ArrowLeftIconComponent from '@/component/icon/ArrowLeftIcon.component.vue';
import ArrowRightIconComponent from '@/component/icon/ArrowRightIcon.component.vue';
import AddIcon from '@/component/icon/PlusIcon.component.vue';

import { blogClient } from '@/api/client/blog/Blog.client';
import { userService } from '@/service/user/User.service';

import { BlogPost } from '@/model/BlogPost.model';
import { UserType } from '@/model/User.model';

export default defineComponent({
    name: 'BlogView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        LoadingComponent,
        ButtonComponent,
        ErrorComponent,
        BlogPostComponent,
        PageActionsBarComponent,
        ArrowLeftIconComponent,
        ArrowRightIconComponent,
        AddIcon,
    },

    setup() {
        const route = useRoute();

        const authDetails = userService.getAuthDetails();
        const isAdmin = computed<boolean>(() => authDetails.value?.user.type === UserType.Admin);
        
        const blogPosts = ref<Array<BlogPost>>([]);
        const isLoading = ref<boolean>(false);
        const isError = ref<boolean>(false);

        const currentPage = computed<number>(() => Number(route.query.page ?? 1));
        const total = ref<number | null>(null);
        const pageSize = ref<number | null>(null);

        const maxPages = computed<number>(() => {
            if (total.value === null || pageSize.value === null)
                return Number.MAX_VALUE;

            return Math.ceil(total.value / pageSize.value);
        });

        const routerPrevPage = computed<RouteLocationNormalizedLoaded>(() => ({
            ...route,
            query: {
                ...route.query,
                page: String(Math.max(1, currentPage.value - 1)),
            },
        }));
        const routerNextPage = computed<RouteLocationNormalizedLoaded>(() => ({
            ...route,
            query: {
                ...route.query,
                page: String(Math.min(maxPages.value, currentPage.value + 1)),
            },
        }));

        const loadBlog = async function () {
            isLoading.value = true;
            isError.value = false;

            const result = await blogClient.searchBlog(currentPage.value);
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

            total.value = result.total;
            pageSize.value = result.pageSize;

            isLoading.value = false;
            isError.value = false;
        };

        watch(currentPage, async () => {
            await loadBlog();
        });

        onMounted(async () => {
            await loadBlog();
        });

        return {
            isAdmin,
            blogPosts,
            isLoading,
            isError,
            currentPage,
            total,
            pageSize,
            maxPages,
            routerPrevPage,
            routerNextPage,
        }
    },
});
</script>

<style lang="scss">
.blog-view {
    .page-navigation {
        margin-top: 3rem;

        .is-disabled a {
            color: theme(grey-dark);
        }
    }
}
</style>