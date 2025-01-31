import {defineNuxtConfig} from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: {enabled: true},

  build: {
    transpile: ['vue-multiselect']
  },

  typescript: {
    typeCheck: true
  },

  modules: [
    "@nuxt/test-utils/module",
    "@nuxt/eslint",
    "nuxt-auth-utils",  // Docs : https://nuxt.com/modules/auth-utils
    "nuxt3-notifications", // Docs : https://github.com/kyvg/vue3-notification
    "nuxt-lucide-icons", // Docs : https://nuxt.com/modules/lucide-icons
  ],

  css: ['@/assets/styles/global.css'],

  lucide: {
    namePrefix: 'Icon',
  },
});
