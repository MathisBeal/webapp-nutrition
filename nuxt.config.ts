import { defineNuxtConfig } from 'nuxt/config';
import dotenv from 'dotenv'

dotenv.config()

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  typescript: {
    typeCheck: true
  },

  // Environment Variables
  runtimeConfig: {
    DATABASE_URL: process.env.DATABASE_URL,
  },

  modules: [
    "@nuxt/test-utils/module",
    "@nuxt/eslint",
    "nuxt-auth-utils",
  ],
  css: ['@/assets/styles/global.css'],
});