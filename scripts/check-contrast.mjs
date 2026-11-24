/**
 * scripts/check-contrast.mjs
 * Computes WCAG contrast ratios for required theme token pairs in both light and dark themes.
 * Zero external dependencies.
 */

import fs from "fs";
import path from "path";

function parseVariables(cssContent) {
  const rootMatch = cssContent.match(/:root\s*\{([^}]+)\}/);
  const darkMatch = cssContent.match(/\.dark\s*\{([^}]+)\}/);

  if (!rootMatch || !darkMatch) {
    throw new Error("Could not find :root or .dark blocks in globals.css");
  }

  const parseBlock = (block) => {
    const vars = {};
    const lines = block.split(";");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("--")) {
        const [k, v] = trimmed.split(":").map((s) => s.trim());
        if (k && v) {
          vars[k] = v;
        }
      }
    }
    return vars;
  };

  return {
    light: parseBlock(rootMatch[1]),
    dark: parseBlock(darkMatch[1]),
  };
}

function colorToRgb(val) {
  const clean = val.trim();
  if (clean.startsWith("rgba") || clean.startsWith("rgb")) {
    const m = clean.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (m) {
      return {
        r: parseInt(m[1], 10),
        g: parseInt(m[2], 10),
        b: parseInt(m[3], 10),
      };
    }
  }
  return hexToRgb(clean);
}

function hexToRgb(hex) {
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function getLuminance(color) {
  const { r, g, b } = colorToRgb(color);
  const sRGB = [r / 255, g / 255, b / 255];
  const linear = sRGB.map((c) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (brighter + 0.05) / (darker + 0.05);
}

const REQUIRED_PAIRS = [
  { fg: "--foreground", bg: "--background", label: "foreground / background" },
  { fg: "--foreground", bg: "--surface", label: "foreground / surface" },
  {
    fg: "--muted-foreground",
    bg: "--background",
    label: "muted-foreground / background",
  },
  {
    fg: "--muted-foreground",
    bg: "--surface",
    label: "muted-foreground / surface",
  },
  {
    fg: "--primary-foreground",
    bg: "--primary",
    label: "primary-foreground / primary",
  },
  {
    fg: "--secondary-foreground",
    bg: "--secondary",
    label: "secondary-foreground / secondary",
  },
  {
    fg: "--accent-gold-foreground",
    bg: "--accent-gold",
    label: "accent-gold-foreground / accent-gold",
  },
  { fg: "--danger", bg: "--background", label: "danger / background" },
  { fg: "--danger", bg: "--surface", label: "danger / surface" },
  {
    fg: "--whatsapp-foreground",
    bg: "--whatsapp",
    label: "whatsapp-foreground / whatsapp",
  },
  {
    fg: "--overlay-foreground",
    bg: "--overlay",
    label: "overlay-foreground / overlay",
  },
];

async function main() {
  const cssPath = path.join(process.cwd(), "src", "app", "globals.css");
  const cssContent = fs.readFileSync(cssPath, "utf-8");
  const { light, dark } = parseVariables(cssContent);

  const results = [];
  let hasFailure = false;

  for (const theme of ["light", "dark"]) {
    const tokens = theme === "light" ? light : dark;

    for (const pair of REQUIRED_PAIRS) {
      const fgHex = tokens[pair.fg];
      const bgHex = tokens[pair.bg];

      if (!fgHex || !bgHex) {
        results.push({
          pair: pair.label,
          theme,
          ratio: "N/A",
          pass: false,
          detail: `Missing ${!fgHex ? pair.fg : pair.bg}`,
        });
        hasFailure = true;
        continue;
      }

      const ratio = getContrastRatio(fgHex, bgHex);
      const pass = ratio >= 4.5;
      if (!pass) hasFailure = true;

      results.push({
        pair: pair.label,
        theme,
        ratio: ratio.toFixed(2) + ":1",
        pass,
        detail: `${fgHex} on ${bgHex}`,
      });
    }
  }

  // Print Formatted Table
  console.log("\n🎨 STRICON WCAG Contrast Ratio Audit\n");
  console.log("─".repeat(82));
  console.log(
    `| ${"Color Token Pair".padEnd(38)} | ${"Theme".padEnd(7)} | ${"Ratio".padEnd(8)} | ${"Result".padEnd(6)} | ${"Values".padEnd(11)} |`
  );
  console.log("─".repeat(82));

  for (const r of results) {
    const status = r.pass ? "PASS" : "FAIL";
    console.log(
      `| ${r.pair.padEnd(38)} | ${r.theme.padEnd(7)} | ${r.ratio.padEnd(8)} | ${status.padEnd(6)} | ${r.detail.padEnd(11)} |`
    );
  }
  console.log("─".repeat(82));

  if (hasFailure) {
    console.error(
      "\n❌ Some color token pairs do not meet the WCAG AA threshold of 4.5:1.\n"
    );
    process.exit(1);
  } else {
    console.log(
      `\n✅ All ${results.length} evaluated token pairs meet or exceed the WCAG AA requirement (>= 4.5:1).\n`
    );
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
