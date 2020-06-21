import Vue from 'vue';
import Vuex from 'vuex';

import { UserService } from '@frontend/service/UserService';
import { State } from '@frontend/model/State';
import { BlogPostModel } from '@common/model/BlogPostModel';
import { ProjectModel } from '@common/model/ProjectModel';
import { UserModel } from '@common/model/UserModel';

Vue.use(Vuex);

export const initialiseAppStore = async () => {
    appStore.state.user = await UserService.getUser();
};

export const appStore = new Vuex.Store({

    state: {

        blogPosts: null,
        projects: null,
        user: null,

    } as State,

    mutations: {

        setProjects(state: State, projects: ProjectModel[]) {
            state.projects = projects;
        },

        setBlogPosts(state: State, blogPosts: BlogPostModel[]) {
            state.blogPosts = blogPosts;
        },

        async setUser(state: State, user: UserModel) {
            state.user = user;

            await UserService.setUser(state.user);
        },

    },

    actions: {

        setProjects(context, projects: ProjectModel[]) {
            context.commit('setProjects', projects);
        },

        setBlogPosts(context, blogPosts: BlogPostModel[]) {
            context.commit('setBlogPosts', blogPosts);
        },

        setUser(context, user: UserModel) {
            context.commit('setUser', user);
        },

        async initialise(context) {
            context.commit('initialise');
        },

    },
});
