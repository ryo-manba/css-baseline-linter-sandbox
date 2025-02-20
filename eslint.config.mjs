import css from "@eslint/css";

const eslintConfig = [
  {
    files: ["**/*.css"],
    language: "css/css",
    ...css.configs.recommended,
    rules: {
      "css/require-baseline": ["error", { available: "widely" }],
    },
  },
];

export default eslintConfig;
