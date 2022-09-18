module.exports = {
  env: {
    browser: true,
    es2022: true,
  },

  extends: [
    "eslint:recommended",
    "plugin:unicorn/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "unicorn"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
