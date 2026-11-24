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
- **Dependencies**: Keep lean. In Phase 2, `motion` (imported from `motion/react`) is installed. Do NOT install react-hook-form, zod, or shadcn/ui until instructed in later phases.

---

## 7. Phase 2: Home Page Standards

### Tokens & Surface Containers
- `--logo-surface`: `#FFFFFF` in both light and dark themes.
- `--logo-surface-foreground`: `#29283A` in both light and dark themes.
- All client logos and company emblem cards MUST be mounted inside a `--logo-surface` container to preserve logo contrast and integrity regardless of active site theme.

### Animation & Motion Guidelines
- Animation library: `motion` (imported from `motion/react`).
- Wrap animated pages with `<MotionProvider>` (`<MotionConfig reducedMotion="user">`).
- Animate ONLY opacity and transform (`y: 16` to `y: 0`, `opacity: 0` to `opacity: 1`). No layout-shifting properties.
- Duration between 0.4s and 0.6s with gentle easing (`easeOut`). No bouncing, spring overshoots, or parallax.
- Respect `prefers-reduced-motion` everywhere.

### Marquee Component Standards (`ClientsMarquee`)
- Two horizontal rows moving in opposite directions (row 1 left, row 2 right).
- 45s linear infinite loop using pure CSS keyframes (`translateX(0)` to `translateX(-50%)`).
- Seamless duplication with `aria-hidden="true"` on duplicate elements.
- Pause on hover and focus via CSS `.pause-animation` and `group-hover:[animation-play-state:paused]`.
- An explicit, accessible Pause/Play button with `aria-pressed` and dynamic `aria-label`.
- Edge fade masks on left and right borders with CSS gradients.
- Static grid fallback on reduced motion.

### Client Logos (Slide 7 Extraction)
- Client logos extracted directly from Slide 7 of `docs/STRICON_Profile.pptx`.
- Stored as WebP/PNG in `public/images/clients/<kebab-case>.png`.
- 17 approved enterprise clients with `displayApproved: true`.
- **Special Rule**: "Crown Brewing" MUST remain `displayApproved: false` until explicit stakeholder confirmation.

### Gallery Standards
- Data in `src/data/gallery.ts` (typed in `src/types/gallery.ts`).
- If all `src` values are `null` in production, the entire `GallerySection` must render `null` and remain hidden.
- In development, renders labeled neutral placeholders with category badges. Recommended asset dimensions: 1600px wide WebP/JPG.

---

## 8. Phase 3: Services & Navigation Standards

### Service Data Model (`src/data/services.ts`)
- 9 Canonical Slugs:
  - `security-services` (category: "security")
  - `housekeeping-janitorial`, `technical-services`, `pest-control-disinfection`, `horticulture-services`, `specialized-cleaning`, `food-vending-supplies` (category: "facility")
  - `support-staff-services`, `manpower-management` (category: "manpower")
- Fields per service:
  - `slug`: unique URL identifier
  - `title`: display name
  - `category`: `"security" | "facility" | "manpower"`
  - `icon`: Lucide icon component name
  - `shortSummary`: one-sentence concise summary
  - `intro`: two-sentence standardized factual intro
  - `includes`: string[] of specific offerings (empty array if profile lists no sub-items; hides "What's included")
  - `relatedSlugs`: 3 related service slugs for cross-linking
  - `image`: string | null (path `public/images/services/{slug}.jpg`), null by default
  - `faqs`: `{ q: string; a: string }[]`, empty array by default (hides FAQ section when empty)
  - `seoDescription`: under 160 characters for metadata
- Helpers: `getServiceBySlug`, `getServicesByCategory`, `getRelatedServices`, `getAdjacentServices`.
- Integrated Services: `integratedServices` array of all 16 integrated facility capabilities from profile.

### Shared Service Components (`src/components/services`)
- `ServiceCard`: Unified card extracted for use across Home and Services pages (icon tile, title, summary, tags, arrow link).
- `Breadcrumbs`: Accessible navigation with BreadcrumbList JSON-LD.
- `PageHero`: Compact page header with breadcrumbs and optional action/right-slot elements.
- `QuoteCard`: Direct consultation card linking to `/contact?service=slug`, phone, and prefilled WhatsApp.
- `ServiceSidebar`: Desktop sticky sidebar grouping all 9 services by category with active state highlight.
- `ServiceNav`: Previous and next service navigation cards at bottom of detail pages.

### Navigation & Linking Rules
- Header: Desktop dropdown disclosure pattern with keyboard navigation and mouse hover/click; mobile expandable accordion under Services link.
- Active states: Services menu link marked active on `/services` and `/services/[slug]`.
- Contact pre-selection: Links with `?service=<slug>` echo the service title under H1 within `<Suspense>`.
- Automated link crawler: Maintained in `scripts/check-links.mjs` and runnable via `npm run check:links`.

---

## 9. Phase 4: About Page & Deck Alignment Standards

### Exact-Copy Rule
- Every sentence or list item of body text on the About page (`/about`) and shared profile text MUST be the presentation deck's own words (`docs/STRICON_Profile.pptx`).
- Allowed edits only: fix double spaces, normalize straight vs curly apostrophes, and fix the obvious typo `"where ever"` to `"wherever"`.
- Short UI labels (section headings, "At a glance", button text) are permitted and must use the deck's own heading words wherever one exists.
- Forbidden words: `"leading"`, `"largest"`, `"No.1"`, `"premier"`, `"award"` (as a superlative/claim), `"ISO"`, `"24/7"`, `"24x7"`, `"100%"` (and `"best"` outside deck text).
- "Crown Brewing" MUST remain hidden (`displayApproved: false`) until explicit approval.

### Copy Audit Script (`scripts/audit-copy.mjs`)
- Automated verification script runnable via `npm run audit:copy`.
- Extracts all text runs from PPTX slide XMLs (`docs/.tmp`), normalizes whitespace/apostrophes/entities, and checks all 75 deck-derived strings in `src/data/profile.ts`.
- Exits with code 1 if any string is missing from the presentation deck corpus.

### Client Logo Display Rule
- All 18 client logos stored in `public/images/clients/` must be displayed in **FULL COLOUR** at all times.
- Zero grayscale conversion, zero hover-only colour filters, and zero opacity down-scaling.
- Always mounted on `--logo-surface` (`#FFFFFF`) cards to ensure contrast against both light and dark site themes.
- Approved clients without a logo file render cleanly as a text tile.

### Null-Hides-Block Rule
- If a block has no deck text and no stated data, do NOT build it. Unknown data = `null`, and the UI hides the block completely.
- `FounderCard`: Typographic card with initials avatar ("RVM"), name, role, bio. Photo rendered with `next/image` only if `photo !== null`; message blockquote rendered only if `message !== null`. Never invent quotes.
- `LicenceCompliancePanel`: Valid PSARA Licence badge, registered office address, and working hours. CIN, GSTIN, and PSARA validity fields rendered ONLY when not null.
- No empty placeholder boxes, stock photos, or mock certifications in production.

### Structured Data (`OrganizationJsonLd`)
- Implemented in `src/components/common/OrganizationJsonLd.tsx` and mounted on both `/` and `/about`.
- Includes legal name, alternate name STRICON, canonical URL, emblem logo, founding date "2025", founder, address, phone, email, and area served ("Hyderabad"). Omit null fields; no fake reviews/ratings.


---

## 11. Phase 6: Careers Page & Job Application Form Standards

### Careers Data Flow & API Architecture
- **Endpoint**: `/api/careers` (POST only, Node.js runtime).
- **Body & Header Constraints**:
  - Accepts both `application/json` (text-only) and `multipart/form-data` (applications with resume attachments).
  - Max request payload size: 3 MB. Requests exceeding 3 MB rejected with HTTP 413.
- **Same-Origin Verification**: Validates `Origin` header against `NEXT_PUBLIC_SITE_URL`, host header, or localhost in non-production environments (HTTP 403 on mismatch).
- **Bot Defense (Honeypot & Timing)**:
  - `website` honeypot field: must remain empty.
  - `startedAt` timestamp: rejects submissions completed in under 2.5 seconds or with invalid timestamps.
  - Returns fake success `{ ok: true }` with generated application reference without executing delivery when bot signals are detected.
- **Rate Limiting**:
  - Uses dedicated rate limit bucket (`bucket: "careers"`) in `src/lib/rate-limit.ts` (5 submissions per 10 minutes per IP).
  - Client IP extracted from `x-forwarded-for` (first hop) or fallback. Returns HTTP 429 when exhausted.
- **Application Reference Generation**:
  - Reference codes follow format `APP-YYYYMMDD-XXXX` (4 random alphanumeric characters).
- **Single-Line Field Sanitization**:
  - Single-line fields (name, phone, email, location, education) stripped of newline and tab control characters (`\r`, `\n`, `\t`).
  - Form field contents HTML-escaped before embedding into email notification templates.

### Strict Data Minimisation & Privacy Rules
- **Prohibited Data Collection**:
  - NEVER request, collect, or store Aadhaar numbers, PAN cards, dates of birth, candidate photos, or bank details.
  - Fields collected: Full Name, Phone (+91 10-digit mobile), Email (optional), Area of Interest, Experience level, Current Location / City, Highest Qualification / Education (optional), Brief Note / Message (optional, max 800 chars), Consent confirmation.
- **Zero Disk Writes**:
  - Uploaded resume files are NEVER written to the local disk, temporary directories, or database blobs.
  - Resumes are validated and held purely in-memory as Buffers and forwarded via base64 email attachment if Resend is configured.
  - Personal identifiable information (PII) and resume binaries are never logged in production console outputs.

### Resume Upload Feature Flag & In-Memory Validation
- **Feature Flag Control (`CAREERS_RESUME_UPLOAD`)**:
  - Configured via environment variable: `CAREERS_RESUME_UPLOAD=on` (enabled) or `off` (disabled).
  - Runtime check: `process.env.CAREERS_RESUME_UPLOAD === "on" && canForwardAttachments()`.
  - When disabled or when no real email attachment forwarding channel is configured:
    - The client application form hides the file upload input.
    - If a file is submitted via direct API calls when disabled, `/api/careers` returns HTTP 400 with `{ ok: false, error: "resume_disabled" }`.
- **In-Memory Magic Byte Validation (`src/lib/file-validation.ts`)**:
  - Max file size: 2 MB (`MAX_FILE_SIZE = 2 * 1024 * 1024`).
  - Extension allowlist: `.pdf`, `.doc`, `.docx`.
  - Magic byte verification:
    - **PDF**: Begins with `%PDF-` (`0x25, 0x50, 0x44, 0x46, 0x2D`).
    - **DOCX**: Begins with `PK\x03\x04` ZIP magic header and contains `[Content_Types].xml`.
    - **DOC**: Begins with `0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1` (OLECF header).
  - Executable binaries (e.g. `.exe`, `.bat`) and files with spoofed extensions are rejected with HTTP 400.
  - Filename sanitisation strips directory traversal characters (`../`, `..\`), non-printable characters, and limits filename length.

### Careers Multi-Channel Delivery Engine
- **Resend Email (`src/lib/email.ts`)**:
  - Recipient: `CAREERS_TO` (defaults to `info@stricon.in`).
  - Sender: `ENQUIRY_FROM`.
  - Reply-To: Applicant's email address if provided, otherwise sender address.
  - Attachment: In-memory Buffer converted to base64 string and forwarded via Resend attachments API.
  - Timeout: 10 seconds via native `AbortController`.
- **Webhook Delivery (`src/lib/webhook.ts`)**:
  - POSTs full application data with `type: "career_application"`.
  - Resume attachment is NOT sent in full over webhook for privacy and payload size limits; webhook receives resume metadata only (`filename`, `size`).
- **Production Guard**:
  - If only `log` delivery is configured in production (`NODE_ENV === "production"`), the API returns HTTP 503 (`not_configured`) to prevent lost candidate applications.

### Page Sections & Exact Deck Alignment
- **Hero & Welfare**:
  - PageHero displays corporate badge, headline, and deck alignment.
  - `RecruitmentStepper`: 7-step process from Slide 9 (responsive horizontal desktop / vertical mobile).
  - `EmployeeWelfare`: 6 welfare cards from Slide 10 with Lucide icons (On-time Salary, Medical Insurance, PF & ESIC Benefits, Safety & Uniform Kit, Career Progression, Welfare Support).
  - `HiringAndTraining`: 4 hiring strengths, 4 training strengths, and 5 continuous training topics from Slide 11.
- **Job Openings**:
  - Data-driven empty array `openings: []` in `src/data/careers.ts`.
  - Rendered with polite informative message ("Currently, there are no specific vacancies listed. However, we are always looking for dedicated professionals...") and a direct CTA button to the application form.
- **Application Form (`ApplicationForm.tsx`)**:
  - React Hook Form with Zod resolver (`careerSchema`), validating on blur and on change after error.
  - Supports both FormData multipart submissions (when resume is attached and enabled) and JSON submissions.
  - Full ARIA accessibility attributes (`aria-invalid`, `aria-describedby`, polite `aria-live` status announcement).
  - Character counter (0/800) for note/message field.
  - WhatsApp application fallback button with prefilled enquiry text for candidates who prefer direct mobile chat.
  - Accessible success confirmation screen with focus management.


### Contact Data Flow & API Architecture
- **Endpoint**: `/api/contact` (POST only, Node.js runtime).
- **Body & Header Constraints**: Requires `Content-Type: application/json`. Bodies exceeding 10 KB rejected with HTTP 413.
- **Same-Origin Verification**: Validates `Origin` header against `NEXT_PUBLIC_SITE_URL`, host header, or localhost in development (HTTP 403 on mismatch).
- **Bot Defense (Honeypot & Timing)**:
  - `website` honeypot field: must be empty.
  - `startedAt` timestamp: rejects requests submitted in under 2.5 seconds or with timestamps missing / in the future.
  - Returns fake success `{ ok: true }` without triggering delivery pipelines when bot signals are detected.
- **Rate Limiting**:
  - In-memory sliding window rate limiter in `src/lib/rate-limit.ts` (5 requests per 10 minutes per IP).
  - Uses client IP from `x-forwarded-for` (first hop) or fallback. Returns HTTP 429 when exhausted.
  - Documented: Serverless instances do not share memory; edge rate limiting recommended for distributed multi-region deployments.
- **Payload Sanitization & Reference Generation**:
  - Single-line fields stripped of control characters (`\r`, `\n`).
  - Reference numbers follow format `STR-YYYYMMDD-XXXX` (4 random alphanumeric characters).
  - User input HTML-escaped before embedding in email bodies.

### Multi-Channel Delivery Engine (`src/lib/delivery.ts`)
- **Configured via `ENQUIRY_DELIVERY`**: Comma-separated list of active channels (`log`, `resend`, `webhook`).
- **Resend (`src/lib/email.ts`)**:
  - Sends transactional emails via Resend API (`POST https://api.resend.com/emails`) using `RESEND_API_KEY`.
  - Recipient: `ENQUIRY_TO` (default `info@stricon.in`).
  - Sender: `ENQUIRY_FROM` (must be a verified domain in Resend).
  - Reply-To: Visitor's submitted email address.
  - Timeout: 10 seconds via native `AbortController`.
- **Webhook (`src/lib/webhook.ts`)**:
  - POSTs full JSON payload to `ENQUIRY_WEBHOOK_URL` with signature `secret: ENQUIRY_WEBHOOK_SECRET` for automated Google Sheets logging (e.g., via Google Apps Script).
  - Timeout: 10 seconds via native `AbortController`.
- **Log Mode (`log`)**:
  - Safe one-line summary in console (reference ID, service slug, masked phone).
  - **Critical Production Guard**: If only `log` is configured in production (`NODE_ENV === "production"`), the API returns HTTP 503 (`not_configured`) to prevent silent loss of customer enquiries.
- **Multi-channel Resilience**: Delivery succeeds if at least ONE real channel (Resend or Webhook) succeeds. A failing channel does not block remaining channels.

### Form UI & Accessibility (`QuoteForm.tsx` & `ContactInfoCards.tsx`)
- **Client Form Architecture**: React Hook Form with Zod resolver (`enquirySchema`), validating on blur and on change after error.
- **Accessibility & ARIA**:
  - All form controls have associated `<label>` elements, `aria-invalid`, and `aria-describedby` pointing to error messages.
  - First invalid field receives automatic focus on failed submission.
  - Live announcements via polite `aria-live` region.
  - Character counter (0/1000) for message field.
- **Layout & Token Usage**:
  - Two-column responsive layout (QuoteForm rendered first on mobile screens).
  - `--danger` (`#B91C1C` light, `#EF4444` dark) and `--danger-foreground` (`#FFFFFF`) used for error banners and field invalid states.
  - Gold submit button with charcoal text (`--accent-gold` and `--accent-gold-foreground`).
  - Secondary "Send via WhatsApp" button pre-populates message text and redirects to `wa.me`.
- **Success State**: Form replaced by accessible confirmation panel with reference number and focus-shifted heading.

### Strict Content & Operational Rules
- **No Response-Time Promises**: Never promise response times (e.g., "within 24 hours" is strictly forbidden). Copy only promises that STRICON will review and get in touch.
- **No Hardcoded Hex**: All colors must use CSS variables mapped in `globals.css`.
- **Deck-Verbatim Copy Audit Rule**: `scripts/audit-copy.mjs` tags text strings as `text` (must match PPTX XML runs verbatim) and image-only slides (Slide 9 recruitment steps, Slide 11 strengths) as `image` ("IMAGE (Slide X manual check)").
- **Background Server Rule**: Development (`next dev -p 3200`) and production (`next start -p 3100`) servers must ALWAYS run in the background (hidden processes), polled via HTTP until ready (max 60s), tested, and terminated immediately after test suites finish. Never run servers in the foreground.




