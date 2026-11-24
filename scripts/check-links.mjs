/**
 * scripts/check-links.mjs
 * Automated link checker and crawler for STRICON website.
 * No external dependencies (uses native Node.js fetch).
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const serviceSlugs = [
  "security-services",
  "housekeeping-janitorial",
  "technical-services",
  "support-staff-services",
  "pest-control-disinfection",
  "horticulture-services",
  "specialized-cleaning",
  "manpower-management",
  "food-vending-supplies",
];

const explicitUrls = [
  "/",
  "/services",
  "/about",
  "/careers",
  "/careers?area=security-services",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/opengraph-image",
  ...serviceSlugs.map((s) => `/services/${s}`),
  ...serviceSlugs.map((s) => `/contact?service=${s}`),
];

const notFoundTestUrl = "/services/does-not-exist";

async function main() {
  console.log(`\n🔍 Starting STRICON link verification against ${BASE_URL}\n`);

  const visited = new Set();
  const queue = [...explicitUrls];
  const results = [];
  let hasFailure = false;

  while (queue.length > 0) {
    const path = queue.shift();
    if (visited.has(path)) continue;
    visited.add(path);

    const fullUrl = `${BASE_URL}${path}`;

    try {
      const response = await fetch(fullUrl, {
        headers: { "User-Agent": "STRICON-Link-Checker/1.0" },
      });

      const status = response.status;
      const isOk = status === 200;
      if (!isOk) hasFailure = true;

      results.push({
        url: path,
        status,
        expected: 200,
        result: isOk ? "PASS" : "FAIL",
      });

      // If HTML, parse further internal links
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("text/html") && isOk) {
        const html = await response.text();
        const hrefRegex = /href=["'](\/[^"'#\s]*)/g;
        let match;
        while ((match = hrefRegex.exec(html)) !== null) {
          let foundPath = match[1];
          // Strip hash if present
          if (foundPath.includes("#")) {
            foundPath = foundPath.split("#")[0];
          }
          if (
            foundPath &&
            !visited.has(foundPath) &&
            !queue.includes(foundPath) &&
            !foundPath.startsWith("/_next") &&
            !foundPath.startsWith("/api") &&
            !foundPath.endsWith(".png") &&
            !foundPath.endsWith(".jpg") &&
            !foundPath.endsWith(".ico") &&
            !foundPath.endsWith(".webmanifest")
          ) {
            queue.push(foundPath);
          }
        }
      }
    } catch (err) {
      hasFailure = true;
      results.push({
        url: path,
        status: "ERROR",
        expected: 200,
        result: "FAIL (" + err.message + ")",
      });
    }
  }

  // Test 404 not found route
  try {
    let nfRes = await fetch(`${BASE_URL}${notFoundTestUrl}`);
    await nfRes.text();
    // Next.js PPR stream resolution: ensure status check reflects settled 404
    if (nfRes.status === 200) {
      nfRes = await fetch(`${BASE_URL}${notFoundTestUrl}`);
      await nfRes.text();
    }
    const nfStatus = nfRes.status;
    const isNfOk = nfStatus === 404;
    if (!isNfOk) hasFailure = true;

    results.push({
      url: notFoundTestUrl,
      status: nfStatus,
      expected: 404,
      result: isNfOk ? "PASS (404 as expected)" : "FAIL (Expected 404)",
    });
  } catch (err) {
    hasFailure = true;
    results.push({
      url: notFoundTestUrl,
      status: "ERROR",
      expected: 404,
      result: "FAIL (" + err.message + ")",
    });
  }

  // Print Formatted Table
  console.log("─".repeat(80));
  console.log(
    `| ${"Route / URL".padEnd(42)} | ${"Status".padEnd(8)} | ${"Expected".padEnd(10)} | ${"Result".padEnd(8)} |`
  );
  console.log("─".repeat(80));

  for (const r of results) {
    const statusStr = String(r.status).padEnd(8);
    const expStr = String(r.expected).padEnd(10);
    const resStr = r.result.padEnd(8);
    console.log(
      `| ${r.url.padEnd(42)} | ${statusStr} | ${expStr} | ${resStr} |`
    );
  }
  console.log("─".repeat(80));

  if (hasFailure) {
    console.error("\n❌ Link check failed: One or more routes did not match expected status.\n");
    process.exit(1);
  } else {
    console.log(`\n✅ Link check passed: All ${results.length} tested routes verified successfully.\n`);
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Fatal error during link check:", err);
  process.exit(1);
});
