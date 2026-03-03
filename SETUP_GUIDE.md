# Isola Vitale Backend Setup Guide

## 🎯 What Was Implemented

Your Isola Vitale website now has a complete backend system with:

✅ **Sanity CMS** - Professional content management system
✅ **Enhanced Product Management** - Variants, inventory, collections
✅ **Stripe Integration** - Complete checkout and payment processing
✅ **Order Management** - Automatic order creation from payments
✅ **Email Notifications** - Beautiful order confirmation emails
✅ **Admin Dashboard** - Custom Sanity Studio at `/studio`

---

## 📋 Setup Steps

### 1. Install Dependencies

```bash
npm install resend
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

**Your current Sanity credentials are already set:**
- Project ID: `bxfrleka`
- Dataset: `production`
- API Token: Already configured

**Add these additional keys:**

#### Stripe Setup
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your **Secret key** → `STRIPE_SECRET_KEY`
3. Copy your **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. For webhooks:
   - Go to https://dashboard.stripe.com/test/webhooks
   - Click "Add endpoint"
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: Select `checkout.session.completed`
   - Copy webhook secret → `STRIPE_WEBHOOK_SECRET`

#### Email Setup (Resend - FREE)
1. Go to https://resend.com/signup
2. Create account (free tier: 3000 emails/month)
3. Get API key → `RESEND_API_KEY`
4. Verify your domain or use `onboarding@resend.dev` for testing

### 3. Start Sanity Studio

```bash
npm run dev
```

Then visit: **http://localhost:3000/studio**

---

## 🏗️ Project Structure

```
IsolaVitale/
├── src/
│   ├── sanity/
│   │   ├── schemas/
│   │   │   ├── product.js       ✨ Enhanced with variants & inventory
│   │   │   ├── collection.js    🆕 Product collections
│   │   │   ├── homepage.js      📝 Homepage content
│   │   │   ├── journal.js       📰 Blog/editorial
│   │   │   ├── order.js         🆕 Order tracking
│   │   │   └── settings.js      🆕 Site-wide settings
│   │   ├── schema.js
│   │   ├── structure.js         🆕 Custom CMS dashboard
│   │   ├── client.js
│   │   └── env.js
│   ├── app/
│   │   ├── api/
│   │   │   ├── checkout/
│   │   │   │   └── route.js     ✨ Enhanced Stripe checkout
│   │   │   └── webhooks/
│   │   │       └── stripe/
│   │   │           └── route.js 🆕 Order creation webhook
│   │   └── studio/
│   │       └── [[...index]]/
│   │           └── page.tsx     📊 Sanity Studio
│   └── lib/
│       └── email.js             🆕 Email templates
├── .env.local                   🔐 Environment variables
└── sanity.config.js             ✨ Enhanced with custom structure
```

---

## 📊 Sanity Studio Features

### Product Management

**Enhanced Fields:**
- ✅ Basic Info (name, status, collection)
- ✅ Details (description, benefits, ingredients)
- ✅ Variants (Full Vessel, Refill with inventory)
- ✅ Media Gallery (multiple images, videos)
- ✅ SEO (title, description, keywords)

**Product Variants:**
Each product can have:
- Full Vessel (with price, SKU, inventory)
- Refill Cartridge (with price, SKU, inventory)
- Inventory tracking (quantity, backorder)

### Collections

Create product collections:
- Daily Collection
- Laboratory Collection
- Cellular Chronos

### Orders

**Automatically created from Stripe:**
- Order number
- Customer details
- Items purchased
- Shipping address
- Order status tracking
- Fulfillment tracking

**Order Status Flow:**
1. Pending → 2. Processing → 3. Shipped → 4. Delivered

---

## 🚀 How It Works

### 1. **Customer Checkout Flow**

```
Customer adds to cart
    ↓
Clicks "Checkout"
    ↓
POST /api/checkout → Creates Stripe session
    ↓
Redirects to Stripe payment page
    ↓
Customer completes payment
    ↓
Stripe webhook → POST /api/webhooks/stripe
    ↓
Creates order in Sanity
    ↓
Sends confirmation email
```

### 2. **Order Management**

Admin workflow in Sanity Studio:
1. View all orders (sorted by date)
2. Filter by status (Processing, Shipped, etc.)
3. Add tracking numbers
4. Update order status
5. Add internal notes

### 3. **Email System**

**Order Confirmation Email includes:**
- Order number & date
- Itemized list of products
- Pricing breakdown
- Shipping address
- Professional Aurabio branding

---

## 🧪 Testing the System

### Test Checkout (Development)

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test Stripe checkout:**
   - Add products to cart
   - Proceed to checkout
   - Use test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits

3. **Check order creation:**
   - Go to http://localhost:3000/studio
   - Navigate to Orders
   - See your test order

### Test Webhook Locally

Use Stripe CLI for local webhook testing:

```bash
# Install Stripe CLI
npm install -g stripe

# Login
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test event
stripe trigger checkout.session.completed
```

---

## 📝 Content Management Guide

### Adding Products

1. Go to `/studio`
2. Click "Products" → "All Products"
3. Click "Create new"
4. Fill in fields:
   - **Basic Info:** Name, status, collection, ritual step
   - **Details:** Description, benefits, ingredients, usage
   - **Variants:** Add Full Vessel and Refill options
   - **Media:** Upload product images
   - **SEO:** Add metadata for search engines
5. Click "Publish"

### Creating Collections

1. Go to `/studio`
2. Click "Collections"
3. Create:
   - Daily Collection
   - Laboratory Collection
   - Cellular Chronos
4. Add hero images and descriptions

### Managing Settings

1. Go to `/studio`
2. Click "Site Settings"
3. Configure:
   - Shipping rates
   - Free shipping threshold
   - Social media links
   - Analytics IDs

---

## 💰 Cost Breakdown

### FREE Tier (Launch Phase)

```
Sanity CMS:        $0/mo  (Free tier: 3 users, 10k docs, 5GB assets)
Vercel Hosting:    $0/mo  (Free tier: 100GB bandwidth)
Stripe:            $0/mo  (Pay per transaction: 2.9% + $0.30)
Resend Email:      $0/mo  (Free tier: 3000 emails/month)
────────────────────────
TOTAL:             $0/mo
```

### When to Upgrade

**Sanity Growth ($99/mo):**
- When you exceed 5GB assets
- When you exceed 100GB CDN bandwidth
- Need more than 3 users

**Vercel Pro ($20/mo):**
- When you exceed 100GB bandwidth
- Need advanced analytics

**Resend Paid ($20/mo):**
- When you exceed 3000 emails/month

---

## 🔧 Common Tasks

### Update Product Inventory

1. Go to `/studio` → Products
2. Select product
3. Go to "Pricing & Variants" tab
4. Update quantity in stock
5. Publish changes

### Process Orders

1. View new orders in `/studio` → Orders → Processing
2. Update status to "Shipped"
3. Add tracking number
4. (Optional) System will auto-email customer

### Add New Collection

1. `/studio` → Collections → Create
2. Add name, description, hero image
3. Link products using "Featured Products"
4. Publish

---

## 🐛 Troubleshooting

### Sanity Studio won't load
- Check `.env.local` has correct `NEXT_PUBLIC_SANITY_PROJECT_ID`
- Restart dev server: `npm run dev`

### Stripe checkout fails
- Verify `STRIPE_SECRET_KEY` in `.env.local`
- Check Stripe dashboard for errors
- Ensure test mode enabled

### Webhook not receiving events
- Check `STRIPE_WEBHOOK_SECRET` is correct
- Use Stripe CLI for local testing
- Verify endpoint URL in Stripe dashboard

### Emails not sending
- Check `RESEND_API_KEY` in `.env.local`
- Verify sender email in Resend dashboard
- Check console logs for errors

---

## 🚀 Deployment Checklist

### Before Going Live

- [ ] Get Stripe live keys (not test keys)
- [ ] Configure production webhook endpoint
- [ ] Set up production email domain
- [ ] Add `NEXT_PUBLIC_BASE_URL` for production
- [ ] Test full checkout flow
- [ ] Add initial products in Sanity
- [ ] Configure shipping rates
- [ ] Set up Google Analytics (optional)

### Deployment to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Settings → Environment Variables
```

---

## 📚 Next Steps

### Recommended Enhancements

1. **Media Migration:**
   - Upload `/public` images to Sanity
   - Update components to use Sanity images
   - Benefit from automatic CDN optimization

2. **Product Search:**
   - Add Algolia integration (free tier available)
   - Implement instant search

3. **Inventory Automation:**
   - Auto-decrement inventory on purchase
   - Low stock alerts

4. **Customer Accounts:**
   - Order history
   - Saved addresses
   - Subscription management

5. **Analytics:**
   - Google Analytics 4
   - Stripe analytics
   - Sanity analytics

---

## 📞 Support Resources

- **Sanity Docs:** https://www.sanity.io/docs
- **Stripe Docs:** https://stripe.com/docs
- **Resend Docs:** https://resend.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

## ✅ Success Metrics

Your backend is working when:
- ✅ Sanity Studio loads at `/studio`
- ✅ You can create and edit products
- ✅ Stripe checkout redirects properly
- ✅ Orders appear in Sanity after checkout
- ✅ Confirmation emails arrive
- ✅ Product images display correctly

---

**Built with ❤️ for Isola Vitale - Cellular Vitality. Isola Crafted.**
