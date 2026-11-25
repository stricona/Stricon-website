#!/usr/bin/env node
/**
 * STRICON Website - Copy Safeguard Script
 *
 * Scans user-facing strings in src/ for forbidden marketing hype, placeholder text,
 * and unsubstantiated claims.
 *
 * Forbidden terms:
 * - "leading" (as standalone copy, excluding Tailwind line-height classes like `leading-*`)
 * - "largest"
 * - "No.1" / "No. 1" / "#1"
 * - "premier"
 * - "award" / "awards" (excluding the Lucide `Award` icon component)
 * - "ISO"
 * - "24/7" / "24x7"
 * - "100%"
 * - "Lorem"
 * - "TODO"
 *
 * ALLOWLIST DOCUMENTATION:
 * 1. Teamwork Deck Statement:
 *    "We believe that teamwork is essential for achieving the best results." (from STRICON Company Profile deck)
 * 2. Quarantined Pending Confirmation Drafts:
 *    `claim24x7Monitoring: "24x7 Monitoring with QRT Support"` inside `src/data/company.ts` is explicitly
 *    isolated under `pendingConfirmation` and never rendered on any public page.
 * 3. Tailwind CSS line-height utility classes:
 *    Matches like `leading-relaxed`, `leading-tight`, `leading-none`, `leading-6`, `leading-normal`.
 * 4. Lucide React Icon identifiers:
 *    Imports, references, or JSX tags for `<Award ... />` icon from `lucide-react`.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_DIR = path.resolve(__dirname, '..', 'src');

const FORBIDDEN_RULES = [
  { term: 'leading', regex: /\bleading\b(?!-)/i },
  { term: 'largest', regex: /\blargest\b/i },
  { term: 'No.1', regex: /\bno\.?\s*1\b|#1\b/i },
  { term: 'premier', regex: /\bpremier\b/i },
  { term: 'award', regex: /\bawards?\b/i },
  { term: 'ISO', regex: /\biso\b/i },
  { term: '24/7', regex: /24\/7/i },
  { term: '24x7', regex: /\b24x7\b/i },
  { term: '100%', regex: /100%/i },
  { term: 'Lorem', regex: /\blorem\b/i },
  { term: 'TODO', regex: /\btodo\b/i },
];

const ALLOWLIST_STRINGS = [
  // Official Teamwork sentence preserved from deck
  'We believe that teamwork is essential for achieving the best results.',
  // Quarantined unrendered claim inside src/data/company.ts pendingConfirmation block
  'claim24x7Monitoring',
  '24x7 Monitoring with QRT Support',
];

function getAllFiles(dir, exts = ['.ts', '.tsx', '.js', '.jsx', '.json']) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, exts));
    } else if (exts.includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];
  const relPath = path.relative(path.resolve(__dirname, '..'), filePath).replace(/\\/g, '/');

  // Strip block comments for line-by-line inspection
  let cleanContent = content.replace(/\/\*[\s\S]*?\*\//g, (match) => {
    return '\n'.repeat((match.match(/\n/g) || []).length);
  });

  const lines = cleanContent.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    let trimmed = line.trim();

    // Skip single-line comments
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return;
    }
    // Remove inline comment at end of line
    const commentIdx = trimmed.indexOf('//');
    if (commentIdx !== -1) {
      trimmed = trimmed.slice(0, commentIdx).trim();
    }

    // Skip import statements
    if (/^\s*import\s/.test(trimmed)) {
      return;
    }

    // Check allowlisted phrases
    for (const allowed of ALLOWLIST_STRINGS) {
      if (trimmed.includes(allowed)) {
        return;
      }
    }

    // Filter out Tailwind class strings containing leading-* (e.g., class="leading-relaxed")
    let checkText = trimmed.replace(/leading-[a-z0-9]+/gi, '');

    // Filter out CSS styling percentages (width: 100%, height="100%", @keyframes 0%, 100% {, style="width: 100%")
    checkText = checkText
      .replace(/(?:width|height|max-width|min-width|flex-basis|size)\s*[:=]\s*["']?\s*100%\s*["']?/gi, '')
      .replace(/style=.*?100%.*?/gi, '')
      .replace(/[0-9]+%\s*,\s*100%\s*\{/gi, '')
      .replace(/100%\s*\{/gi, '');

    // If award is matched, check if it's purely the Lucide icon reference <Award ... or Award, or Award:
    // (e.g. `Excellence: Award`, `<Award className=...`, `Award}`)
    const isOnlyAwardIcon = (text) => {
      const stripped = text
        .replace(/<Award\b/g, '')
        .replace(/\bAward\b/g, '')
        .replace(/Award/g, '');
      return !/\bawards?\b/i.test(stripped);
    };

    for (const rule of FORBIDDEN_RULES) {
      if (rule.regex.test(checkText)) {
        if (rule.term === 'award' && isOnlyAwardIcon(checkText)) {
          continue;
        }
        violations.push({
          File: relPath,
          Line: lineNum,
          Term: rule.term,
          Snippet: trimmed.length > 80 ? trimmed.slice(0, 77) + '...' : trimmed,
        });
      }
    }
  });

  return violations;
}

function run() {
  console.log('Running STRICON Copy Safeguard Check on src/...\n');
  const files = getAllFiles(SRC_DIR);
  const allViolations = [];

  for (const file of files) {
    const violations = checkFile(file);
    allViolations.push(...violations);
  }

  if (allViolations.length > 0) {
    console.error(`FAILED: Found ${allViolations.length} forbidden copy violation(s):\n`);
    console.table(allViolations);
    process.exit(1);
  } else {
    console.log('SUCCESS: All copy checks passed (0 forbidden terms found).\n');
    console.table([
      { Status: 'PASSED', FilesScanned: files.length, Violations: 0, Message: 'No forbidden terms detected' },
    ]);
    process.exit(0);
  }
}

run();
