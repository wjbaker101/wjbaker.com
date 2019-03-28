import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import NavRouter from '@/router/NavRouter.js';

Vue.use(VueRouter);

const router = new VueRouter(NavRouter.create());

new Vue({
    router,
    render: h => h(App),
})
.$mount('#app');