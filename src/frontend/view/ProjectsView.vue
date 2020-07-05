<template>
    <PageContentComponent class="projects-view">
        <PageTitleComponent title="Projects" />
        <PageActionsComponent v-if="user !== null && user.isAdmin">
            <router-link to="/projects/create">
                <ButtonComponent :isGhost="true">+</ButtonComponent>
            </router-link>
        </PageActionsComponent>
        <div v-if="isLoading">
            <LoadingComponent message="Loading Projects" />
        </div>
        <ErrorComponent
            v-else-if="projects === null"
            message="Unable to load projects; try refreshing the page."
        />
        <div v-else>
            <div class="projects">
                <ProjectComponent
                    :key="`project-${index}`"
                    v-for="(project, index) in projects"
                    :project="project"
                />
            </div>
            <div class="all-tags-container" v-if="tags.length > 0">
                <h2>Tag Frequencies</h2>
                <p>
                    <ProjectTagComponent
                        :key="`tag-${tag.name}`"
                        v-for="tag in tags"
                        :tag="tag"
                    />
                </p>
            </div>
        </div>
    </PageContentComponent>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { API } from '@frontend/api/API';

    import { ProjectModel } from '@common/model/ProjectModel';
    import { UserModel } from '@common/model/UserModel';

    import PageContentComponent from '@frontend/component/page/PageContentComponent.vue';
    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';
    import PageActionsComponent from '@frontend/component/page/PageActionsComponent.vue';
    import ProjectComponent from '@frontend/component/view/ProjectComponent.vue';
    import ProjectTagComponent from '@frontend/component/view/ProjectTagComponent.vue';

    import ButtonComponent from '@frontend/component/ButtonComponent.vue';
    import ErrorComponent from '@frontend/component/ErrorComponent.vue';
    import LoadingComponent from '@frontend/component/LoadingComponent.vue';

    interface Tag {
        name: string,
        frequency: number,
    }

    const tagNameSort = (tagA: Tag, tagB: Tag) => {
        if (tagA.name < tagB.name) {
            return -1;
        }

        if (tagA.name > tagB.name) {
            return 1;
        }

        return 0;
    };

    const tagFrequencySort = (tagA: Tag, tagB: Tag) => {
        if (tagA.frequency > tagB.frequency) {
            return -1;
        }

        if (tagA.frequency < tagB.frequency) {
            return 1;
        }

        return 0;
    };

    @Component({
        components: {
            PageContentComponent,
            PageTitleComponent,
            PageActionsComponent,
            ProjectComponent,
            ProjectTagComponent,
            ButtonComponent,
            ErrorComponent,
            LoadingComponent,
        },
    })
    export default class ProjectsView extends Vue {

        private isLoading: boolean = false;

        get user(): UserModel | null {
            return this.$store.state.user;
        }

        get projects(): ProjectModel[] | null {
            return this.$store.state.projects;
        }

        async mounted(): Promise<void> {
            if (this.projects !== null) {
                return;
            }

            await this.getProjects();
        }

        async getProjects(): Promise<void> {
            this.isLoading = true;

            const projects = await API.getProjects();

            if (projects instanceof Error) {
                this.isLoading = false;
                return;
            }

            this.$store.dispatch('setProjects', projects);
            this.isLoading = false;
        }

        get tags(): Tag[] {
            if (this.projects === null) {
                return [];
            }

            const map: Record<string, number> = {};

            const tags = this.projects
                    .map(project => project.tags)
                    .reduce((total, project) => total.concat(project), []);

            tags.forEach(tag => {
                if (!(tag in map)) {
                    map[tag] = 1;
                }
                else {
                    map[tag]++;
                }
            });

            return Object.entries(map)
                    .map(([name, frequency]) => ({ name, frequency }))
                    .sort(tagNameSort)
                    .sort(tagFrequencySort);
        }
    }
</script>

<style lang="scss">
    .projects-view {

        .all-tags-container {
            margin-top: 2rem;
        }
    }
</style>
