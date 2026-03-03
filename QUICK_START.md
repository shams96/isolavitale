# 🚀 Aurabio Backend - Quick Start

## ✅ What's Been Done

Your website now has:
- ✅ Sanity CMS with enhanced schemas
- ✅ Stripe checkout integration
- ✅ Order management system
- ✅ Email notifications
- ✅ Custom admin dashboard

---

## 📦 Install Missing Package

```bash
npm install resend
```

---

## 🔑 Required Environment Variables

Add to `.env.local`:

```bash
# Already configured ✓
NEXT_PUBLIC_SANITY_PROJECT_ID="bxfrleka"
SANITY_API_TOKEN="your-token-already-set"

# Add these:
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
RESEND_API_KEY="re_..."
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

---

## 🎯 Quick Setup (5 minutes)

### 1. Get Stripe Keys
```
1. Go to: https://dashboard.stripe.com/test/apikeys
2. Copy Secret key → STRIPE_SECRET_KEY
3. Copy Publishable key → NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```

### 2. Get Resend API Key (FREE)
```
1. Go to: https://resend.com/signup
2. Create free account
3. Copy API key → RESEND_API_KEY
```

### 3. Setup Webhook (After deployment)
```
1. Go to: https://dashboard.stripe.com/test/webhooks
2. Add endpoint: https://yourdomain.com/api/webhooks/stripe
3. Select event: checkout.session.completed
4. Copy secret → STRIPE_WEBHOOK_SECRET
```

### 4. Start Development
```bash
npm install resend
npm run dev
```

### 5. Access Sanity Studio
```
Open: http://localhost:3000/studio
```

---

## 📊 What You Can Do Now

### In Sanity Studio (`/studio`)

**✅ Manage Products:**
- Create products with variants (Full Vessel, Refill)
- Track inventory
- Upload product images
- Add SEO metadata

**✅ Organize Collections:**
- Daily Collection
- Laboratory Collection
- Cellular Chronos

**✅ View Orders:**
- All orders automatically created from Stripe
- Filter by status (Processing, Shipped, Delivered)
- Add tracking numbers
- Update order status

**✅ Configure Settings:**
- Shipping rates
- Free shipping threshold
- Social media links
- Analytics IDs

---

## 🧪 Test Checkout

1. Add products to cart
2. Click checkout
3. Use test card: **4242 4242 4242 4242**
4. Complete payment
5. Check `/studio` → Orders to see your order!

---

## 💰 Costs

**Current: $0/month**
- Everything runs on free tiers
- Only pay Stripe transaction fees (2.9% + $0.30)

---

## 📁 Key Files

```
src/
├── sanity/
│   ├── schemas/
│   │   ├── product.js        → Enhanced product schema
│   │   ├── collection.js     → Product collections
│   │   ├── order.js          → Order tracking
│   │   └── settings.js       → Site settings
│   └── structure.js          → Custom dashboard
├── app/api/
│   ├── checkout/route.js     → Stripe checkout
│   └── webhooks/stripe/      → Order creation
└── lib/
    └── email.js              → Email templates
```

---

## 🆘 Need Help?

Read the full guide: **SETUP_GUIDE.md**

---

## 🎉 Next Steps

1. ✅ Install `resend` package
2. ✅ Add environment variables
3. ✅ Start dev server
4. ✅ Access `/studio`
5. ✅ Create your first product
6. ✅ Test checkout flow

**You're ready to go! 🚀**
