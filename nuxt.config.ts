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
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
  },

  modules: [
    "@nuxt/test-utils/module",
    "@nuxt/eslint",
    "nuxt-auth-utils",
  ],
  css: ['@/assets/styles/global.css'],
});