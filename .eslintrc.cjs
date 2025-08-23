// .eslintrc.cjs
const globals = require("globals");

module.exports = [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],

    // basic globals for browser + node
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: { jsx: true },
    },

    // replaces .eslintignore
    ignores: [
      ".next/",
      "node_modules/",
      "dist/",
      "out/",
      "coverage/",
      "frontend/**/.next/",
      "frontend/flexdash/**/.next/",
      "**/*.md",
      "**/*.json",
      "**/*.lock",
      "**/*.css",
    ],

    // rules are optional, just simple ones
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
];

