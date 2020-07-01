<template>
    <div class="project-component flex flex-responsive">
        <div class="image-container flex-1 flex-vh-center text-center">
            <img
                v-if="project.previewImageURL !== null"
                :src="project.previewImageURL"
            >
            <ProjectIcon v-else />
        </div>
        <div class="content-container flex-1">
            <h3>{{ project.title }}</h3>
            <p>
                <small>{{ project.startDate }}</small>
            </p>
            <p>{{ project.summary }}</p>
            <div class="actions flex flex-1">
                <router-link :to="`/project/${project.id}`" class="view flex-1">
                    <ButtonComponent>Read More</ButtonComponent>
                </router-link>
                <LinkComponent
                    class="view-link flex-auto flex-v-center"
                    :href="project.viewLink"
                    v-if="project.viewLink !== null"
                >
                    <ButtonComponent>
                        <LinkIcon />
                    </ButtonComponent>
                </LinkComponent>
                <LinkComponent
                    class="github flex-auto flex-v-center"
                    :href="project.sourceCodeURL"
                    v-if="project.sourceCodeURL !== null"
                >
                    <ButtonComponent>
                        <GitHubIcon />
                    </ButtonComponent>
                </LinkComponent>
                <router-link
                    v-if="user !== null && user.isAdmin"
                    :to="`/projects/edit/${project.id}`"
                    class="edit flex-auto flex-v-center"
                >
                    <ButtonComponent :isGhost="true">
                        <EditIcon />
                    </ButtonComponent>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { ProjectModel } from '@common/model/ProjectModel';
    import { UserModel } from '@common/model/UserModel';

    import ButtonComponent from '@frontend/component/ButtonComponent.vue';

    import LinkIcon from '@frontend/assets/icon/external-link.svg';
    import GitHubIcon from '@frontend/assets/icon/github.svg';
    import EditIcon from '@frontend/assets/icon/pencil.svg';
    import ProjectIcon from '@frontend/assets/icon/folder-open.svg';

    @Component({
        components: {
            ButtonComponent,
            LinkIcon,
            GitHubIcon,
            EditIcon,
            ProjectIcon,
        },
    })
    export default class ProjectComponent extends Vue {

        @Prop({
            required: true,
        })
        private readonly project!: ProjectModel;

        get user(): UserModel | null {
            return this.$store.state.user;
        }
    }
</script>

<style lang="scss">
    .project-component {

        .content-container {
            overflow: hidden;
        }

        .image-container {
            order: 2;
            color: theme(secondary);

            svg {
                $size: 5rem;

                width: $size;
                height: $size;
            }
        }

        img {
            border-radius: border-radius();
        }

        .actions {
            .view-link,
            .github,
            .edit {
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
