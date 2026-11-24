# STRICON Corporate Website

Official corporate website for **STRICON PEOPLE & SECURITY SERVICES PVT LTD** (Brand: STRICON), a professional Facility Management and Security Services provider in Hyderabad, Telangana, India.

---

## 1. Local Run & NPM Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start local Next.js development server (default port 3000). |
| `npm run build` | Build optimized production bundle using Turbopack compiler. |
| `npm run start` | Run production server locally after running `build`. |
| `npm run lint` | Run ESLint across all codebase files (0 errors, 0 warnings enforced). |
| `npm run audit:copy` | Verbatim text audit matching all 44 slide text runs against the official deck. |
| `npm run check:links` | Automated crawler validating all 25 internal routes (status 200) and 404 handler. |
| `npm run test:contact` | Automated 7-case test suite for `/api/contact` enquiry submission. |
| `npm run test:careers` | Automated 10-case test suite for `/api/careers` application and file upload. |
| `npm run check:contrast` | Computes WCAG contrast ratios for all 22 theme token pairs (light & dark). |
| `npm run prelaunch` | Prelaunch verification checking environment variables and live HTML/SEO integrity. |
| `npm run gallery:import` | Imports raw photos from `gallery-inbox/`, strips EXIF/GPS, resizes to <=1800px, converts to WebP, and syncs data. |
| `npm run gallery:sync` | Scans `public/images/gallery/` and regenerates `src/data/gallery.generated.json` with blur data URLs. |

---

## 2. Environment Variables

Configure these variables in your deployment platform (e.g. Vercel Project Settings) or `.env.local` for local development:

| Variable | Description | Example | Required? |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical public URL used for SEO, metadata, sitemaps, and origin checks. | `https://www.stricon.in` | **Yes (Prod)** |
| `ALLOW_INDEXING` | Production search engine indexing guard (`true` allows indexing, `false` blocks robots). | `true` | **Yes (Prod)** |
| `ENQUIRY_DELIVERY` | Active delivery channels for quote requests (`log`, `resend`, `webhook`). | `resend,webhook` | **Yes (Prod)** |
| `ENQUIRY_TO` | Target email address receiving quote requests. | `info@stricon.in` | **Yes (Prod)** |
| `ENQUIRY_FROM` | Verified sender email address in Resend. | `STRICON <contact@stricon.in>` | If Resend active |
| `RESEND_API_KEY` | API authentication key for Resend transactional email delivery. | `re_123456789...` | If Resend active |
| `ENQUIRY_WEBHOOK_URL` | Endpoint receiving JSON submissions (e.g. Google Apps Script for Google Sheets). | `https://script.google.com/...` | Optional |
| `ENQUIRY_WEBHOOK_SECRET` | Secret token sent in headers to authenticate webhook payloads. | `your_secret_here` | Optional |
| `CAREERS_TO` | Target email address receiving job applications. | `info@stricon.in` | **Yes (Prod)** |
| `CAREERS_RESUME_UPLOAD` | Feature flag enabling candidate resume uploads (`on` or `off`). | `off` | Optional (default off) |

---

## 3. Deployment Guide (Vercel)

1. **Push to GitHub**: Push the validated `main` branch to your GitHub repository.
2. **Import Project**: Log in to [Vercel](https://vercel.com), select **Add New Project**, and import the repository.
3. **Environment Variables**: Add production environment variables listed in the table above under **Project Settings > Environment Variables**.
   - **Important**: Set `ALLOW_INDEXING="true"` **only** on the Production environment. Leave Preview and Development deployments with `ALLOW_INDEXING="false"` (default) to prevent staging environments from being indexed by Google.
4. **Request Body Limits**: Vercel Serverless Functions support request payloads up to ~4.5 MB. The careers application form enforces a strict 2 MB cap on resume documents and 3 MB on total request payload, comfortably fitting within Vercel's limits.
5. **Deploy**: Trigger the initial deployment and verify that the build succeeds cleanly.

---

## 4. Custom Domain Setup

1. In Vercel, navigate to **Project Settings > Domains**.
2. Add both `stricon.in` and `www.stricon.in`.
3. Set `www.stricon.in` as the primary production domain and configure `stricon.in` to redirect (301) to `www.stricon.in`.
4. Add the DNS records (A record `@` and CNAME `www`) at your domain registrar as displayed in Vercel.

---

## 5. ⚠️ Email DNS Configuration Warning (CRITICAL)

The domain `stricon.in` may already handle corporate email (e.g. `info@stricon.in` on Google Workspace or Microsoft 365).

When configuring DNS records for Resend:
- **SPF Record**: A domain must have **exactly one** SPF TXT record. If an SPF record already exists (e.g. `v=spf1 include:_spf.google.com ~all`), **MERGE** Resend's mechanism into it:
  ```text
  v=spf1 include:_spf.google.com include:resend.com ~all
  ```
  ❌ **NEVER** create a second TXT record starting with `v=spf1`. Doing so invalidates all SPF checks and causes corporate emails to bounce or land in spam.
- **MX Records**: Do **NOT** delete or alter existing MX records pointing to your corporate email host. Resend only sends transactional emails and does not receive mail on the apex domain.
- **DKIM & DMARC**: Add the distinct CNAME and TXT records specified by Resend for DKIM verification.
- **Verification**: Ensure the domain status is marked as **Verified** in the Resend dashboard before configuring `ENQUIRY_FROM`.

---

## 6. Post-Launch Operations

1. **Google Search Console**: Add the property `https://www.stricon.in` and submit the sitemap URL: `https://www.stricon.in/sitemap.xml`.
2. **Google Business Profile**: Claim or update the STRICON listing in Hyderabad ensuring business name, phone number (`+91 89781 07573`), and registered office address match the website.
3. **End-to-End Test Submissions**:
   - Submit a test quote request on `/contact` and confirm delivery in `info@stricon.in` and/or Google Sheets.
   - Submit a test job application on `/careers` and verify attachment delivery.
   - Check spam and junk folders to ensure proper inbox delivery.

---

## 7. Known Limits & Future Enhancements

- **Rate Limiting**: The in-memory sliding-window rate limiter protects individual serverless and container instances. For distributed multi-region serverless clusters (e.g. edge deployments), an external key-value store (such as Upstash Redis or Cloudflare KV) or Cloudflare Turnstile bot verification can be added.
- **Analytics & Cookies**: No third-party tracking or advertising cookies are loaded on this website. Adding analytics tools (such as Google Analytics) that store tracking cookies will require adding a cookie consent banner and updating the Privacy Policy accordingly.
- **Content Security Policy (CSP)**: Strict security headers are active in `next.config.ts`. Full CSP can be configured in future revisions once nonces or script hashes for Turbopack inline scripts are defined.

---

## 8. Adding Real Gallery Photos

To add real field photos to the website:

1. **Add Raw Images**: Place raw photo files (`.jpg`, `.jpeg`, `.png`, `.webp`) in the corresponding category inbox folder:
   - `gallery-inbox/security/`
   - `gallery-inbox/housekeeping/`
   - `gallery-inbox/facility/`
   - `gallery-inbox/training/`
2. **Run Import Pipeline**:
   ```bash
   npm run gallery:import
   ```
   The script auto-rotates by EXIF orientation, **strips all metadata (EXIF, GPS, camera, and location data)**, resizes so the long edge is at most 1800px, converts to WebP (~80 quality), saves to `public/images/gallery/<category>/`, and automatically runs `gallery:sync`.
3. **Add Captions & Alt Text**:
   - Open `src/data/gallery-meta.ts`.
   - Add descriptive alt text and optional captions for your photos.
   - Flag up to 6 photos with `featured: true` to display on the Home page bento grid.
4. **Rebuild & Deploy**:
   ```bash
   npm run build
   ```
   The website will now automatically display the Gallery page, Home gallery preview, and Header/Footer navigation links.

> [!NOTE]
> Ensure written permission is obtained from any individuals photographed and from clients whose facilities or premises appear in photos. Location metadata is automatically stripped by the import pipeline to protect client site privacy.
