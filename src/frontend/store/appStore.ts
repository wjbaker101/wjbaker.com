import Vue from 'vue';
import Vuex from 'vuex';

import { State } from '@frontend/model/State';
import { BlogPostModel } from '@common/model/BlogPostModel';
import { ProjectModel } from '@common/model/ProjectModel';

Vue.use(Vuex);

export const appStore = new Vuex.Store({

    state: {

        blogPosts: null,
        projects: null,

    } as State,

    mutations: {

        setProjects(state, projects: ProjectModel[]) {
            state.projects = projects;
        },

        setBlogPosts(state, blogPosts: BlogPostModel[]) {
            state.blogPosts = blogPosts;
        },

    },

    actions: {

        setProjects(context, projects: ProjectModel[]) {
            context.commit('setProjects', projects);
        },

        setBlogPosts(context, blogPosts: BlogPostModel[]) {
            context.commit('setBlogPosts', blogPosts);
        },

    },
});
