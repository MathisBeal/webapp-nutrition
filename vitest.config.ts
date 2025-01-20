import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    globals: true, // Pas besoin d'importer describe, it, etc.
    environment: "jsdom",
    include: ["test/**/*.test.{ts,vue}"],
    exclude: ["node_modules", ".output", "coverage", ".nuxt"],
    coverage: {
      provider: "v8",
      reporter: ["html"],
      reportsDirectory: "./coverage", // Répertoire des rapports de couverture
      include: ["./**/*.{ts,vue}"], // Fichiers à inclure pour la couverture
      exclude: ["./**/*.d.ts"], // Exclure les définitions TypeScript
    },
    testTimeout: 30000,
    maxConcurrency: 5, // Nombre maximum de tests en parallèle
  },
});
