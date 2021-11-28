import { createApp } from 'vue';
import dayjs from 'dayjs';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);
dayjs.extend(isToday);

import Particles from 'particles.vue3';
import { appRouter } from '@/router/app.router';

import App from '@/App.vue';

import '@/registerServiceWorker';

createApp(App)
    .use(Particles)
    .use(appRouter)
    .mount('#app');