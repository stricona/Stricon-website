/**
 * scripts/test-careers.mjs
 * Automated test suite for STRICON Careers Application API (/api/careers).
 * No external dependencies (uses native Node.js fetch and FormData).
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3200";
const ENDPOINT = `${BASE_URL}/api/careers`;

const tests = [];

function record(name, pass, detail = "") {
  tests.push({ name, pass, detail });
}

// Minimal valid PDF binary buffer
const VALID_PDF_BUFFER = Buffer.from(
  "%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R >>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \ntrailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n164\n%%EOF\n"
);

async function runTests() {
  console.log(`\n🧪 Running STRICON Careers API Tests against ${ENDPOINT}\n`);

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
        area: "invalid-area",
        experience: "invalid-exp",
        location: "",
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

  // Test 3: Invalid phone fails (starts with 2)
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Suresh Kumar",
        email: "suresh@example.com",
        phone: "1234567890",
        area: "security-services",
        experience: "1 to 3 years",
        location: "Kukatpally, Hyderabad",
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
      "3. Invalid phone fails with 400 error message",
      is400,
      `Status: ${res.status}, Message: ${json.errors?.phone || "none"}`
    );
  } catch (err) {
    record("3. Invalid phone fails with 400 error message", false, err.message);
  }

  // Test 4: Valid payload without file returns 200 with ref
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Vikram Reddy",
        email: "vikram@example.com",
        phone: "+91 98765 43210",
        area: "security-services",
        experience: "3 to 5 years",
        location: "Madhapur, Hyderabad",
        education: "Graduate",
        message: "Applying for security supervisor opening.",
        consent: true,
        startedAt: Date.now() - 5000,
      }),
    });
    const json = await res.json().catch(() => ({}));
    const is200 =
      res.status === 200 &&
      json.ok === true &&
      typeof json.ref === "string" &&
      json.ref.startsWith("APP-");
    record(
      "4. Valid JSON returns 200 with APP- reference code",
      is200,
      `Status: ${res.status}, Ref: ${json.ref || "none"}`
    );
  } catch (err) {
    record("4. Valid JSON returns 200 with APP- reference code", false, err.message);
  }

  // Test 5: Valid multipart with genuine small PDF returns 200
  try {
    const formData = new FormData();
    formData.append("name", "Ananya Rao");
    formData.append("phone", "9123456789");
    formData.append("email", "ananya@example.com");
    formData.append("area", "housekeeping-janitorial");
    formData.append("experience", "Fresher");
    formData.append("location", "Banjara Hills, Hyderabad");
    formData.append("consent", "true");
    formData.append("startedAt", (Date.now() - 5000).toString());

    const blob = new Blob([VALID_PDF_BUFFER], { type: "application/pdf" });
    formData.append("resume", blob, "ananya_resume.pdf");

    const res = await fetch(ENDPOINT, {
      method: "POST",
      body: formData,
    });
    const json = await res.json().catch(() => ({}));
    const is200 =
      res.status === 200 &&
      json.ok === true &&
      typeof json.ref === "string" &&
      json.ref.startsWith("APP-");
    record(
      "5. Valid multipart with genuine small PDF returns 200",
      is200,
      `Status: ${res.status}, Ref: ${json.ref || "none"}`
    );
  } catch (err) {
    record("5. Valid multipart with genuine small PDF returns 200", false, err.message);
  }

  // Test 6: File named .pdf whose bytes are NOT a PDF returns 400
  try {
    const formData = new FormData();
    formData.append("name", "Fake Pdf User");
    formData.append("phone", "9876543210");
    formData.append("area", "technical-services");
    formData.append("experience", "1 to 3 years");
    formData.append("location", "Hyderabad");
    formData.append("consent", "true");
    formData.append("startedAt", (Date.now() - 5000).toString());

    // Fake bytes: text content instead of PDF magic bytes
    const fakeBuffer = Buffer.from("THIS IS NOT A VALID PDF FILE AT ALL");
    const blob = new Blob([fakeBuffer], { type: "application/pdf" });
    formData.append("resume", blob, "fake.pdf");

    const res = await fetch(ENDPOINT, {
      method: "POST",
      body: formData,
    });
    const json = await res.json().catch(() => ({}));
    const is400 = res.status === 400 && json.errors && !!json.errors.resume;
    record(
      "6. File named .pdf with invalid magic bytes returns 400",
      is400,
      `Status: ${res.status}, Error: ${json.errors?.resume || "none"}`
    );
  } catch (err) {
    record("6. File named .pdf with invalid magic bytes returns 400", false, err.message);
  }

  // Test 7: Executable .exe file returns 400
  try {
    const formData = new FormData();
    formData.append("name", "Malware Tester");
    formData.append("phone", "9876543210");
    formData.append("area", "technical-services");
    formData.append("experience", "1 to 3 years");
    formData.append("location", "Hyderabad");
    formData.append("consent", "true");
    formData.append("startedAt", (Date.now() - 5000).toString());

    const exeBuffer = Buffer.from("MZ\x90\x00\x03\x00\x00\x00");
    const blob = new Blob([exeBuffer], { type: "application/x-msdownload" });
    formData.append("resume", blob, "malware.exe");

    const res = await fetch(ENDPOINT, {
      method: "POST",
      body: formData,
    });
    const json = await res.json().catch(() => ({}));
    const is400 = res.status === 400 && json.errors && !!json.errors.resume;
    record(
      "7. Executable file (.exe) returns 400 error",
      is400,
      `Status: ${res.status}, Error: ${json.errors?.resume || "none"}`
    );
  } catch (err) {
    record("7. Executable file (.exe) returns 400 error", false, err.message);
  }

  // Test 8: File over 2 MB returns 400 or 413
  try {
    const formData = new FormData();
    formData.append("name", "Big File User");
    formData.append("phone", "9876543210");
    formData.append("area", "technical-services");
    formData.append("experience", "1 to 3 years");
    formData.append("location", "Hyderabad");
    formData.append("consent", "true");
    formData.append("startedAt", (Date.now() - 5000).toString());

    // 2.2 MB buffer
    const bigBuffer = Buffer.alloc(2.2 * 1024 * 1024, 0x20);
    bigBuffer[0] = 0x25;
    bigBuffer[1] = 0x50;
    bigBuffer[2] = 0x44;
    bigBuffer[3] = 0x46;
    bigBuffer[4] = 0x2d;

    const blob = new Blob([bigBuffer], { type: "application/pdf" });
    formData.append("resume", blob, "large.pdf");

    const res = await fetch(ENDPOINT, {
      method: "POST",
      body: formData,
    });
    const isError = res.status === 400 || res.status === 413;
    record(
      "8. File over 2 MB returns 400 or 413",
      isError,
      `Status: ${res.status}`
    );
  } catch (err) {
    record("8. File over 2 MB returns 400 or 413", false, err.message);
  }

  // Test 9: Honeypot returns fake 200
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Bot User",
        email: "bot@example.com",
        phone: "9876543210",
        area: "security-services",
        experience: "Fresher",
        location: "Hyderabad",
        consent: true,
        website: "https://spammer.example",
        startedAt: Date.now() - 5000,
      }),
    });
    const json = await res.json().catch(() => ({}));
    const isFake200 = res.status === 200 && json.ok === true;
    record(
      "9. Honeypot filled returns fake 200 without delivery",
      isFake200,
      `Status: ${res.status}`
    );
  } catch (err) {
    record("9. Honeypot filled returns fake 200 without delivery", false, err.message);
  }

  // Test 10: 6th request within window returns 429
  try {
    const testIp = "192.168.2.200";
    for (let i = 1; i <= 5; i++) {
      await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": testIp,
        },
        body: JSON.stringify({
          name: `Career Applicant ${i}`,
          phone: "9876543210",
          area: "security-services",
          experience: "Fresher",
          location: "Hyderabad",
          consent: true,
          startedAt: Date.now() - 5000,
        }),
      });
    }

    const rateLimitedRes = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": testIp,
      },
      body: JSON.stringify({
        name: "Career Applicant 6",
        phone: "9876543210",
        area: "security-services",
        experience: "Fresher",
        location: "Hyderabad",
        consent: true,
        startedAt: Date.now() - 5000,
      }),
    });

    const is429 = rateLimitedRes.status === 429;
    record(
      "10. 6th request in window returns 429 Too Many Requests",
      is429,
      `Status: ${rateLimitedRes.status}`
    );
  } catch (err) {
    record("10. 6th request in window returns 429 Too Many Requests", false, err.message);
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
    console.error("\n❌ Some Careers API tests failed.\n");
    process.exit(1);
  } else {
    console.log("\n✅ All 10 Careers API test cases passed successfully.\n");
    process.exit(0);
  }
}

runTests();
