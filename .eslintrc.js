module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  rules: {
    "@next/next/no-img-element": "off",
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "react/react-in-jsx-scope": "off",
    // "no-unused-vars": [
    //   "warn",
    //   { "vars": "local", "args": "none", "ignoreRestSiblings": true }
    // ]
    "no-unused-vars": "off",
    "jsx-a11y/alt-text": "off",
    "react-hooks/exhaustive-deps": "off",
    "jsx-a11y/aria-proptypes": "off",
    "react/prop-types": "off",
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  ignorePatterns: [".cache/*", ".vercel/*", "node_modules/*"],
};
