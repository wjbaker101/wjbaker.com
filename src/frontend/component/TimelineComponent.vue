<template functional>
    <div class="timeline-component">
        <div
            :key="`timelime-item-${index}`"
            v-for="(timelineItem, index) in props.timeline"
        >
            <h6>
                <div class="icon-container">
                    <Component v-if="timelineItem.icon" :is="timelineItem.icon" />
                </div>
                {{ timelineItem.date }}
            </h6>
            <span>{{ timelineItem.summary }}</span>
            <input :id="`timeline-readmore-${index}`" type="checkbox">
            <label v-if="timelineItem.content" :for="`timeline-readmore-${index}`">
                <small>
                    <LinkComponent @click="onReadMoreClick">
                        Read More
                    </LinkComponent>
                </small>
            </label>
            <div class="timeline-content" v-html="timelineItem.content"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { TimelineItem } from '@frontend/model/TimelineItem';

    @Component({
        components: {},
    })
    export default class TimelineComponent extends Vue {

        @Prop({
            required: true,
        })
        private readonly timeline!: TimelineItem[];
    }
</script>

<style lang="scss">
    .timeline-component {
        max-width: 32rem;
        margin: 2rem auto;

        .timeline-content {
            display: none;

            :last-child {
                margin-bottom: 0;
            }
        }

        input {
            display: none;

            &:checked + label + .timeline-content {
                display: block;
            }
        }

        h6 {
            position: relative;
        }

        & > div {
            padding: 2rem 1rem 2rem 2rem;
            border-left: 1px solid theme(grey-dark);

            .icon-container {
                content: '';
                position: absolute;
                padding: 0.5rem;
                top: 50%;
                left: -2rem;
                display: table;
                width: 1.25rem;
                height: 1.25rem;
                border: 2px solid theme(tertiary);
                border-radius: 50%;
                background-color: theme(primary);
                font-size: 1rem;
                line-height: 1rem;
                color: theme(white);
                transform: translate(-50%, -50%);
            }
        }
    }
</style>
