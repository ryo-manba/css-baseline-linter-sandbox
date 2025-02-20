/** @type {import('stylelint').Config} */
module.exports = {
  // "extends": ["stylelint-config-standard"],
  plugins: ["stylelint-no-unsupported-browser-features"],
  rules: {
    "plugin/no-unsupported-browser-features": [
      true,
      {
        browsers: [
          "Chrome > 0 and last 2.5 years",
          "Edge > 0 and last 2.5 years",
          "Firefox > 0 and last 2.5 years",
          "Safari > 0 and last 2.5 years",
        ],
      },
    ],
  },
};
