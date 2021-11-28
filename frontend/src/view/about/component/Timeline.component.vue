<template>
    <div class="timeline-component flex flex-vertical">
        <div :key="`timeline-item-${index}`" v-for="(item, index) in displayItems" class="item">
            <h6>
                <div class="node" :class="{ 'has-icon': item.type !== TimelineType.None }">
                    <Component :is="mapIcon(item.type)" />
                </div>
                <span>{{ mapDate(item.date) }}</span>
                <span v-if="item.endDate !== null"> &mdash; {{ mapEndDate(item.endDate) }}</span>
            </h6>
            <p>{{ item.summary }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, computed, defineComponent, PropType } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

import EducationIcon from '@/component/icon/GraduationCapIcon.component.vue';
import WorkIcon from '@/component/icon/BriefcaseIcon.component.vue';

import { Timeline, TimelineItem, TimelineType } from '@/model/Timeline.model';

export default defineComponent({
    name: 'TimelineComponent',

    props: {
        timeline: {
            type: Object as PropType<Timeline>,
            required: true,
        },
    },

    setup(props) {
        const today: TimelineItem = {
            date: dayjs(),
            endDate: null,
            type: TimelineType.None,
            summary: 'Thank you for visiting my website :)',
        };

        const displayItems = computed<Array<TimelineItem>>(() => [ today ].concat(props.timeline.items));

        return {
            TimelineType,
            displayItems,

            mapIcon(type: TimelineType): Component | null {
                switch (type) {
                    case TimelineType.None: return null;
                    case TimelineType.Education: return EducationIcon;
                    case TimelineType.Work: return WorkIcon;
                    default:
                        return null;
                }
            },

            mapDate(date: Dayjs): string {
                if (date.isToday())
                    return 'Today!';

                return date.format('MMMM YYYY');
            },

            mapEndDate(endDate: Dayjs): string {
                if (endDate.isToday())
                    return 'Present';

                return endDate.format('MMMM YYYY');
            },
        }
    },
});
</script>

<style lang="scss">
.timeline-component {
    position: relative;
    margin: 1rem;
    padding: 3rem 4rem;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 1rem;
        width: 1px;
        background-color: theme(grey-dark);
    }

    h6 {
        display: inline;
        position: relative;

        .node {
            position: absolute;
            left: -3rem;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 1.25rem;
            height: 1.25rem;
            background-color: theme(primary);
            border: 2px solid theme(tertiary);
            border-radius: 50%;

            &.has-icon {
                width: 2.25rem;
                height: 2.25rem;
                color: theme(white);
            }

            .svg-icon {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }

    .item {
        & + .item {
            margin-top: 2rem;
        }
    }
}
</style>