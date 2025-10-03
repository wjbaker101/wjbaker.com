<template>
    <HeadingComponent>Blog</HeadingComponent>
    <div>
        <PostComponent v-for="post in posts" :post="post" />
    </div>
</template>

<script setup lang="ts">
import PostComponent from '~/components/pages/blog/PostComponent.vue';

import { createPost, type IPost } from '~/models/Post';

const posts: Array<IPost> = [
    createPost({
        title: 'My Website Throughout Time',
        slug: 'my-website-throughout-time',
        createdAt: new Date(2019, 6, 13, 17, 12, 34),
        description: 'Looking back at different version of my personal website over time!',
    }),
];
</script>