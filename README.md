# STRICON Corporate Website – Phase 1 Foundation

Corporate website foundation for **STRICON PEOPLE & SECURITY SERVICES PVT LTD** (Brand: STRICON), a Facility Management and Security Services company based in Hyderabad, India.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, `src/` directory)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (`@theme inline` CSS variable mapping in `src/app/globals.css`)
- **Icons**: `lucide-react`
- **Theme**: `next-themes` (light/dark mode with system preference)
- **Typography**: `Poppins` (headings) and `Inter` (body) loaded via `next/font/google`

---

## Getting Started

### Prerequisites
- Node.js LTS (v26.x or later)
- npm (v11.x or later)

### Installation & Development

```bash
# Install dependencies
npm install

# Run the local development server
npm run dev

# Lint code
npm run lint

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site in your browser.

---

## Project Structure

```
stricon-website/
├── public/
│   ├── images/
│   │   ├── logo/ (wordmark.jpg, symbol.jpg, emblem.jpg)
│   │   ├── banners/
│   │   ├── security/
│   │   ├── facility/
│   │   ├── about/
│   │   └── industries/
│   ├── documents/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── layout.tsx (Root layout with fonts, theme provider, metadata)
│   │   ├── page.tsx (Home route)
│   │   ├── globals.css (Tailwind v4 tokens & styles)
│   │   ├── not-found.tsx (Accessible 404 page)
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── services/[slug]/page.tsx (9 service detail dynamic routes)
│   │   ├── careers/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── api/contact/route.ts (Validation stub)
│   │   ├── api/careers/route.ts (Validation stub)
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── manifest.ts
│   │   ├── icon.jpg / apple-icon.jpg
│   ├── components/
│   │   ├── layout/ (Header, Navbar, Footer, MobileMenu, ThemeToggle)
│   │   ├── home/
│   │   ├── about/
│   │   ├── services/
│   │   ├── careers/
│   │   ├── contact/
│   │   └── common/
│   ├── providers/ (ThemeProvider.tsx)
│   ├── hooks/
│   ├── data/ (company.ts, profile.ts, navigation.ts, services.ts, industries.ts, clients.ts)
│   ├── lib/ (utils.ts, constants.ts, validations.ts, email.ts)
│   ├── types/ (company.ts, profile.ts, service.ts, navigation.ts, client.ts, enquiry.ts)
│   └── config/ (site.ts, theme.ts)
├── .env.example
├── .env.local
├── .gitignore
├── AGENTS.md (Single source of architectural standards for future phases)
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Architectural Principles

1. **Single Source of Truth**: All company facts and contact details are stored in `src/data/company.ts` and `src/config/site.ts`. Never hardcode company data in components.
2. **Strict Verification**: No fabricated statistics, testimonials, or awards. No 24/7 support claims.
3. **Pending Confirmation**: Unconfirmed facts are stored in `pendingConfirmation` and are never rendered in the UI or metadata.
4. **Client Logos**: Clients in `src/data/clients.ts` have `displayApproved: false` and are not rendered until approved with verified assets.
5. **Accessibility**: Full keyboard navigation, ARIA landmarks, focus traps, body scroll locking, and WCAG AA color contrast compliance.
