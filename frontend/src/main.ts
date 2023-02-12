import { createApp } from 'vue';
import Particles from 'particles.vue3';

import App from '@/App.vue';
import { appRouter } from '@/router/app.router';

import '@/setup/dayjs';
import '@/setup/service-worker';

createApp(App)
    .use(Particles)
    .use(appRouter)
    .mount('#app');