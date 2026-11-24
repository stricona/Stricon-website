/**
 * scripts/prelaunch-check.mjs
 * Comprehensive prelaunch verification suite:
 * Part 1: Configuration & Environment variables check.
 * Part 2: Live HTML content & SEO checks against production server.
 * Zero external dependencies.
 */

import fs from "fs";
import path from "path";

const isStrict = process.argv.includes("--strict");
const BASE_URL = process.env.BASE_URL || "http://localhost:3100";

// Read .env.local if present
function loadEnvLocal() {
  const envLocalPath = path.join(process.cwd(), ".env.local");
  const envVars = {};
  if (fs.existsSync(envLocalPath)) {
    const lines = fs.readFileSync(envLocalPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
        const idx = trimmed.indexOf("=");
        const k = trimmed.slice(0, idx).trim();
        const v = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
        envVars[k] = v;
      }
    }
  }
  return envVars;
}

const localEnv = loadEnvLocal();
function getEnv(key) {
  return process.env[key] || localEnv[key] || "";
}

// -------------------------------------------------------------
// Part 1: Configuration Checks
// -------------------------------------------------------------
function runConfigChecks() {
  const checks = [];

  // 1. ENQUIRY_DELIVERY
  const delivery = getEnv("ENQUIRY_DELIVERY") || "log";
  const hasRealChannel =
    delivery.includes("resend") || delivery.includes("webhook");
  if (hasRealChannel) {
    checks.push({
      name: "ENQUIRY_DELIVERY",
      status: "OK",
      detail: delivery,
    });
  } else {
    checks.push({
      name: "ENQUIRY_DELIVERY",
      status: isStrict ? "MISSING" : "WARN",
      detail: `Configured as '${delivery}'. Real channel (resend/webhook) needed for production.`,
    });
  }

  // 2. RESEND_API_KEY
  const resendKey = getEnv("RESEND_API_KEY");
  if (delivery.includes("resend")) {
    if (resendKey && resendKey.startsWith("re_")) {
      checks.push({
        name: "RESEND_API_KEY",
        status: "OK",
        detail: "Configured (starts with re_)",
      });
    } else {
      checks.push({
        name: "RESEND_API_KEY",
        status: isStrict ? "MISSING" : "WARN",
        detail: resendKey ? "Present but unexpected format" : "Missing key",
      });
    }
  } else {
    checks.push({
      name: "RESEND_API_KEY",
      status: "OK",
      detail: "Not required (resend channel inactive)",
    });
  }

  // 3. ENQUIRY_FROM
  const enquiryFrom = getEnv("ENQUIRY_FROM");
  if (delivery.includes("resend")) {
    if (enquiryFrom && !enquiryFrom.includes("onboarding@resend.dev")) {
      checks.push({
        name: "ENQUIRY_FROM",
        status: "OK",
        detail: enquiryFrom,
      });
    } else {
      checks.push({
        name: "ENQUIRY_FROM",
        status: isStrict ? "MISSING" : "WARN",
        detail: enquiryFrom
          ? "Uses default onboarding@resend.dev (verify domain in Resend)"
          : "Not configured",
      });
    }
  } else {
    checks.push({
      name: "ENQUIRY_FROM",
      status: "OK",
      detail: enquiryFrom || "Default",
    });
  }

  // 4. ENQUIRY_TO
  const enquiryTo = getEnv("ENQUIRY_TO") || "info@stricon.in";
  checks.push({
    name: "ENQUIRY_TO",
    status: "OK",
    detail: enquiryTo,
  });

  // 5. NEXT_PUBLIC_SITE_URL
  const siteUrl = getEnv("NEXT_PUBLIC_SITE_URL");
  if (siteUrl === "https://www.stricon.in") {
    checks.push({
      name: "NEXT_PUBLIC_SITE_URL",
      status: "OK",
      detail: siteUrl,
    });
  } else {
    checks.push({
      name: "NEXT_PUBLIC_SITE_URL",
      status: isStrict ? "MISSING" : "WARN",
      detail: siteUrl || "Defaults to https://www.stricon.in",
    });
  }

  // 6. ALLOW_INDEXING
  const allowIndexing = getEnv("ALLOW_INDEXING") === "true";
  if (allowIndexing) {
    checks.push({
      name: "ALLOW_INDEXING",
      status: "OK",
      detail: "true (Search engines permitted)",
    });
  } else {
    checks.push({
      name: "ALLOW_INDEXING",
      status: isStrict ? "MISSING" : "WARN",
      detail: "false / unset (Prelaunch guard active, indexing disallowed)",
    });
  }

  // 7. CAREERS_RESUME_UPLOAD
  const resumeUpload = getEnv("CAREERS_RESUME_UPLOAD") || "off";
  if (resumeUpload === "off") {
    checks.push({
      name: "CAREERS_RESUME_UPLOAD",
      status: "OK",
      detail: "off (Uploads safely disabled until Resend configured)",
    });
  } else if (resumeUpload === "on" && delivery.includes("resend")) {
    checks.push({
      name: "CAREERS_RESUME_UPLOAD",
      status: "OK",
      detail: "on (Resend active to forward attachments)",
    });
  } else {
    checks.push({
      name: "CAREERS_RESUME_UPLOAD",
      status: isStrict ? "MISSING" : "WARN",
      detail: "on but Resend channel is not active",
    });
  }

  return checks;
}

// -------------------------------------------------------------
// Part 2: Content & SEO Checks against Live Server
// -------------------------------------------------------------
const FORBIDDEN_STRINGS = [
  "TODO",
  "Lorem",
  "undefined",
  "[object",
  ">null<",
  "24/7",
  "24x7",
  "Crown Brewing",
];

async function fetchWithTimeout(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    const text = await res.text();
    return { status: res.status, text };
  } finally {
    clearTimeout(timer);
  }
}

async function runContentChecks() {
  const routes = [
    "/",
    "/about",
    "/services",
    "/careers",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/services/security-services",
    "/services/housekeeping-janitorial",
    "/services/technical-services",
    "/services/support-staff-services",
    "/services/pest-control-disinfection",
    "/services/horticulture-services",
    "/services/specialized-cleaning",
    "/services/manpower-management",
    "/services/food-vending-supplies",
  ];

  const results = [];

  for (const route of routes) {
    const fullUrl = `${BASE_URL}${route}`;
    try {
      const { status, text } = await fetchWithTimeout(fullUrl);

      if (status !== 200) {
        results.push({
          route,
          status,
          h1Count: 0,
          hasTitle: false,
          hasMetaDesc: false,
          hasCanonical: false,
          forbiddenFound: [],
          pass: false,
        });
        continue;
      }

      // 1. H1 Count
      const h1Matches = text.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
      const h1Count = h1Matches.length;

      // 2. Title tag
      const hasTitle = /<title[^>]*>[\s\S]*?<\/title>/i.test(text);

      // 3. Meta description
      const hasMetaDesc =
        /<meta[^>]+name=["']description["'][^>]*>/i.test(text) ||
        /<meta[^>]+property=["']og:description["'][^>]*>/i.test(text);

      // 4. Canonical link
      const hasCanonical = /<link[^>]+rel=["']canonical["'][^>]*>/i.test(text);

      // 5. Forbidden strings
      // Strip script tags to avoid false positives on React Flight protocol serialized "$undefined"
      const htmlWithoutScripts = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
      const forbiddenFound = [];
      for (const forbidden of FORBIDDEN_STRINGS) {
        if (forbidden === "24/7" || forbidden === "24x7" || forbidden === "Crown Brewing") {
          if (text.includes(forbidden)) {
            forbiddenFound.push(forbidden);
          }
        } else {
          if (htmlWithoutScripts.includes(forbidden)) {
            forbiddenFound.push(forbidden);
          }
        }
      }

      const pass =
        status === 200 &&
        h1Count === 1 &&
        hasTitle &&
        hasMetaDesc &&
        hasCanonical &&
        forbiddenFound.length === 0;

      results.push({
        route,
        status,
        h1Count,
        hasTitle,
        hasMetaDesc,
        hasCanonical,
        forbiddenFound,
        pass,
      });
    } catch (err) {
      results.push({
        route,
        status: "ERR",
        h1Count: 0,
        hasTitle: false,
        hasMetaDesc: false,
        hasCanonical: false,
        forbiddenFound: [err.message],
        pass: false,
      });
    }
  }

  return results;
}

// -------------------------------------------------------------
// Part 3: Pending Owner Inputs
// -------------------------------------------------------------
const PENDING_ITEMS = [
  { item: "PSARA Licence Number", field: "company.psaraLicenseNumber" },
  { item: "Tagline", field: "company.tagline" },
  { item: "Social Media Links", field: "company.socialLinks" },
  { item: "Google Maps Embed URL", field: "company.googleMapsEmbedUrl" },
  { item: "Working Days Schedule", field: "company.workingHours.workingDays" },
  { item: "Founder Photo & Message", field: "company.founder.photo / message" },
  { item: "Legal Registration (CIN)", field: "company.legal.cin" },
  { item: "Tax Registration (GSTIN)", field: "company.legal.gstin" },
  { item: "PSARA Validity Expiry Date", field: "company.legal.psaraValidUntil" },
  { item: "Real Facility Gallery Photos", field: "gallery[0..7].src" },
  { item: "Active Job Openings", field: "careers.openings" },
];

async function main() {
  console.log(`\n🚀 Running STRICON Prelaunch Verification Suite\n`);
  if (isStrict) {
    console.log(`[Mode: STRICT (Production Readiness)]\n`);
  }

  // 1. Config Checks
  const configResults = runConfigChecks();
  console.log("─".repeat(88));
  console.log(
    `| ${"Configuration / Environment Variable".padEnd(35)} | ${"Status".padEnd(8)} | ${"Details".padEnd(37)} |`
  );
  console.log("─".repeat(88));
  for (const c of configResults) {
    console.log(
      `| ${c.name.padEnd(35)} | ${c.status.padEnd(8)} | ${c.detail.slice(0, 37).padEnd(37)} |`
    );
  }
  console.log("─".repeat(88));

  // 2. Content Checks
  console.log(`\n📄 Verifying Live Pages against ${BASE_URL}\n`);
  const contentResults = await runContentChecks();
  console.log("─".repeat(96));
  console.log(
    `| ${"Route".padEnd(36)} | ${"HTTP".padEnd(5)} | ${"H1".padEnd(3)} | ${"Title".padEnd(6)} | ${"Desc".padEnd(5)} | ${"Canon".padEnd(6)} | ${"Result".padEnd(6)} | ${"Issues".padEnd(12)} |`
  );
  console.log("─".repeat(96));

  let hasContentFailure = false;
  for (const r of contentResults) {
    if (!r.pass) hasContentFailure = true;
    const issues = r.forbiddenFound.length
      ? `Found: ${r.forbiddenFound.join(",")}`
      : r.h1Count !== 1
      ? `H1 count: ${r.h1Count}`
      : "None";
    console.log(
      `| ${r.route.padEnd(36)} | ${String(r.status).padEnd(5)} | ${String(r.h1Count).padEnd(3)} | ${String(r.hasTitle).padEnd(6)} | ${String(r.hasMetaDesc).padEnd(5)} | ${String(r.hasCanonical).padEnd(6)} | ${(r.pass ? "PASS" : "FAIL").padEnd(6)} | ${issues.slice(0, 12).padEnd(12)} |`
    );
  }
  console.log("─".repeat(96));

  // 3. Pending from Owner (Informational)
  console.log(`\n📋 Pending from Owner (Informational, Blocks Hidden Gracefully):\n`);
  for (const p of PENDING_ITEMS) {
    console.log(`   • ${p.item.padEnd(30)} [${p.field}]`);
  }
  console.log("");

  const hasConfigFailure = isStrict && configResults.some((c) => c.status === "MISSING");

  if (hasContentFailure || hasConfigFailure) {
    console.error("❌ Prelaunch check failed: Please resolve the issues above before launch.\n");
    process.exit(1);
  } else {
    console.log("✅ Prelaunch verification passed: All pages and active configs are valid.\n");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Fatal prelaunch check error:", err);
  process.exit(1);
});
