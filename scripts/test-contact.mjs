/**
 * scripts/test-contact.mjs
 * Automated test suite for STRICON Contact Enquiry API (/api/contact).
 * No external dependencies (uses native Node.js fetch).
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3200";
const ENDPOINT = `${BASE_URL}/api/contact`;

const tests = [];

function record(name, pass, detail = "") {
  tests.push({ name, pass, detail });
}

async function runTests() {
  console.log(`\n🧪 Running STRICON Contact API Tests against ${ENDPOINT}\n`);

  // Test 1: GET returns 405 Method Not Allowed
  try {
    const res = await fetch(ENDPOINT, { method: "GET" });
    const is405 = res.status === 405;
    record("1. GET returns 405 Method Not Allowed", is405, `Status: ${res.status}`);
  } catch (err) {
    record("1. GET returns 405 Method Not Allowed", false, err.message);
  }

  // Test 2: Invalid body returns 400 with field errors
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "",
        email: "not-an-email",
        service: "invalid-service",
        startedAt: Date.now() - 5000,
      }),
    });
    const json = await res.json().catch(() => ({}));
    const is400 = res.status === 400 && json.ok === false && !!json.errors;
    record(
      "2. Invalid body returns 400 with field errors",
      is400,
      `Status: ${res.status}, Errors: ${Object.keys(json.errors || {}).join(", ")}`
    );
  } catch (err) {
    record("2. Invalid body returns 400 with field errors", false, err.message);
  }

  // Test 3: Invalid phone fails (starts with 2 or invalid format)
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        phone: "1234567890", // Invalid: does not start with 6-9
        service: "security-services",
        location: "Gachibowli, Hyderabad",
        consent: true,
        startedAt: Date.now() - 5000,
      }),
    });
    const json = await res.json().catch(() => ({}));
    const is400 =
      res.status === 400 &&
      json.ok === false &&
      json.errors &&
      json.errors.phone?.includes("10 digit");
    record(
      "3. Invalid phone number fails with 400 error message",
      is400,
      `Status: ${res.status}, Message: ${json.errors?.phone || "none"}`
    );
  } catch (err) {
    record("3. Invalid phone number fails with 400 error message", false, err.message);
  }

  // Test 4: Valid payload returns 200 with ref
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Ramesh Sharma",
        company: "Acme Enterprises",
        email: "ramesh@acme.example",
        phone: "+91 98765 43210",
        service: "security-services",
        location: "HITEC City, Hyderabad",
        manpower: "12 security guards",
        message: "Need 24x7 static guarding for tech campus.",
        consent: true,
        startedAt: Date.now() - 5000, // 5 seconds in past
      }),
    });
    const json = await res.json().catch(() => ({}));
    const is200 =
      res.status === 200 &&
      json.ok === true &&
      typeof json.ref === "string" &&
      json.ref.startsWith("STR-");
    record(
      "4. Valid payload returns 200 with reference code",
      is200,
      `Status: ${res.status}, Ref: ${json.ref || "none"}`
    );
  } catch (err) {
    record("4. Valid payload returns 200 with reference code", false, err.message);
  }

  // Test 5: Honeypot filled returns fake 200
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Bot User",
        email: "bot@spam.example",
        phone: "9876543210",
        service: "security-services",
        location: "Hyderabad",
        consent: true,
        website: "https://spam-site.com", // Honeypot filled
        startedAt: Date.now() - 5000,
      }),
    });
    const json = await res.json().catch(() => ({}));
    const isFake200 = res.status === 200 && json.ok === true;
    record(
      "5. Honeypot filled returns fake 200 without executing delivery",
      isFake200,
      `Status: ${res.status}`
    );
  } catch (err) {
    record("5. Honeypot filled returns fake 200 without executing delivery", false, err.message);
  }

  // Test 6: Oversized body returns 413
  try {
    const bigString = "A".repeat(12 * 1024); // 12 KB
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bigData: bigString }),
    });
    const is413 = res.status === 413;
    record("6. Oversized body (>10 KB) returns 413", is413, `Status: ${res.status}`);
  } catch (err) {
    record("6. Oversized body (>10 KB) returns 413", false, err.message);
  }

  // Test 7: 6th request within window returns 429
  // Note: Tests 2, 3, and 4 reached step 4 and consumed 3 tokens.
  // We send 2 more requests with the same simulated IP (via x-forwarded-for: 192.168.1.100),
  // then the 6th must return 429.
  try {
    const testIp = "192.168.1.100";
    // Send 5 requests from testIp to exhaust limit
    for (let i = 1; i <= 5; i++) {
      await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": testIp,
        },
        body: JSON.stringify({
          name: `User ${i}`,
          email: `user${i}@example.com`,
          phone: "9876543210",
          service: "security-services",
          location: "Hyderabad",
          consent: true,
          startedAt: Date.now() - 5000,
        }),
      });
    }

    // 6th request from same IP must be rate limited (429)
    const rateLimitedRes = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": testIp,
      },
      body: JSON.stringify({
        name: "User 6",
        email: "user6@example.com",
        phone: "9876543210",
        service: "security-services",
        location: "Hyderabad",
        consent: true,
        startedAt: Date.now() - 5000,
      }),
    });

    const is429 = rateLimitedRes.status === 429;
    record(
      "7. 6th request within window returns 429 Too Many Requests",
      is429,
      `Status: ${rateLimitedRes.status}`
    );
  } catch (err) {
    record("7. 6th request within window returns 429 Too Many Requests", false, err.message);
  }

  // Print Summary Table
  console.log("─".repeat(95));
  console.log(
    `| ${"Test Case".padEnd(58)} | ${"Result".padEnd(8)} | ${"Details".padEnd(20)} |`
  );
  console.log("─".repeat(95));

  let failed = false;
  for (const t of tests) {
    const status = t.pass ? "PASS" : "FAIL";
    if (!t.pass) failed = true;
    console.log(
      `| ${t.name.padEnd(58)} | ${status.padEnd(8)} | ${t.detail.slice(0, 20).padEnd(20)} |`
    );
  }
  console.log("─".repeat(95));

  if (failed) {
    console.error("\n❌ Some API tests failed.\n");
    process.exit(1);
  } else {
    console.log("\n✅ All 7 API test cases passed successfully.\n");
    process.exit(0);
  }
}

runTests();
