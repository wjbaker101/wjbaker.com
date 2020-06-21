import Vue from 'vue';
import Vuex from 'vuex';

import { State } from '@frontend/model/State';
import { BlogPostModel } from '@common/model/BlogPostModel';
import { ProjectModel } from '@common/model/ProjectModel';
import { UserModel } from '@common/model/UserModel';

Vue.use(Vuex);

export const appStore = new Vuex.Store({

    state: {

        blogPosts: null,
        projects: null,
        user: null,

    } as State,

    mutations: {

        setProjects(state, projects: ProjectModel[]) {
            state.projects = projects;
        },

        setBlogPosts(state, blogPosts: BlogPostModel[]) {
            state.blogPosts = blogPosts;
        },

        setUser(state, user: UserModel) {
            state.user = user;
        },

    },

    actions: {

        setProjects(context, projects: ProjectModel[]) {
            context.commit('setProjects', projects);
        },

        setBlogPosts(context, blogPosts: BlogPostModel[]) {
            context.commit('setBlogPosts', blogPosts);
        },

        setUser(context, user:UserModel) {
            context.commit('setUser', user);
        },

    },
});
