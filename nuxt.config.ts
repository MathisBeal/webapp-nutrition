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
  ],
  css: ['@/assets/styles/global.css'],
});
