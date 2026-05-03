"use client";

export const dynamic = 'force-dynamic';

export default function CheckoutSuccessPage({ searchParams }) {
    return (
        <main style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: 'var(--color-ivory)',
            color: 'var(--color-obsidian)'
        }}>
            <div style={{ maxWidth: '600px' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✓</div>
                <h1 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.5rem',
                    marginBottom: '1rem'
                }}>
                    Order Confirmed
                </h1>
                <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.1rem',
                    opacity: 0.8,
                    marginBottom: '2rem',
                    lineHeight: '1.6'
                }}>
                    Thank you for your purchase from Isola Vitale. Your order has been confirmed and will be processed shortly.
                </p>
                <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    opacity: 0.6,
                    marginBottom: '2rem'
                }}>
                    Order ID: {searchParams?.session_id || 'Processing...'}
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a
                        href="/products"
                        style={{
                            fontFamily: 'var(--font-sans)',
                            padding: '1rem 2rem',
                            backgroundColor: 'var(--color-emerald)',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            transition: 'opacity 0.3s'
                        }}
                        onMouseOver={(e) => e.target.style.opacity = '0.9'}
                        onMouseOut={(e) => e.target.style.opacity = '1'}
                    >
                        Continue Shopping
                    </a>
                    <a
                        href="/"
                        style={{
                            fontFamily: 'var(--font-sans)',
                            padding: '1rem 2rem',
                            border: '1px solid var(--color-emerald)',
                            color: 'var(--color-emerald)',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            transition: 'opacity 0.3s'
                        }}
                        onMouseOver={(e) => e.target.style.opacity = '0.7'}
                        onMouseOut={(e) => e.target.style.opacity = '1'}
                    >
                        Return Home
                    </a>
                </div>
            </div>
        </main>
    );
}
