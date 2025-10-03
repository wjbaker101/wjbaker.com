import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    compatibilityDate: '2025-09-01',

    devtools: {
        enabled: false,
    },

    modules: [
        '@nuxt/fonts',
    ],

    css: ['~/styling/main.css'],

    pages: {
        pattern: [
            '**/*.vue',
            '!**/_components/**',
            '!**/_logic/**',
        ],
    },

    vite: {
        plugins: [
            tailwindcss(),
        ],
    },

});