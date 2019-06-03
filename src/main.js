import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import AppRouter from '@/router/AppRouter.js';

Vue.use(VueRouter);

new Vue({
    router: AppRouter,
    render: h => h(App),
})
.$mount('#app');