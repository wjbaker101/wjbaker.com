import Vue from 'vue';
import wysiwyg from 'vue-wysiwyg-lite';

import App from '@frontend/App.vue';
import { appRouter } from '@frontend/router/appRouter';
import { appStore, initialiseAppStore } from '@frontend/store/appStore';
import { wysiwygConfig } from '@frontend/util/wysiwygConfig';

import { autofocusDirective } from '@frontend/directive/autofocusDirective';

import LinkComponent from '@frontend/component/global/LinkComponent.vue';

import '@frontend/registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(wysiwyg, wysiwygConfig);
Vue.component('LinkComponent', LinkComponent);

Vue.directive('autofocus', autofocusDirective);

(async () => {
    await initialiseAppStore();

    new Vue({
        router: appRouter,
        store: appStore,
        render: h => h(App),
    })
    .$mount('#app');
})();
