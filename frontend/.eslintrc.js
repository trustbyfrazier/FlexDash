// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },

  ignorePatterns: [
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

  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
    tsconfigRootDir: __dirname,
    // DO NOT add `project` unless you want full type-aware linting
  },

  plugins: ["@typescript-eslint", "react", "react-hooks", "import"],
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],

  settings: {
    react: { version: "detect" },
  },

  rules: {
    // React
    "react/react-in-jsx-scope": "off",
    "react/no-unknown-property": "error",

    // TypeScript
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/await-thenable": "off", // 🚀 FORCE disable

    // Imports
    "import/no-anonymous-default-export": "off",

    // Next.js
    "@next/next/no-assign-module-variable": "off",

    // React Hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },

  overrides: [
    {
      files: [".eslintrc.js", "tailwind.config.js", "next.config.js"],
      env: { node: true },
      rules: {
        "no-undef": "off",
      },
    },
    {
      files: ["**/.next/**", "**/node_modules/**"],
      rules: {
        all: "off", // 🚀 turn off EVERYTHING inside build output
      },
    },
    {
      files: ["src/context/**", "src/app/**", "backend/**/*.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
};

