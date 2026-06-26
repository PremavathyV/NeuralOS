# NeuralOS — Premium AI Platform

> Enterprise-grade AI infrastructure. Build, deploy and scale intelligent workflows at the speed of thought.

![NeuralOS OG](./public/og.png)

---

## Overview

NeuralOS is a fully responsive, production-ready marketing landing page for an AI SaaS platform. Built with Next.js 15 and React 19, it showcases a modern dark-theme UI with smooth animations, interactive sections, and a polished component architecture.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| Language | TypeScript 5 |
| Fonts | Inter · JetBrains Mono (Google Fonts) |
| Linting | ESLint 9 + eslint-config-next |

---

## Features

- **Hero** — Animated headline, magnetic CTA buttons, parallax background, floating glass stat cards
- **Trusted By** — Scrolling marquee logo strip
- **Features** — 6-card grid with hover effects and key metrics per feature
- **Bento Grid** — Visual highlight of platform capabilities in a bento layout
- **Statistics** — Animated count-up numbers on scroll
- **Workflow** — Step-by-step visual of the product workflow
- **Pricing** — Interactive cards with monthly/annual billing toggle and USD / INR / EUR currency switcher
- **Testimonials** — Customer quote carousel
- **FAQ** — Accordion with structured FAQ schema (JSON-LD)
- **CTA** — Full-width call-to-action section
- **Contact** — Contact form section
- **Cursor Glow** — Client-side custom cursor glow effect
- **Navbar** — Scroll-aware sticky navigation
- **Footer** — Links and social handles

### Performance & SEO

- Below-fold sections lazy-loaded with `next/dynamic`
- Full Open Graph and Twitter Card meta tags
- JSON-LD structured data (Organization, SoftwareApplication, FAQPage)
- `robots.txt` and `sitemap.xml` included
- `Skip to main content` accessibility link
- SOC 2 Type II and HIPAA-ready messaging

---

## Project Structure

```
NeuralOS/
├── public/
│   ├── favicon.ico
│   ├── og.png              # Open Graph image (1200×630)
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout, metadata, JSON-LD, fonts
│   │   └── page.tsx        # Single-page composition
│   ├── components/
│   │   ├── icons/          # SVG icon components
│   │   ├── layout/
│   │   │   ├── CursorGlow.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   └── sections/
│   │       ├── BentoGrid.tsx
│   │       ├── Contact.tsx
│   │       ├── CTA.tsx
│   │       ├── FAQ.tsx
│   │       ├── Features.tsx
│   │       ├── Hero.tsx
│   │       ├── Pricing.tsx
│   │       ├── Statistics.tsx
│   │       ├── Testimonials.tsx
│   │       ├── TrustedBy.tsx
│   │       └── Workflow.tsx
│   ├── hooks/
│   │   ├── useCounter.ts         # Animated count-up
│   │   ├── useMagneticButton.ts  # Magnetic hover effect
│   │   ├── useNavScroll.ts       # Navbar scroll detection
│   │   └── useScrollObserver.ts  # Intersection Observer for entrance animations
│   ├── styles/
│   │   └── globals.css
│   └── utils/
│       ├── cn.ts           # className utility
│       └── pricing.ts      # Price computation (billing × currency)
├── SVGs/                   # Raw SVG assets
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repo
git clone https://github.com/your-org/neuralos.git
cd neuralos

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## Pricing Plans

| Plan | Monthly (USD) | Annual discount |
|---|---|---|
| Starter | $29 / mo | 20% off |
| Pro | $79 / mo | 20% off |
| Enterprise | $199 / mo | 20% off |

Pricing also supports **INR** and **EUR** with automatic conversion via the `computePrice` utility.

---

## Custom Tailwind Tokens

The design system extends Tailwind with the following custom tokens:

**Colors**

| Token | Value | Usage |
|---|---|---|
| `arctic` | `#F1F6F4` | Primary text |
| `forsythia` | `#FFC801` | Accent / CTA |
| `nocturnal` | `#114C5A` | Teal accent |
| `dark` | `#0A1628` | Page background |
| `orange` | `#F5A623` | Secondary accent |

**Fonts**

- `font-sans` → Inter
- `font-mono` → JetBrains Mono

---

## Environment Variables

No environment variables are required to run the project locally. If you deploy to a custom domain, update `metadataBase` in `src/app/layout.tsx`:

```ts
metadataBase: new URL('https://your-domain.com'),
```

---

## License

This project is private. All rights reserved.
