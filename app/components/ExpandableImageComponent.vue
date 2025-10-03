<template>
    <div
        @click.self="unexpand"
        :class="{
            'fixed inset-0 bg-slate-800/70 grid p-8 place-items-center': isExpanded,
            '!transition-none': !isExpanded,
        }"
    >
        <img
            @click="expand"
            :src="src"
            :class="{
                [classList!]: classList !== undefined && !isExpanded,
            }"
        >
    </div>
</template>

<script setup lang="ts">
defineProps<{
    src: string;
    classList?: string;
}>();

const isExpanded = ref(false);

function expand() {
    isExpanded.value = true;
}

function unexpand() {
    isExpanded.value = false;
}
</script>