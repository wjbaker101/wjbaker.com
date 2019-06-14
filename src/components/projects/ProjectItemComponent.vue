<template>
    <div class="project-item">
        <div class="project-link-container">
            <router-link :to="`/projects/${projectItem.id}`">
                <ButtonComponent class="circle-button" isGhostButton="true">
                    <RightArrow />
                </ButtonComponent>
            </router-link>
        </div>
        <div class="description-container">
            <h2>{{ projectItem.title }}</h2>
            <p><small>{{ projectItem.date }}</small></p>
            <div v-html="projectItem.summary"></div>
        </div>
    </div>
</template>

<script>
    import InnerCardComponent from '@/components/item/InnerCardComponent.vue';
    import ButtonComponent from '@/components/item/ButtonComponent.vue';
    import RightArrow from '@/assets/icons/arrow-right.svg';

    export default {
        name: 'ProjectItemComponent',

        props: [ 'projectItem' ],

        components: {
            InnerCardComponent,
            ButtonComponent,
            RightArrow,
        },
    }
</script>

<style lang="scss">
    .project-item {
        display: flex;
        text-align: left;
        border: 1px solid theme(grey-dark);
        border-left: 2px solid theme(primary);
        border-radius: layout(border-radius);
        background-color: theme(white);
        overflow: hidden;

        @media screen and (max-width: 720px) {
            flex-direction: column;
        }

        h2 {
            color: theme(primary);
        }

        & + .project-item {
            margin-top: 1rem;
        }

        & > * {
            padding: 1rem;
        }

        .project-link-container {
            flex: 0 20%;
            display: flex;
            border-right: 1px solid theme(grey-dark);

            & > * {
                margin: auto;
            }

            @media screen and (max-width: 720px) {
                order: 2;
                border-right: 0;
                border-top: 1px solid theme(grey-dark);
            }
        }

        .description-container {
            flex: 1;
        }

        .circle-button {
            $size: 1rem;
            width: $size;
            height: $size;
            padding: 1rem;
            margin: 0;
            line-height: 1em;
            border-radius: 50%;
            color: theme(secondary);
            border: 2px solid theme(secondary);

            .icon {
                position: relative;
                transform: translate(-50%, -50%);
            }

            &:hover {
                border: 2px solid theme(secondary-dark);
                background-color: theme(secondary);
                color: theme(white);
            }
        }
    }
</style>
