import { createApp } from 'vue';
import Particles from 'particles.vue3';

import { appRouter } from '@/router/app.router';

import App from '@/App.vue';

import '@/setup/dayjs.setup';
import '@/registerServiceWorker';

createApp(App)
    .use(Particles)
    .use(appRouter)
    .mount('#app');