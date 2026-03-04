import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { createClient } from '@sanity/client';
import { sendOrderConfirmation } from '@/lib/email';

export const dynamic = 'force-dynamic';

// Helper to get Sanity client with write permissions
function getSanityClient() {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
    const token = process.env.SANITY_API_TOKEN;

    if (!projectId || !dataset || !token) {
        throw new Error('Missing Sanity configuration (projectId, dataset, or token)');
    }

    return createClient({
        projectId,
        dataset,
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
        token,
        useCdn: false,
    });
}

export async function POST(req) {
    try {
        const body = await req.text();
        const headersList = headers();
        const signature = headersList.get('stripe-signature');

        if (!signature) {
            return NextResponse.json(
                { error: 'Missing Stripe signature' },
                { status: 400 }
            );
        }

        // Initialize Stripe
        const { default: Stripe } = await import('stripe');
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-11-20.acacia',
        });

        // Verify webhook signature
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        let event;

        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        } catch (err) {
            console.error('Webhook signature verification failed:', err.message);
            return NextResponse.json(
                { error: `Webhook Error: ${err.message}` },
                { status: 400 }
            );
        }

        // Handle different event types
        switch (event.type) {
            case 'checkout.session.completed':
                await handleCheckoutCompleted(event.data.object, stripe);
                break;

            case 'payment_intent.succeeded':
                console.log('Payment succeeded:', event.data.object.id);
                break;

            case 'payment_intent.payment_failed':
                console.log('Payment failed:', event.data.object.id);
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook handler error:', error);
        return NextResponse.json(
            { error: error.message || 'Webhook processing failed' },
            { status: 500 }
        );
    }
}

async function handleCheckoutCompleted(session, stripe) {
    try {
        console.log('Processing checkout session:', session.id);

        // Retrieve full session with line items
        const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ['line_items', 'customer', 'shipping_details'],
        });

        // Get line items
        const lineItems = fullSession.line_items?.data || [];

        // Generate order number
        const orderNumber = `AUR-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

        // Create order document in Sanity
        const orderDoc = {
            _type: 'order',
            orderNumber,
            stripeSessionId: session.id,
            stripePaymentIntentId: session.payment_intent,
            status: 'processing',
            customer: {
                email: session.customer_details?.email || session.customer_email,
                name: session.customer_details?.name || '',
                phone: session.customer_details?.phone || '',
            },
            shippingAddress: fullSession.shipping_details?.address
                ? {
                    line1: fullSession.shipping_details.address.line1 || '',
                    line2: fullSession.shipping_details.address.line2 || '',
                    city: fullSession.shipping_details.address.city || '',
                    state: fullSession.shipping_details.address.state || '',
                    postalCode: fullSession.shipping_details.address.postal_code || '',
                    country: fullSession.shipping_details.address.country || '',
                }
                : null,
            items: lineItems.map((item) => ({
                name: item.description,
                quantity: item.quantity,
                price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
                variant: item.price?.product?.metadata?.variant || 'full',
            })),
            subtotal: session.amount_subtotal ? session.amount_subtotal / 100 : 0,
            shippingCost: session.total_details?.amount_shipping
                ? session.total_details.amount_shipping / 100
                : 0,
            tax: session.total_details?.amount_tax
                ? session.total_details.amount_tax / 100
                : 0,
            total: session.amount_total ? session.amount_total / 100 : 0,
            currency: session.currency || 'usd',
            createdAt: new Date().toISOString(),
        };

        // Create order in Sanity
        const createdOrder = await getSanityClient().create(orderDoc);
        console.log('Order created in Sanity:', createdOrder._id);

        // Send order confirmation email
        await sendOrderConfirmation(orderDoc);

        // TODO: Update product inventory (implement when ready)
        // await updateInventory(lineItems);

        return createdOrder;
    } catch (error) {
        console.error('Error handling checkout completion:', error);
        throw error;
    }
}
