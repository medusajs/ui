module.exports = {
  extends: [
    "plugin:react/recommended",
    "turbo",
    "prettier",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "react/no-children-prop": "off",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "typescript-eslint/no-explicit-any": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  // parserOptions: {
  //   babelOptions: {
  //     presets: [require.resolve("next/babel")],
  //   },
  // },
}
