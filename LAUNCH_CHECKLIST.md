# STRICON Website – Launch Checklist

This document details all action items, verification commands, and pending owner inputs needed for the public launch of the STRICON corporate website.

---

## 1. Pending Inputs from Company Leadership / Owner

### Legal & Corporate Registrations
- [ ] **PSARA Licence Number**: Provide registration number for display in header/footer/About page (`company.psaraLicenseNumber`).
- [ ] **PSARA Validity Date**: Provide expiration/renewal date (`company.legal.psaraValidUntil`).
- [ ] **Corporate Identity Number (CIN)**: Optional, for statutory compliance footer (`company.legal.cin`).
- [ ] **GSTIN**: Optional, for commercial documentation (`company.legal.gstin`).
- [ ] **Official Office Address Confirmation**: Confirm whether Gudimalkapur (registered) or Awfis HITEC City (alternate) should be featured as the primary operational address.

### Brand, Identity & Media
- [ ] **Company Tagline**: Official corporate slogan or motto (`company.tagline`).
- [ ] **Official Social Media Profiles**: LinkedIn, X (Twitter), Facebook, Instagram links (`company.socialLinks`).
- [ ] **Google Maps Embed URL**: Verified Google Business Profile map embed link (`company.googleMapsEmbedUrl`).
- [ ] **Working Days Schedule**: Official days of operation (e.g. "Monday – Saturday") (`company.workingHours.workingDays`).
- [ ] **Founder & Managing Director Photo**: Professional executive headshot (replaces typographic monogram) (`company.founder.photo`).
- [ ] **Founder Message**: Formal signed message from the MD for the About page (`company.founder.message`).
- [ ] **Add gallery photos**: Put raw photos in `gallery-inbox/<category>/`, run `npm run gallery:import`, add alt text and captions in `src/data/gallery-meta.ts`, mark up to 6 as featured, then rebuild. Ensure permission is obtained from people shown and from clients whose premises appear; camera, GPS, and EXIF location metadata are automatically stripped by the import script.
- [ ] **Client Logo Assets**: Higher-resolution SVG/PNG assets for client logos if desired (`public/images/clients/`).
- [ ] **Crown Brewing Logo**: Final legal clearance to display Crown Brewing logo on website (`clients.ts` `displayApproved`).

### Content & Legal Review
- [ ] **Legal Review of Privacy Policy**: Qualified legal counsel review of `src/data/legal.ts` Privacy Policy.
- [ ] **Legal Review of Terms & Conditions**: Qualified legal counsel review of `src/data/legal.ts` Website Terms.
- [ ] **Active Job Vacancies**: Specific roles, experience requirements, and shift timings for `/careers` openings (`careers.ts`).

---

## 2. Infrastructure, Accounts & Deployment Setup

### GitHub & Vercel
- [ ] **GitHub Repository**: Push `main` branch to private or organisation repository.
- [ ] **Vercel Project Import**: Import repo into Vercel team account.
- [ ] **Domain Configuration**: Add custom domains `stricon.in` and `www.stricon.in` in Vercel. Set `www.stricon.in` as the primary production domain with 301 redirect from apex `stricon.in`.

### Resend & Email Deliverability (CRITICAL)
- [ ] **Domain Verification**: Add `stricon.in` to Resend and configure DNS records.
- [ ] **⚠️ DNS SPF Warning**: If `stricon.in` already receives email (Google Workspace / Microsoft 365), **MERGE** Resend's `include:resend.com` into the single existing SPF TXT record. Do NOT create a duplicate SPF record and do NOT modify existing MX records.
- [ ] **Verified Sender**: Update `ENQUIRY_FROM="STRICON Website <contact@stricon.in>"` after domain verification passes.
- [ ] **Resume Attachments**: Set `CAREERS_RESUME_UPLOAD=on` in Vercel environment variables once Resend email delivery is confirmed active.

### CRM & Webhook Automation (Optional)
- [ ] **Google Sheets Webhook**: Deploy Google Apps Script receiver and set `ENQUIRY_WEBHOOK_URL` and `ENQUIRY_WEBHOOK_SECRET` for automated spreadsheet logging.

### Search Console & Business Presence
- [ ] **Google Search Console**: Verify domain ownership and submit `https://www.stricon.in/sitemap.xml`.
- [ ] **Google Business Profile**: Claim or update STRICON listing in Hyderabad with matching address and telephone number.

---

## 3. Prelaunch Verification Commands

Run these automated verification commands in order prior to cutting over production DNS:

```bash
# 1. Typecheck & Linter (0 errors, 0 warnings required)
npx tsc --noEmit
npm run lint

# 2. WCAG Contrast Audit (All 20 token pairs must PASS >= 4.5:1)
npm run check:contrast

# 3. Verbatim Copy Audit (44/44 deck text runs verified)
npm run audit:copy

# 4. Production Build (Next.js Turbopack)
npm run build

# 5. Production Server Checks (Start in background on port 3100)
# - Verifies all 25 internal routes (status 200, 404 test)
# - Verifies configuration and page integrity
npm run check:links
npm run prelaunch

# 6. API Delivery & Bot Defense Test Suites (Start dev server in background on port 3200)
npm run test:contact
npm run test:careers
```
