# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains two main artifacts: the Isola Vitale storefront (Vite + React) and the API server (Express 5).

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **Build**: esbuild (CJS bundle)

## Artifacts

### `artifacts/isola-vitale` — Isola Vitale Storefront
- **Stack**: Vite + React + wouter routing + TypeScript + CSS Modules + Tailwind v4
- **Preview path**: `/`
- **Port**: assigned dynamically via `PORT` env var
- **Google Fonts**: Cormorant Garamond (serif) + Work Sans (sans)
- **Brand colors**: `--color-emerald: #0A1A15`, `--color-gold: #C5A059`, `--color-ivory: #FAFAF8`
- **Key files**:
  - `src/App.tsx` — main router with all 18+ routes
  - `src/pages/` — all page components (HomePage, ProductsPage, ProductPage, CheckoutPage, SystemPage, OriginPage, JournalPage, AccountPage, RefillPage, DiagnosisPage, TechnologyPage, etc.)
  - `src/components/` — Header, Footer, Hero, CartDrawer, ProductCard, ProductActions, Accordion, etc.
  - `src/context/CartContext.tsx` — cart state with localStorage persistence
  - `src/data/items.js` — full product catalog with 12+ products across 3 collections
  - `src/index.css` — brand CSS variables + global utilities
  - `src/app/*/page.module.css` — CSS modules for each page
- **API proxy**: `/api/*` proxied to API server at `localhost:8080` via Vite proxy config

### `artifacts/api-server` — API Server
- **Stack**: Express 5 + TypeScript + esbuild
- **Port**: 8080
- **Routes**:
  - `GET /api/healthz` — health check
  - `POST /api/checkout` — Stripe checkout session creation (requires `STRIPE_SECRET_KEY` env var)
- **Key files**:
  - `src/routes/checkout.ts` — Stripe Checkout session creation
  - `src/routes/health.ts` — health check

## Product Catalog

3 collections with 12+ products:
- **Laboratory Collection**: The Cellular Essence, The Barrier Cream, The Shield SPF 50, The Nocturnal Treatment, The Atmospheric Mist, The Purification Cleanser, The Ocular Complex
- **Daily Collection**: The Vitality Essence, The Comfort Cream, The Luminous Veil Eye Cream, The Cleansing Oil
- **Cellular Chronos**: Age-targeted serums (30s, 40s, 50s+)

## Key Commands

- `pnpm --filter @workspace/isola-vitale run dev` — run storefront
- `pnpm --filter @workspace/api-server run dev` — run API server
- `pnpm run typecheck` — full typecheck across all packages

## Environment Variables

- `STRIPE_SECRET_KEY` — required for Stripe checkout (set in Replit Secrets)

## Stripe Checkout Flow

1. User adds products to cart (CartContext + localStorage)
2. User goes to `/checkout`, enters email
3. Frontend POSTs to `/api/checkout` (proxied via Vite to API server port 8080)
4. API server creates Stripe Checkout session and returns redirect URL
5. User completes payment on Stripe-hosted page
6. On success, Stripe redirects to `/checkout/success?session_id=...`

## Notes

- Sanity CMS folder (`src/sanity/`) exists but is not imported — all content is static/mock data in `data/items.js`
- CSS Modules used throughout; global brand variables defined in `index.css`
- Tailwind v4 also imported but brand variables take precedence (defined first in `:root`)
