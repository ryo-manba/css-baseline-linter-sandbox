import { browsers, features, groups, snapshots } from "web-features";

const allFeatures = Object.values(features);

function checkBaselineStatus(feature) {
  console.log("baseline status:", feature.status.baseline);
  if (!feature.status) return "Unknown";

  if (feature.status.baseline === "high") return "Widely Available";
  if (feature.status.baseline === "low") return "Newly Available";
  if (feature.status.baseline === false) return "Limited Availability";
}

console.log("=== Web Features Snapshots ===");
console.log("snapshot:", snapshots);

console.log("=== Web Features ===");
const feature = allFeatures[0];
Object.entries(feature).forEach(([key, value]) => {
  if (key === "status") {
    console.log(`${key}:`);
    Object.entries(value).forEach(([statusKey, statusValue]) => {
      console.log(`  ${statusKey}:`);
      if (statusKey === "support") {
        Object.entries(statusValue).forEach(([supportKey, supportValue]) => {
          console.log(`    ${supportKey}: ${supportValue}`);
        });
        return;
      }
      console.log(`  ${statusKey}: ${statusValue}`);
    });
    return;
  }
  console.log(`${key}: ${value}`);
});

console.log("\n=== Web Features Baseline Status ===");
for (const feature of allFeatures.slice(0, 10)) {
  console.log(`Feature: ${feature.name}`);
  console.log(`Baseline Status: ${checkBaselineStatus(feature)}`);
  console.log("-".repeat(40));
}

console.log("\n=== Web Feature Groups ===");
console.log("groups:", groups);

console.log("\n=== Web Feature Browsers ===");
console.log("browsers:", browsers);
console.log("chrome releases:", browsers.chrome.releases);
