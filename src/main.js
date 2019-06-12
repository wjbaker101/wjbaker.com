import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import AppRouter from '@/router/AppRouter.js';
import '@/registerServiceWorker.js';
import wysiwyg from 'vue-wysiwyg';
import wysiwygConfig from '@/external/vue-wysiwyg/config.js';

Vue.use(VueRouter);
Vue.use(wysiwyg, wysiwygConfig);

new Vue({
    router: AppRouter,
    render: h => h(App),
})
.$mount('#app');