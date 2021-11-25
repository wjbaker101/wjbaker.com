import { createApp } from 'vue';

import Particles from 'particles.vue3';
import { appRouter } from '@/router/appRouter';

import App from '@/App.vue';

import '@/registerServiceWorker';

createApp(App)
    .use(Particles)
    .use(appRouter)
    .mount('#app');