import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  typescript: {
    typeCheck: false
  },

 

  modules: [
    "@nuxt/test-utils/module",
    "@nuxt/eslint",
    "nuxt-auth-utils",
    "nuxt3-notifications", // Docs : https://github.com/kyvg/vue3-notification
    "nuxt-lucide-icons",
  ],
  
  css: ['@/assets/styles/global.css'],

  lucide: {
    namePrefix: 'Icon',
  }

  lucide: {
    namePrefix: 'Icon',
  }
});