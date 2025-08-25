const globals = require("globals");

module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs", // or "module" for ES modules
      globals: {
        ...globals.browser,
        ...globals.node,
        showScreen: "readonly", // Mark as global and read-only
        showEpicRondaRelampagoAnnouncement: "readonly",
        unlockAudio: "readonly",
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
    ignores: ["saber_y_ganar_app/build/**", "node_modules/**"],
  },
];