import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const body = await req.json();
        const { items } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
        }

        const secretKey = process.env.STRIPE_SECRET_KEY;

        // Check if Stripe key is configured
        if (!secretKey) {
            console.error("Stripe Secret Key is missing.");
            return NextResponse.json({
                error: 'Stripe configuration missing',
                message: 'Please add STRIPE_SECRET_KEY to environment'
            }, { status: 500 });
        }

        // Initialize Stripe inside the handler using dynamic import
        const { default: Stripe } = await import('stripe');
        const stripe = new Stripe(secretKey, {
            apiVersion: '2024-11-20.acacia',
        });

        // Convert cart items to Stripe line items
        const line_items = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    description: item.variant || item.technologies || '',
                    images: item.imageSrc ? [`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${item.imageSrc}`] : [],
                    metadata: {
                        productId: item.productId || item.id || '',
                        variant: item.variant || 'full',
                        sku: item.sku || ''
                    }
                },
                unit_amount: Math.round(parseFloat(item.price) * 100), // Convert to cents
            },
            quantity: item.quantity || 1,
        }));

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/products`,
            shipping_address_collection: {
                allowed_countries: ['IT', 'FR', 'DE', 'ES', 'GB', 'US', 'CA'],
            },
            billing_address_collection: 'required',
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'usd',
                        },
                        display_name: 'Free Standard Shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 1500, // $15
                            currency: 'usd',
                        },
                        display_name: 'Express Shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 2,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 3,
                            },
                        },
                    },
                },
            ],
            allow_promotion_codes: true,
            metadata: {
                source: 'IsolaVitale',
                orderType: 'standard'
            }
        });

        return NextResponse.json({ url: session.url, sessionId: session.id });

    } catch (error) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({
            error: error.message || 'Payment processing failed'
        }, { status: 500 });
    }
}
