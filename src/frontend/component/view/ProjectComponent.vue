<template>
    <div class="project-component">
        <div class="content-container">
            <h3>{{ project.title }}</h3>
            <p>
                <small>{{ project.startDate }}</small>
            </p>
            <p>{{ project.summary }}</p>
            <div class="actions">
                <router-link :to="`/project/${project.id}`" class="view">
                    <ButtonComponent>View Project</ButtonComponent>
                </router-link>
                <LinkComponent
                    class="github"
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
        <div class="image-container">
            <img :src="`/resource/image/project/${project.id}.jpg`">
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
        display: flex;

        .content-container {
            overflow: hidden;
        }

        .image-container {
            text-align: center;
        }

        img {
            border-radius: border-radius();
        }

        .actions {
            display: flex;

            .view,
            .github {
                width: unset;
            }

            .view {
                flex: 1;
            }

            .github {
                flex: 0 0 auto;
                margin-left: 0.25rem;
            }
        }

        & > * {
            flex: 1;
            padding: 0 1rem;
            margin: auto 0;

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
