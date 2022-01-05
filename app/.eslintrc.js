module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "@vue/typescript/recommended",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "semi": ["error", "never"],
    "quotes": [ "error", "double" ],

    "no-console": 0,
    "@typescript-eslint/ban-types": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-var-requires": 0,
    "vue/no-setup-props-destructure": 0,

    "vue/require-v-for-key": "off",
    "vue/experimental-script-setup-vars": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-empty-function": "off"
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        mocha: true,
      },
      rules: {
        "@typescript-eslint/camelcase": 0,
        "@typescript-eslint/no-use-before-define": 0,
      }
    },
  ],
}