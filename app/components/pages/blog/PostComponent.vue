<template>
    <article>
        <NuxtLink :to="`/blog/${post.slug}`">
            <h3>{{ post.title }}</h3>
        </NuxtLink>
    </article>
</template>

<script setup lang="ts">
import type { IPost } from '~/models/Post';

defineProps<{
    post: IPost;
}>();
</script>