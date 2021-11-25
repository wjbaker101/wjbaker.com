import { createApp } from 'vue';

import { appRouter } from '@/router/appRouter';

import App from '@/App.vue';

import '@/registerServiceWorker';

createApp(App)
    .use(appRouter)
    .mount('#app');