<template>
    <div class="timeline-component flex flex-vertical">
        <div :key="`timeline-item-${index}`" v-for="(item, index) in timeline.items">
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { Timeline } from '@/model/Timeline.model';

export default defineComponent({
    name: 'TimelineComponent',

    props: {
        timeline: {
            type: Object as PropType<Timeline>,
            required: true,
        },
    },

    setup() {},
});
</script>

<style lang="scss">
</style>