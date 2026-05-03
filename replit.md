# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains two main artifacts: the Isola Vitale storefront (Vite + React) and the API server (Express 5 + PostgreSQL).

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM (`@workspace/db`)
- **Object Storage**: Replit App Storage (GCS-backed presigned URL upload flow)
- **Validation**: Zod, `drizzle-zod`
- **Build**: esbuild

## Artifacts

### `artifacts/isola-vitale` — Isola Vitale Storefront
- **Stack**: Vite + React + wouter routing + TypeScript + CSS Modules + Tailwind v4
- **Preview path**: `/`
- **Port**: assigned dynamically via `PORT` env var
- **Google Fonts**: Cormorant Garamond (serif) + Work Sans (sans)
- **Brand colors**: `--color-emerald: #0A1A15`, `--color-gold: #C5A059`, `--color-ivory: #FAFAF8`
- **Key files**:
  - `src/App.tsx` — main router with all 18+ routes including `/admin`
  - `src/pages/` — all page components (HomePage, ProductsPage, ProductPage, CheckoutPage, SystemPage, OriginPage, JournalPage, AccountPage, RefillPage, DiagnosisPage, TechnologyPage, AdminPage, etc.)
  - `src/components/CartDrawer.tsx` — im8health-inspired white cart drawer with subscription toggles
  - `src/components/ProductActions.tsx` — subscription purchase UI with radio options
  - `src/context/CartContext.tsx` — cart with subscription toggle, localStorage persistence (`isola_cart_v2` key)
  - `src/data/items.js` — static product catalog (12+ products across 3 collections: Laboratory, Daily, Cellular Chronos)
  - `src/index.css` — brand CSS variables + global utilities
- **API proxy**: `/api/*` proxied to API server at `localhost:8080` via Vite proxy config

### Cart Features (im8health-inspired)
- White/ivory background drawer (not dark)
- "Subscribe & Save 20%" emerald green banner at top
- Free shipping progress bar (threshold: $200)
- Per-item subscription toggle: switches price between full price and 80% of full price
- Savings badge ("20% off") and crossed-out original price when subscribed
- Total savings display in footer
- Upsell section with a recommended product
- Trust badges: Secure Checkout, Free Returns, Refillable
- Checkout button in emerald green

### `artifacts/api-server` — API Server
- **Stack**: Express 5 + TypeScript + esbuild
- **Port**: 8080
- **Routes**:
  - `GET /api/healthz` — health check
  - `POST /api/checkout` — Stripe checkout session (requires `STRIPE_SECRET_KEY` env var)
  - `POST /api/storage/uploads/request-url` — get presigned GCS upload URL
  - `GET /api/storage/objects/*` — serve uploaded private objects
  - `GET /api/storage/public-objects/*` — serve public storage assets
  - `GET /api/cms/products` — list all CMS products
  - `POST /api/cms/products` — create product
  - `PUT /api/cms/products/:id` — update product
  - `DELETE /api/cms/products/:id` — delete product
  - `GET /api/cms/journal` — list journal posts
  - `POST /api/cms/journal` — create journal post
  - `PUT /api/cms/journal/:id` — update journal post
  - `DELETE /api/cms/journal/:id` — delete journal post
  - `GET /api/cms/hero` — list hero sections
  - `PUT /api/cms/hero/:page` — upsert hero section for a page
  - `GET /api/cms/media` — list media assets
  - `POST /api/cms/media` — register uploaded media asset
  - `DELETE /api/cms/media/:id` — delete media record
  - `GET /api/cms/settings` — list site settings
  - `PUT /api/cms/settings/:key` — upsert a setting

### `lib/db` — Database Package
- PostgreSQL via `pg` + Drizzle ORM
- Connection: `DATABASE_URL` environment variable
- **Tables** (all created via `drizzle-kit push`):
  - `products` — CMS-managed product catalog (id, slug, name, collection, prices, image, benefits, etc.)
  - `journal_posts` — CMS-managed articles (id, slug, title, excerpt, body, category, author, image, published)
  - `hero_sections` — Per-page hero content (page, headline, subheadline, body copy, CTA, image URL, video URL)
  - `media_assets` — Uploaded media registry (filename, objectPath, mimeType, sizeBytes)
  - `site_settings` — Key-value store for global config (banner text, free shipping threshold, etc.)
- Run migrations: `pnpm --filter @workspace/db run push`

### `lib/object-storage-web` — Client Upload Library
- Uppy v5 based upload components
- `ObjectUploader` component and `useUpload` hook
- Presigned URL flow: request URL from API → PUT file directly to GCS

## Admin Panel (`/admin`)
- Password-protected CMS at `/admin` (password: `isola2026`)
- **Products tab**: Create/edit/delete products, set prices, upload images, toggle active state, import from static catalog
- **Journal tab**: Create/edit/delete articles with body (HTML supported), publish/unpublish
- **Hero Sections tab**: Edit headline, copy, CTA, image URL, and video URL for each page (home, products, journal, origin, system, technology)
- **Media Library tab**: Upload images/videos directly to Replit object storage, copy URLs, manage all media assets
- **Settings tab**: Global site configuration (announcement banner, free shipping threshold, subscription discount, footer tagline, contact email, Instagram URL)

## Environment Variables Required
- `DATABASE_URL` — PostgreSQL connection string (set by Replit)
- `DEFAULT_OBJECT_STORAGE_BUCKET_ID` — GCS bucket ID (set by object storage setup)
- `PUBLIC_OBJECT_SEARCH_PATHS` — Object storage public paths (set automatically)
- `PRIVATE_OBJECT_DIR` — Object storage private dir (set automatically)
- `STRIPE_SECRET_KEY` — Stripe secret key for checkout (user must provide)

## Product Catalog (Static)
12+ products across 3 collections in `src/data/items.js`:
- **Laboratory Collection**: The Cellular Essence ($280), The Barrier Cream ($220), The Shield SPF 50 ($180), The Luminance Activator ($195), The Renewal Peel ($240)
- **Daily Collection**: The Morning Ritual Set ($340), The Gentle Cleanser ($85), The Hydration Mist ($120), The Daily SPF Veil ($140)
- **Cellular Chronos Collection**: Age-specific formulations for 30s, 40s, 50s+

## Subscription Pricing
- 20% discount on subscribe & save
- Applied per-item via toggle in cart and on product page
- `CartContext.toggleSubscription(cartId)` recalculates: `price = fullPrice * 0.80`
