# AGENTS.md - Paola Rioseco | Vida Consciente

> This file contains essential information for AI agents to understand and work efficiently in this project.
> **Project:** Paola Rioseco | Vida Consciente - Knowledge platform for personal transformation and conscious living.
> **Language:** Spanish for UI/content, English for code
> **Last Updated:** 2026-03-25

---

## 1. Project Overview

**Paola Rioseco | Vida Consciente** is a dual-audience knowledge platform (B2B + B2C) built with Next.js and deployed on Cloudflare Workers. It functions as a living library and academy for personal transformation.

### Architecture Philosophy
- **SINT Stack** (Glass Box Architecture) - Transparent, maintainable code
- **Knowledge-First Platform** - Content-driven with static Markdown
- **Dual Path Architecture** - Separate B2B (organizations) and B2C (individuals) entry points
- **Zero Noise UX** - Editorial design with minimal visual clutter

### Key Characteristics
- Content is stored in Markdown files (no headless CMS)
- Static site generation with dynamic routes for articles
- Security-first approach with reCAPTCHA v3 and HMAC validation
- Chilean law compliance (Ley 21.719 - Personal Data Protection)

---

## 2. Technology Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Static typing |
| Tailwind CSS | 4.x | Utility-first styling |

### UI & Animation
- **Framer Motion** ^12.33.0 - Page transitions and micro-interactions
- **Lucide React** ^0.563.0 - Icon library
- **Google Fonts** - Inter (sans) and Lora (serif) via `next/font`

### Content Processing
- **gray-matter** ^4.0.3 - Markdown frontmatter parsing
- **remark** ^15.0.1 + **remark-html** ^16.0.1 - Markdown to HTML conversion
- **raw-loader** ^4.0.2 - Import MD files as strings (Turbopack config)

### Security
- **reCAPTCHA v3** - Invisible spam protection
- **HMAC-SHA256** (Node.js crypto) - Webhook signature validation
- **Honeypot fields** - Bot detection in forms

### Deployment
- **@opennextjs/cloudflare** ^1.17.1 - Cloudflare Workers adapter
- **wrangler** ^4.69.0 - Cloudflare CLI
- Platform: Cloudflare Pages/Workers

---

## 3. Project Structure

```
pao-alpha/
├── app/                          # Next.js App Router
│   ├── (b2b)/                   # Route Group: Corporate/B2B
│   │   ├── layout.tsx           # Uses HeaderB2B + FooterB2B
│   │   ├── organizaciones/      # Corporate landing page
│   │   │   └── page.tsx
│   │   └── recursos/            # Corporate library
│   │       ├── page.tsx         # Article grid
│   │       └── [slug]/page.tsx  # Individual article
│   ├── (b2c)/                   # Route Group: Personal/B2C
│   │   ├── layout.tsx           # Uses FooterB2C + FloatingWhatsApp
│   │   ├── contacto/            # Contact form page
│   │   ├── personas/            # Personal landing
│   │   │   ├── page.tsx
│   │   │   └── biblioteca/      # Personal library
│   │   │       ├── page.tsx
│   │   │       └── [slug]/page.tsx
│   │   ├── servicios/
│   │   └── quien-soy/
│   ├── api/                     # API Routes
│   │   ├── verify-recaptcha/    # reCAPTCHA token validation
│   │   └── webhooks/payment/    # HMAC-secured webhook handler
│   ├── globals.css              # Tailwind v4 config with @theme
│   ├── layout.tsx               # Root layout with fonts
│   ├── page.tsx                 # Home/Silo Cero (dual entry)
│   └── not-found.tsx            # 404 page
├── components/
│   ├── b2b/                     # Corporate components
│   │   ├── CorporateForm.tsx
│   │   ├── FooterB2B.tsx
│   │   └── HeaderB2B.tsx
│   ├── b2c/                     # Personal components
│   │   ├── ContactForm.tsx
│   │   ├── ContactSection.tsx
│   │   ├── FloatingWhatsApp.tsx # WhatsApp widget with warning
│   │   ├── FooterB2C.tsx
│   │   └── Testimonials.tsx
│   ├── content/                 # Content display components
│   │   ├── ConceptCard.tsx
│   │   └── YouTubeEmbed.tsx
│   └── layout/                  # Layout components
│       ├── Header.tsx           # Main navigation (scroll-aware)
│       └── TriacomaNav.tsx      # 3-pillar navigation
├── content/                     # Markdown content
│   ├── biblioteca-personal/     # B2C articles (6 articles)
│   └── biblioteca-corporativa/  # B2B articles (6 articles)
├── lib/                         # Utilities
│   ├── config.ts                # Centralized config (SSOT)
│   ├── mdx.ts                   # Markdown processing utilities
│   └── recaptcha.ts             # reCAPTCHA helpers
├── public/                      # Static assets
│   ├── logo.png
│   ├── isotipo.png
│   └── paola.jpg
└── scripts/
    └── test-hmac.js             # Webhook security testing
```

---

## 4. Configuration Files

### package.json
Key scripts:
- `npm run dev` - Development server (Turbopack)
- `npm run build` - Production build
- `npm run preview` - Build + Cloudflare preview
- `npm run deploy` - Build + Cloudflare deploy

### next.config.ts
- Image domains: `img.youtube.com`, `i.ytimg.com`
- Turbopack rules for `.md` files with raw-loader
- OpenNext Cloudflare integration

### tailwind.config.ts
Custom colors:
- `primary`: #C01D65 (Magenta)
- `mente`: #273DA0 (Blue)
- `cuerpo`: #FB4C00 (Orange)
- `espiritu`: #9B18B9 (Violet)
- `paper`: #FDFCF8 (Cream background)
- `ink`: #1C1917 (Dark text)

### wrangler.jsonc
Cloudflare Workers configuration:
- Compatibility date: 2025-09-27
- Flags: `nodejs_compat`
- Public vars: B2B feature flags
- Services: Self-reference binding

---

## 5. Environment Variables

Create `.env.local` in project root:

```env
# Feature Flags
NEXT_PUBLIC_ENABLE_B2B=true              # Enable B2B section
NEXT_PUBLIC_ENABLE_B2B_LIBRARY=true      # Enable corporate library

# Security - Webhooks
PAYMENT_WEBHOOK_SECRET=your_secret_here

# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

**Note:** `NEXT_PUBLIC_*` vars must also be set in `wrangler.jsonc` for production.

---

## 6. Content Management

Articles are Markdown files in `/content/` with frontmatter:

```markdown
---
title: "Article Title"
date: "2026-01-25"
excerpt: "Short description for previews"
category: "Category Name"
author: "Paola Rioseco"
readTime: "4 min"
---

# Content in Markdown

Article body here...
```

### Adding New Articles

1. Create `.md` file in appropriate directory:
   - B2C: `content/biblioteca-personal/`
   - B2B: `content/biblioteca-corporativa/`

2. Add slug to corresponding array in `lib/mdx.ts`:
   - `BIBLIOTECA_PERSONAL_SLUGS` for B2C
   - `BIBLIOTECA_CORPORATIVA_SLUGS` for B2B

3. Restart dev server to see changes (build-time content loading)

### Content Utilities (lib/mdx.ts)

| Function | Purpose |
|----------|---------|
| `getAllArticles(silo)` | List all articles in a library |
| `getArticleBySlug(silo, slug)` | Get single article with HTML content |
| `generateArticleParams(silo)` | Generate static params for routes |
| `articleExists(silo, slug)` | Check if article exists |

---

## 7. Code Conventions

### Language
- **Code:** English (variables, functions, components)
- **UI/Content:** Spanish (all user-facing text)

### File Naming
- Components: `PascalCase.tsx`
- Pages: `page.tsx` (Next.js convention)
- Layouts: `layout.tsx`
- Utilities: `camelCase.ts`

### Code Style
- Quotes: Double quotes for JSX/TypeScript
- Indentation: 2 spaces
- Semicolons: Required
- Max line length: ~100 characters

### Component Structure
```tsx
// 1. Imports (React, Next, third-party, local)
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WHATSAPP_CONFIG } from "@/lib/config";

// 2. Types/Interfaces (if component-specific)
interface Props {
  title: string;
}

// 3. Component
export default function ComponentName({ title }: Props) {
  // Hooks first
  const [state, setState] = useState();
  
  // Handlers
  const handleClick = () => {};
  
  // Render
  return <div>{title}</div>;
}
```

### Import Order
1. React/Next.js
2. Third-party libraries
3. Components (`@/components/...`)
4. Utilities (`@/lib/...`)
5. Styles

---

## 8. Security Guidelines

### reCAPTCHA v3 (PRIV-002)
- Implementation: Invisible (no checkbox)
- Minimum score: 0.5
- Actions: `submit_contact_b2c`, `submit_contact_b2b`
- Site key: Public, Secret key: Server-only

### Honeypot Fields
All forms must include hidden field:
```tsx
<div className="hidden" aria-hidden="true">
  <label htmlFor="website">Website</label>
  <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
</div>
```
If filled = spam (silent rejection).

### Data Protection (Ley 21.719)
- Privacy checkbox ALWAYS unchecked by default
- Required text in `PRIVACY_CONFIG.fullNotice`
- B2B forms must include legal disclaimer

### Webhooks (SEC-001, SEC-002)
- HMAC-SHA256 signature validation required
- Timing-safe comparison using `crypto.timingSafeEqual()`
- Never log full payloads or personal data
- Test with: `node scripts/test-hmac.js`

---

## 9. Feature Flags

Controlled via environment variables:

```tsx
// Check in components/pages
const isB2BEnabled = process.env.NEXT_PUBLIC_ENABLE_B2B === 'true';

// Or use from config
import { FEATURE_FLAGS } from "@/lib/config";
if (FEATURE_FLAGS.b2bEnabled) { ... }
```

When disabled, show "Powered Off" view with professional message and return CTA.

---

## 10. Key Components

### FloatingWhatsApp
- Fixed position button (right side, vertically centered)
- Shows warning tooltip on hover (required text from config)
- Context-aware messages (default, b2b, mentoring, tarot, workshop)
- Only appears in B2C layouts

### ContactForm / CorporateForm
- reCAPTCHA v3 protected
- Honeypot spam protection
- Loading and error states
- Privacy compliance checkbox

### Header
- Scroll-aware background (transparent → blurred)
- Dynamic navigation based on current section
- Mobile hamburger menu with animations
- Contact CTA button

---

## 11. Build & Deployment

### Development
```bash
npm install
npm run dev          # http://localhost:3000
```

### Production Build
```bash
npm run build        # Standard Next.js build
npm run lint         # ESLint check
```

### Cloudflare Deploy
```bash
npm run preview      # Build + local preview
npm run deploy       # Build + deploy to Cloudflare
npm run cf-typegen   # Generate Cloudflare types
```

### Build Output
- Uses OpenNext Cloudflare adapter
- Output: `.open-next/` directory
- Worker script: `.open-next/worker.js`
- Static assets: `.open-next/assets/`

---

## 12. Testing

### No Formal Test Framework
The project currently has no Jest/Vitest/Playwright configured.

### Manual Testing
- `scripts/test-hmac.js` - Test webhook HMAC validation
- Requires running server: `npm run dev`

### Checklist for Changes
- [ ] Works on mobile (responsive)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] reCAPTCHA works (if form modified)
- [ ] Privacy checkbox unchecked by default
- [ ] No hardcoded text that belongs in config

---

## 13. Common Issues

### Tailwind v4 Issues
```bash
rm -rf .next && npm run dev
```

### Content Not Updating
Markdown is read at build time. Restart dev server after changes.

### reCAPTCHA Errors
- Check `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set
- Verify domain in Google reCAPTCHA console

### Cloudflare Errors
- Ensure `wrangler.jsonc` has `nodejs_compat` flag
- Run `npm run cf-typegen` to regenerate types

---

## 14. External Integrations

### WhatsApp Business
- Config: `WHATSAPP_CONFIG` in `lib/config.ts`
- Number: +569 99396166
- Warning text is MANDATORY (do not modify)

### Cal.com
- Booking URL: `https://cal.com/paola-rioseco/intro`

### Google reCAPTCHA
- Admin: https://www.google.com/recaptcha/admin
- Version: v3 (invisible)

---

## 15. Agent Checklist

Before modifying code:
- [ ] Does it follow "Zero Noise" philosophy?
- [ ] Does it use existing design system (colors, typography)?
- [ ] Are forms protected with reCAPTCHA?
- [ ] Is privacy checkbox unchecked by default (Ley 21.719)?
- [ ] Are loading/error states handled?
- [ ] Is it responsive (mobile-first)?
- [ ] Is text centralized in `lib/config.ts`?
- [ ] Does new page have SEO metadata?

When creating new pages:
- [ ] Use correct route group `(b2b)` or `(b2c)`
- [ ] Import correct layout
- [ ] Include metadata export
- [ ] Reuse existing components

---

## 16. Resources

- **Tailwind v4 Docs:** https://tailwindcss.com/docs
- **Next.js App Router:** https://nextjs.org/docs/app
- **OpenNext Cloudflare:** https://opennext.js.org/cloudflare
- **Framer Motion:** https://www.framer.com/motion/

---

## 17. Contact

- **Developer:** sint.cl
- **WhatsApp:** +569 99396166
- **Email:** paorioseco@gmail.com
