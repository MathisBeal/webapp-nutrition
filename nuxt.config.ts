import {defineNuxtConfig} from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: {enabled: true},

  typescript: {
    typeCheck: true
  },

  plugins: ['~/plugins/vue-notification.ts'],

  modules: [
    "@nuxt/test-utils/module",
    "@nuxt/eslint",
    "nuxt-auth-utils",  // Docs : https://nuxt.com/modules/auth-utils
  ],

  css: ['@/assets/styles/global.css'],
});
