import browserslist from "browserslist";
import * as caniuse from "caniuse-lite";

const monthsAgo = 30;
const today = new Date();
const thresholdDate = new Date(today.setMonth(today.getMonth() - monthsAgo));

const browserQueries = {
  chrome: "Chrome > 0 and last 2.5 years",
  edge: "Edge > 0 and last 2.5 years",
  firefox: "Firefox > 0 and last 2.5 years",
  safari: "Safari > 0 and last 2.5 years",
};

const checkBrowserVersions = () => {
  for (const [browser, query] of Object.entries(browserQueries)) {
    const versions = browserslist(query)
      .filter((v) => v.startsWith(browser))
      .map((v) => v.split(" ")[1]);

    const featureData = caniuse.agents[browser];
    if (!featureData) {
      console.log(`No data for ${browser}`);
      continue;
    }

    console.log(`\n📝 Checking ${browser.toUpperCase()}...`);
    versions.forEach((version) => {
      const releaseDate = featureData.release_date[version];
      if (releaseDate) {
        const releaseDateObj = new Date(releaseDate * 1000);
        const isOlderThanThreshold = releaseDateObj <= thresholdDate;
        console.log(
          `  - Version ${version}: Released on ${releaseDateObj.toISOString()} (${
            isOlderThanThreshold ? "✅ OK" : "❌ Too new"
          })`
        );
      } else {
        console.log(`  - Version ${version}: ❓ Release date unknown`);
      }
    });
  }
};

checkBrowserVersions();
