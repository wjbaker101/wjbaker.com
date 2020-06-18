import Vue from 'vue';
import wysiwyg from 'vue-wysiwyg-lite';

import App from '@frontend/App.vue';
import { appRouter } from '@frontend/router/appRouter';
import { appStore } from '@frontend/store/appStore';
import { wysiwygConfig } from '@frontend/util/wysiwygConfig';

import LinkComponent from '@frontend/component/global/LinkComponent.vue';

import '@frontend/registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(wysiwyg, wysiwygConfig);
Vue.component('LinkComponent', LinkComponent);

new Vue({
    router: appRouter,
    store: appStore,
    render: h => h(App),
})
.$mount('#app');
