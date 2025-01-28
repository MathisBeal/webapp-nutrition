import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  typescript: {
    typeCheck: true
  },

  modules: ["@nuxt/test-utils/module", "@nuxt/eslint"],
  css: ['@/assets/styles/global.css'],
});
