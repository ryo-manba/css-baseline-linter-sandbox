import fs from "fs";
import postcss from "postcss";
import doiuse from "doiuse";

const cssFile = "src/app/baseline-invalid.css";

const css = fs.readFileSync(cssFile, "utf8");

const browsers = [
  "Chrome > 0 and last 2.5 years",
  "Edge > 0 and last 2.5 years",
  "Firefox > 0 and last 2.5 years",
  "Safari > 0 and last 0.5 years",
];

postcss([
  doiuse({
    browsers,
    onFeatureUsage: (usageInfo) => {
      // console.log("Detected Feature Usage:", usageInfo);

      const feature = usageInfo.feature || "Unknown feature";
      const unsupportedBrowsers =
        usageInfo.browsers?.join(", ") || "Unknown browsers";

      console.log(`❌ ${feature} is not supported in ${unsupportedBrowsers}`);
    },
  }),
])
  .process(css, { from: cssFile })
  .then(() => {
    console.log("✅ CSS compatibility check completed.");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
