module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/standard",
    "@vue/typescript/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "import/no-unused-modules": [1, { unusedExports: true }],
    "no-unused-vars": "warn",
    "no-undef": "error",
    semi: ["error", "always"],
    quotes: ["error", "double"],
    indent: ["error", 2],
    "comma-dangle": ["error", "always-multiline"],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "space-before-function-paren": ["error", "always"],
    eqeqeq: ["error", "always"],
    camelcase: ["error", { properties: "never" }],
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
