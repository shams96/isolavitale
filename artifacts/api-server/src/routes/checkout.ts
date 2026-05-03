import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  image?: string;
}

router.post("/checkout", async (req, res) => {
  const stripeKey = process.env["STRIPE_SECRET_KEY"];

  if (!stripeKey) {
    logger.warn("Stripe secret key not configured");
    res.status(400).json({ error: "Stripe configuration missing" });
    return;
  }

  const { items, email } = req.body as { items: CartItem[]; email: string };

  if (!items || items.length === 0) {
    res.status(400).json({ error: "No items in cart" });
    return;
  }

  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeKey);

    const origin = req.headers.origin || req.headers.referer?.replace(/\/$/, "") || "https://localhost";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.variant || undefined,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "IT", "DE", "FR", "ES", "NL"],
      },
      metadata: {
        source: "isola-vitale",
      },
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err: any) {
    logger.error({ err }, "Stripe checkout error");
    res.status(500).json({ error: err.message || "Checkout failed" });
  }
});

export default router;
