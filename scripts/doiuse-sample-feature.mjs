import browserslist from "browserslist";
import * as caniuse from "caniuse-lite";

const monthsAgo = 30;
const today = new Date();
const thresholdDate = new Date(today.setMonth(today.getMonth() - monthsAgo));

const featureKey = "css-clip-path";

const browserQueries = {
  chrome: "Chrome > 0 and last 2.5 years",
  edge: "Edge > 0 and last 2.5 years",
  firefox: "Firefox > 0 and last 2.5 years",
  safari: "Safari > 0 and last 2.5 years",
};

const checkFeatureReleaseDate = () => {
  const featureData = caniuse.feature(caniuse.features[featureKey]);

  if (!featureData) {
    console.error(`❌ No data found for feature: ${featureKey}`);
    return;
  }

  console.log(`\n🔍 Checking feature: ${featureData.title} (${featureKey})`);

  let allSupportedBeforeThreshold = true;
  for (const [browser, query] of Object.entries(browserQueries)) {
    const versions = browserslist(query)
      .filter((v) => v.startsWith(browser))
      .map((v) => v.split(" ")[1]);

    const agentData = caniuse.agents[browser];
    if (!agentData) {
      console.log(`❌ No data for ${browser}`);
      continue;
    }

    console.log(`\n📝 Checking ${browser.toUpperCase()}...`);

    let firstSupportedVersion = null;

    for (const [version, support] of Object.entries(
      featureData.stats[browser] || {}
    )) {
      if (support.includes("y")) {
        firstSupportedVersion = version;
        break;
      }
    }

    if (firstSupportedVersion) {
      const releaseDate = agentData.release_date[firstSupportedVersion];
      if (releaseDate) {
        const releaseDateObj = new Date(releaseDate * 1000);
        const isOlderThanThreshold = releaseDateObj <= thresholdDate;
        console.log(
          `  - First supported in ${browser} version ${firstSupportedVersion}: Released on ${releaseDateObj.toISOString()} (${
            isOlderThanThreshold ? "✅ OK" : "❌ Too new"
          })`
        );

        if (!isOlderThanThreshold) {
          allSupportedBeforeThreshold = false;
        }
      } else {
        console.log(
          `  - First supported in ${browser} version ${firstSupportedVersion}: ❓ Release date unknown`
        );
        allSupportedBeforeThreshold = false;
      }
    } else {
      console.log(`  - ❌ No fully supported version found`);
      allSupportedBeforeThreshold = false;
    }
  }

  console.log(
    `\n📢 Feature "${featureData.title}" (${featureKey}) ${
      allSupportedBeforeThreshold
        ? "✅ is widely available!"
        : "❌ is NOT widely available yet!"
    }`
  );
};

checkFeatureReleaseDate();
