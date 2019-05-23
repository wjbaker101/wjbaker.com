import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import NavRouter from '@/router/NavRouter.js';

Vue.use(VueRouter);

new Vue({
    router: NavRouter,
    render: h => h(App),
})
.$mount('#app');