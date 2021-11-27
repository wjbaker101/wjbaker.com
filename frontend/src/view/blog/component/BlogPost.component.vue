<template>
    <div class="blog-post-component flex gap flex-responsive">
        <div class="image-container flex-1 flex-vh-center text-center">
            <FileIcon width="48" height="48" />
        </div>
        <div class="content-container flex-2">
            <h3>{{ blogPost.title }}</h3>
            <small>{{ displayPostedAt }} ({{ displayPostedAtDifference }})</small>
            <p>{{ blogPost.summary }}</p>
            <div class="flex gap-small">
                <div class="flex-1">
                    <router-link :to="url">
                        <ButtonComponent>Read Full Post</ButtonComponent>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import ButtonComponent from '@/component/Button.component.vue';
import LinkComponent from '@/component/Link.component.vue';
import FileIcon from '@/component/icon/FileIcon.component.vue';

import { BlogPost } from '@/model/BlogPost.model';

export default defineComponent({
    name: 'BlogPostComponent',

    components: {
        ButtonComponent,
        LinkComponent,
        FileIcon,
    },

    props: {
        blogPost: {
            type: Object as PropType<BlogPost>,
            required: true,
        },
    },

    setup(props) {
        const displayPostedAt = computed<string>(() => props.blogPost.postedAt.format('Do MMMM YYYY'));
        const displayPostedAtDifference = computed<string>(() => props.blogPost.postedAt.fromNow());
        const url = computed<string>(() => `/blog/post/${props.blogPost.urlSlug}`);

        return {
            displayPostedAt,
            displayPostedAtDifference,
            url,
        }
    },
});
</script>

<style lang="scss">
.blog-post-component {
    h3 {
        margin-top: 0;
        line-height: 1em;
    }

    & + .blog-post-component {
        $padding: 3rem;

        margin-top: $padding;
        padding-top: $padding;
        border-top: 1px solid theme(grey-dark);
    }

    .image-container {
        color: theme(secondary);
        filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3));
    }
}
</style>