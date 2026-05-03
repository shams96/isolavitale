import { Router, type IRouter } from "express";
import { z } from "zod";
import { logger } from "../lib/logger";
import { resolveLineItem } from "../lib/productCatalog";

const router: IRouter = Router();

const checkoutBodySchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string().min(1),
        quantity: z.number().int().min(1).max(20),
        variant: z.enum(["Signature Vessel", "Refill Cartridge"]).default("Signature Vessel"),
        isSubscription: z.boolean().default(false),
      }),
    )
    .min(1)
    .max(50),
  email: z.string().email().optional(),
});

// Trusted base URL for Stripe redirect targets — never from client headers.
const FRONTEND_BASE = (process.env.FRONTEND_URL ?? "").replace(/\/$/, "");

router.post("/checkout", async (req, res) => {
  const stripeKey = process.env["STRIPE_SECRET_KEY"];

  if (!stripeKey) {
    logger.warn("Stripe secret key not configured");
    res.status(503).json({ error: "Payment processing is not configured on this server." });
    return;
  }

  const parsed = checkoutBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", issues: parsed.error.issues });
    return;
  }

  const { items, email } = parsed.data;

  // Resolve every line item from the server-side catalog — prices are never
  // taken from the client payload.
  const lineItems: ReturnType<typeof resolveLineItem>[] = [];
  for (const item of items) {
    const resolved = resolveLineItem(item.id, item.quantity, item.variant, item.isSubscription);
    if (!resolved) {
      res.status(400).json({ error: `Unknown product: ${item.id}` });
      return;
    }
    lineItems.push(resolved);
  }

  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeKey);

    const baseUrl = FRONTEND_BASE || "https://isolavitale.com";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: lineItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.variant,
          },
          unit_amount: item.unitAmountCents,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
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
    res.status(500).json({ error: "Checkout failed" });
  }
});

export default router;
