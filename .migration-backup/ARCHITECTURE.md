# Aurabio Backend Architecture

## 🏗️ System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        AURABIO WEBSITE                          │
│                     (Next.js 16 + React 19)                     │
└─────────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
                ▼               ▼               ▼
        ┌───────────┐   ┌───────────┐   ┌───────────┐
        │  Sanity   │   │  Stripe   │   │  Resend   │
        │    CMS    │   │  Payments │   │   Email   │
        └───────────┘   └───────────┘   └───────────┘
```

---

## 📊 Data Flow

### Customer Purchase Flow

```
1. BROWSING
   Customer visits website
        ↓
   Views products from Sanity CMS
        ↓
   Adds items to cart (local state)

2. CHECKOUT
   Customer clicks "Checkout"
        ↓
   POST /api/checkout
        ↓
   Creates Stripe Checkout Session
        ↓
   Redirects to Stripe payment page

3. PAYMENT
   Customer enters payment details
        ↓
   Stripe processes payment
        ↓
   Redirects to success page

4. ORDER PROCESSING
   Stripe sends webhook
        ↓
   POST /api/webhooks/stripe
        ↓
   ┌─────────────────────────────┐
   │ 1. Verify webhook signature │
   │ 2. Create order in Sanity   │
   │ 3. Send confirmation email  │
   │ 4. Update inventory (TODO)  │
   └─────────────────────────────┘
        ↓
   Customer receives email
```

---

## 🗂️ Database Schema (Sanity)

### Product Document

```javascript
{
  _type: 'product',
  _id: 'unique-id',
  name: 'HydraBalance Toner Mist',
  slug: 'hydrabalance-toner-mist',
  status: 'active',
  step: '02',
  collection: { _ref: 'collection-id' },

  // Details
  truth: 'The architect of cellular hydration',
  description: '...',
  benefits: ['...', '...'],
  ingredients: [
    { name: 'Hyaluronic Acid', benefit: '...', percentage: '2%' }
  ],
  texture: '...',
  usage: '...',
  size: '100ml',

  // Variants
  variants: [
    {
      variantType: 'full',
      price: 89,
      compareAtPrice: 120,
      sku: 'AUR-HB-FULL',
      inventory: {
        trackInventory: true,
        quantity: 50,
        allowBackorder: false
      }
    },
    {
      variantType: 'refill',
      price: 65,
      sku: 'AUR-HB-REFILL',
      inventory: { ... }
    }
  ],

  // Media
  image: { asset: { _ref: 'image-id' }, alt: '...' },
  gallery: [...],

  // SEO
  seoTitle: '...',
  seoDescription: '...',
  keywords: ['...'],

  // Relationships
  recommendations: [{ _ref: 'product-id' }],
  featured: true
}
```

### Collection Document

```javascript
{
  _type: 'collection',
  name: 'Daily Collection',
  slug: 'daily-collection',
  description: '...',
  heroImage: { asset: {...}, alt: '...' },
  featuredProducts: [{ _ref: 'product-id' }],
  sortOrder: 0,
  seoTitle: '...',
  seoDescription: '...'
}
```

### Order Document

```javascript
{
  _type: 'order',
  orderNumber: 'AUR-1234567890-ABC123',
  stripeSessionId: 'cs_...',
  stripePaymentIntentId: 'pi_...',
  status: 'processing', // pending, processing, shipped, delivered

  customer: {
    email: 'customer@email.com',
    name: 'Jane Doe',
    phone: '+1234567890'
  },

  shippingAddress: {
    line1: '123 Main St',
    line2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'US'
  },

  items: [
    {
      productId: { _ref: 'product-id' },
      name: 'HydraBalance Toner Mist',
      variant: 'full',
      quantity: 1,
      price: 89
    }
  ],

  subtotal: 89,
  shippingCost: 0,
  tax: 7.12,
  total: 96.12,
  currency: 'usd',

  trackingNumber: '1Z999AA...',
  trackingUrl: 'https://...',
  notes: 'Internal notes...',
  createdAt: '2025-01-21T...'
}
```

### Settings Document (Singleton)

```javascript
{
  _type: 'settings',
  _id: 'settings',

  siteName: 'Aurabio',
  siteUrl: 'https://aurabio.com',

  announcement: {
    enabled: true,
    text: 'Free shipping on orders over $100',
    link: '/products'
  },

  logo: { asset: {...} },
  favicon: { asset: {...} },

  freeShippingThreshold: 100,
  shippingRates: [
    { country: 'US', rate: 0, estimatedDays: '3-5' },
    { country: 'CA', rate: 15, estimatedDays: '5-7' }
  ],
  taxRate: 8.5,

  instagram: 'https://instagram.com/aurabio',
  facebook: '...',

  googleAnalyticsId: 'G-...',
  contactEmail: 'hello@aurabio.com',
  supportEmail: 'support@aurabio.com'
}
```

---

## 🔌 API Routes

### `/api/checkout` - POST

**Purpose:** Create Stripe checkout session

**Request:**
```javascript
{
  items: [
    {
      name: 'Product Name',
      price: 89,
      quantity: 1,
      imageSrc: '/image.jpg',
      productId: 'id',
      variant: 'full',
      sku: 'SKU-123'
    }
  ]
}
```

**Response:**
```javascript
{
  url: 'https://checkout.stripe.com/...',
  sessionId: 'cs_test_...'
}
```

### `/api/webhooks/stripe` - POST

**Purpose:** Handle Stripe webhook events

**Events Handled:**
- `checkout.session.completed` → Create order, send email
- `payment_intent.succeeded` → Log success
- `payment_intent.payment_failed` → Log failure

**Process:**
1. Verify webhook signature
2. Retrieve full session from Stripe
3. Create order document in Sanity
4. Send order confirmation email
5. Update inventory (TODO)

---

## 🎨 Sanity Studio Structure

```
Aurabio CMS
├── 🧴 Products
│   ├── All Products
│   ├── ──────────
│   ├── Active Products
│   ├── Draft Products
│   └── Featured Products
│
├── 📦 Collections
│
├── ──────────
│
├── 📋 Orders
│   ├── All Orders
│   ├── ──────────
│   ├── Processing Orders
│   ├── Shipped Orders
│   └── Delivered Orders
│
├── ──────────
│
├── 📝 Content
│   ├── 🏠 Homepage
│   └── 📖 Journal / Blog
│
├── ──────────
│
└── ⚙️ Site Settings
```

---

## 📧 Email System

### Order Confirmation Email

**Trigger:** Stripe `checkout.session.completed` webhook

**Template Includes:**
- Aurabio branding (header, colors, typography)
- Order number & date
- Customer name
- Itemized product list with quantities and prices
- Pricing breakdown (subtotal, shipping, tax, total)
- Shipping address
- Support contact information

**Service:** Resend API
**Free Tier:** 3000 emails/month

---

## 🔐 Security

### Webhook Verification

```javascript
// Verify Stripe signature
const signature = request.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(
  body,
  signature,
  process.env.STRIPE_WEBHOOK_SECRET
);
```

### Sanity Permissions

- **Read-only client** for frontend (public)
- **Write client** for webhooks (server-only with API token)

### Environment Variables

All sensitive data in `.env.local`:
- Stripe keys (never in client-side code)
- Sanity token (server-only)
- Email API key (server-only)

---

## 📈 Scalability

### Current Limits (Free Tier)

| Service | Free Tier Limit | When to Upgrade |
|---------|----------------|-----------------|
| **Sanity** | 10k documents, 5GB assets, 100GB CDN | >5GB media or >100GB bandwidth |
| **Vercel** | 100GB bandwidth | >100GB/month traffic |
| **Resend** | 3000 emails/month | >100 orders/day |
| **Stripe** | Unlimited | Pay per transaction only |

### Scaling Strategy

**Phase 1 (0-100 orders/month):** Free tier everything
**Phase 2 (100-500 orders/month):** Upgrade Sanity ($99/mo)
**Phase 3 (500+ orders/month):** Upgrade Vercel ($20/mo) + Resend ($20/mo)

---

## 🚀 Future Enhancements

### Phase 2 (Media Management)
- Migrate `/public` images to Sanity
- Automatic image optimization (WebP, responsive)
- CDN delivery worldwide

### Phase 3 (Inventory)
- Auto-decrement on purchase
- Low stock alerts
- Backorder management

### Phase 4 (Customer Accounts)
- User registration/login
- Order history
- Saved addresses
- Wishlist

### Phase 5 (Advanced Features)
- Product search (Algolia)
- Subscription refills
- Multi-currency support
- Analytics dashboard

---

## 🔄 Deployment Flow

```
Development
    │
    ├─ Code changes
    ├─ Test locally (localhost:3000)
    ├─ Test Sanity Studio (/studio)
    ├─ Test Stripe (test mode)
    │
    ↓
Git Push
    │
    ↓
Vercel Auto-Deploy
    │
    ├─ Build Next.js app
    ├─ Deploy to CDN
    ├─ Set environment variables
    │
    ↓
Production
    │
    ├─ Configure Stripe webhook (production URL)
    ├─ Switch to Stripe live keys
    ├─ Verify email domain
    │
    ↓
Live Site ✅
```

---

**Built for Aurabio - Cellular Vitality. Isola Crafted.**
