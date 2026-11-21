<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# STRICON Website – Development Guidelines & Architecture (AGENTS.md)

This document serves as the persistent guide and strict single source of architectural standards for the STRICON website project. All future development, prompt iterations, and subagent work MUST adhere to these rules.

---

## 1. Company Information (Single Source of Truth)

All company details, office addresses, contact information, leadership details, and operational facts are stored **ONLY** in:
- `src/data/company.ts` (typed in `src/types/company.ts`)
- `src/config/site.ts` (re-exports for metadata & config)

**Never hardcode company details in components or pages.** Always import from `@/data/company` or `@/config/site`.

### Core Facts
- **Legal Name**: STRICON PEOPLE & SECURITY SERVICES PVT LTD
- **Brand Name**: STRICON
- **Entity Type**: Private Limited | **Established**: 2025
- **Founder / Managing Director**: R Vishnu Murthy (veteran, experienced in facility management services)
- **Description**: Facility Management & Security Services Provider with valid PSARA Licence.
- **Registered & Corporate Office**: 4th Floor, H No: 12-2-563/38, Gudimalkapur, Mehdipatnam, Hyderabad, Telangana - 500028
- **Phone / WhatsApp**: +91 89781 07573 (`8978107573`)
- **Email**: info@stricon.in (general, sales, and HR)
- **Website**: https://www.stricon.in
- **Working Hours**: 9:00 AM to 7:00 PM

### Unknown & Pending Confirmation Rules
1. **Fields currently null**:
   - `psaraLicenseNumber`: `null`
   - `tagline`: `null`
   - `socialLinks`: `null`
   - `googleMapsEmbedUrl`: `null`
   - `workingDays`: `null`
   *Rule: When null, render NOTHING in the UI. Do not invent placeholders or mock values.*
2. **Pending Confirmation (Must NOT appear in UI or metadata)**:
   - `alternateAddress` ("6th floor, Awfis, N-Heights, Plot no 38, Phase 2, HITEC City, Hyderabad, Telangana 500081")
   - `claim24x7Monitoring` ("24x7 Monitoring with QRT Support")
   *Rule: Stored exclusively under `company.pendingConfirmation` in `src/data/company.ts`. Never render.*

---

## 2. Content & Brand Rules

- **NO 24/7 Claim**: Do NOT claim 24/7 support, 24/7 monitoring, or a 24/7 control room anywhere in copy.
- **NO Invented Claims**: Do NOT invent statistics, client names, certifications, testimonials, years of experience, awards, or service claims.
- **PSARA Licence**: Mention only as a valid PSARA licensed provider (no license number until confirmed).
- **Client Logos & Names**:
  - Client data is stored in `src/data/clients.ts` with `displayApproved: false` and `logo: null`.
  - **Do NOT render clients anywhere** until `displayApproved` is set to `true` AND an approved logo file exists.
  - Allowed industry deployment statement:
    *"We have well-trained personnel deployed at healthcare centres, IT, ITES, hotels, commercial, manufacturing and large residential apartments and villa complexes in Hyderabad."*

---

## 3. Colour System & Tokens

Colours are mapped in `src/app/globals.css` with CSS variables and exposed to Tailwind via `@theme inline`:

### Light Theme
- `--background`: `#F7F6F1`
- `--surface`: `#FFFFFF`
- `--foreground`: `#29283A`
- `--muted-foreground`: `#686879`
- `--primary`: `#494B98` | `--primary-foreground`: `#FFFFFF`
- `--secondary`: `#178C83` | `--secondary-foreground`: `#FFFFFF` (WCAG AA: darkened for small text if needed)
- `--accent-gold`: `#E4B94F` | `--accent-gold-foreground`: `#29283A`
- `--border`: `#E7E5DE`

### Dark Theme
- `--background`: `#191923`
- `--surface`: `#222230`
- `--foreground`: `#F5F4FA`
- `--muted-foreground`: `#B7B5C7`
- `--primary`: `#7779CC` | `--primary-foreground`: `#14141F`
- `--secondary`: `#36B5A5` | `--secondary-foreground`: `#14141F`
- `--accent-gold`: `#E4B94F` | `--accent-gold-foreground`: `#29283A`
- `--border`: `#383747`

### Usage Rules
- **Primary Indigo**: Links, heading accents, main buttons, key icons.
- **Gold**: "Get a Quote" CTA button and subtle highlights only. Text on gold MUST ALWAYS be charcoal (`#29283A`), never white.
- **Teal**: Icons, borders, badges, large text. Avoid small teal text on light backgrounds to preserve WCAG AA contrast.
- **No hardcoded HEX colours** in JSX/TSX. Always use CSS variables / Tailwind tokens (`var(--color-primary)`, etc.).

---

## 4. Typography

- **Headings**: `Poppins` (weights 500, 600, 700), mapped to `--font-poppins` and `font-heading`.
- **Body**: `Inter` (weights 400, 500, 600), mapped to `--font-inter` and `font-sans`.
- Loaded via `next/font/google` with `display: swap`.
- Base body size minimum 16px with comfortable line height (1.6).

---

## 5. Logo Guidelines

Original files reside in `public/images/logo/`:
- `wordmark.jpg` – Header and footer wordmark.
- `symbol.jpg` – Favicon / app icon and compact branding.
- `emblem.jpg` – Shield emblem for Open Graph and high-impact branding.

### Logo Rules
- Maintain original aspect ratio without distortion, stretching, cropping, or recoloring.
- **Dark Theme Wordmark Rule**: The wordmark is dark indigo. In dark theme, it MUST be wrapped inside a small white rounded container (`dark:bg-white dark:px-2 dark:py-1 dark:rounded-md`) unless a light wordmark variant (`wordmark-light.*`) is provided.
- Do NOT extract or reuse raster graphics from company PowerPoint slides.

---

## 6. Coding & Architectural Standards

- **Next.js 16 App Router** with `src/` directory.
- **Strict TypeScript**: zero `any`, strictly typed data and props.
- **Server Components by default**:
  - Add `"use client"` only for components requiring browser APIs, state, or event listeners (e.g., `MobileMenu.tsx`, `ThemeToggle.tsx`, `ThemeProvider.tsx`).
- **Accessibility (a11y)**:
  - Skip to content link (`#main-content`).
  - Semantic HTML5 landmark tags (`<header>`, `<nav>`, `<main>`, `<footer>`, `<address>`).
  - Focus trap, Escape key dismiss, body scroll lock, and ARIA attributes on mobile menu.
  - Visible focus indicators (`:focus-visible`).
  - Respect `prefers-reduced-motion`.
- **Theme Support**: `next-themes` with `attribute="class"`, default light, no hydration mismatch (`mounted` check in toggle, `suppressHydrationWarning` on `<html>`).
- **Dependencies**: Keep lean. Do NOT install framer-motion, react-hook-form, zod, or shadcn/ui until instructed in later phases.
