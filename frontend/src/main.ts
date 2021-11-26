import { createApp } from 'vue';
import dayjs from 'dayjs';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

import Particles from 'particles.vue3';
import { appRouter } from '@/router/app.router';

import App from '@/App.vue';

import '@/registerServiceWorker';

createApp(App)
    .use(Particles)
    .use(appRouter)
    .mount('#app');