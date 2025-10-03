<template>
    <div class="gap-4 grid grid-cols-[min(28rem,33%)_1fr] max-sm:grid-cols-1 max-sm:grid-rows-[auto_1fr] h-full">
        <div>
            <NavComponent />
        </div>
        <div class="grid grid-rows-[1fr_auto] px-4 py-4">
            <div class="mx-auto w-full max-w-3xl">
                <slot></slot>
            </div>
            <FooterComponent />
        </div>
    </div>
</template>

<script setup lang="ts">
</script>