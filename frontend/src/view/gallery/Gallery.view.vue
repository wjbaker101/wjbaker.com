<template>
    <PageContentComponent class="gallery-view">
        <PageTitleComponent title="Gallery" />
    </PageContentComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/layout/PageTitle.component.vue';

export default defineComponent({
    name: 'GalleryView',

    components: {
        PageContentComponent,
        PageTitleComponent,
    },

    setup() {},
});
</script>

<style lang="scss">
</style>