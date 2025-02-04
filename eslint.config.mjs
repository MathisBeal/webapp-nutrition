// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  files: ["**/*.ts", "**/*.tsx", "**/*.vue"],

  /* Custom rules */
  rules: {
    "vue/multi-word-component-names": "off"
  }
});
