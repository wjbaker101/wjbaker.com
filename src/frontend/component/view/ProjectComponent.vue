<template>
    <div class="project-component flex">
        <div class="image-container flex-1 flex-vh-center text-center">
            <img :src="`/resource/image/project/${project.id}.jpg`">
        </div>
        <div class="content-container flex-1">
            <h3>{{ project.title }}</h3>
            <p>
                <small>{{ project.startDate }}</small>
            </p>
            <p>{{ project.summary }}</p>
            <div class="actions flex">
                <router-link :to="`/project/${project.id}`" class="view flex-1">
                    <ButtonComponent>View Project</ButtonComponent>
                </router-link>
                <LinkComponent
                    class="github flex-auto"
                    :href="project.sourceCodeURL"
                    v-if="project.sourceCodeURL !== null"
                    target="_blank"
                >
                    <ButtonComponent>
                        <GitHubIcon />
                    </ButtonComponent>
                </LinkComponent>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { ProjectModel } from '@common/model/ProjectModel';

    import ButtonComponent from '@frontend/component/ButtonComponent.vue';

    import GitHubIcon from '@frontend/assets/icon/github.svg';

    @Component({
        components: {
            ButtonComponent,
            GitHubIcon,
        },
    })
    export default class ProjectComponent extends Vue {

        @Prop({
            required: true,
        })
        private readonly project!: ProjectModel;
    }
</script>

<style lang="scss">
    .project-component {

        .content-container {
            overflow: hidden;
        }

        .image-container {
            order: 2;
        }

        img {
            border-radius: border-radius();
        }

        .actions {

            @media screen and (max-width: breakpoint-large()) {
                display: flex;
            }

            .view,
            .github {
                width: unset;
            }

            .github {
                margin-left: 0.25rem;
            }
        }

        & > * {
            padding: 0 1rem;

            & > :first-child {
                margin-top: 0;
            }

            & > :last-child {
                margin-bottom: 0;
            }
        }

        & + .project-component {
            margin-top: 3rem;
            padding-top: 3rem;
            border-top: 1px solid theme(secondary);
        }
    }
</style>
