"use client";
import styles from './page.module.css';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function CheckoutPage() {
    const { cart, subtotal } = useCart();
    const [email, setEmail] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const handleCheckout = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setError('');

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: cart,
                    email: email,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Special handling for missing key to help the developer (User)
                if (data.error === 'Stripe configuration missing') {
                    throw new Error('Payment system not configured (Missing Stripe Key).');
                }
                throw new Error(data.error || 'Checkout failed');
            }

            if (data.url) {
                window.location.href = data.url;
            }

        } catch (err) {
            console.error(err);
            setError(err.message);
            setIsProcessing(false);
        }
    };

    if (cart.length === 0) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Your Cart is Empty</h1>
                    <Link href="/" className={styles.link}>Return to Store</Link>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Secure Checkout</h1>

                {error && (
                    <div style={{ padding: '1rem', background: 'rgba(255,0,0,0.1)', border: '1px solid red', color: 'red', marginBottom: '1rem' }}>
                        {error}
                    </div>
                )}

                <div className={styles.grid}>
                    {/* Left Column: Form */}
                    <div className={styles.formColumn}>
                        <div className={styles.express}>
                            <p className={styles.label}>Express Checkout</p>
                            <div className={styles.buttons}>
                                <button className={`${styles.btn} ${styles.apple}`}>Apple Pay</button>
                                <button className={`${styles.btn} ${styles.google}`}>Google Pay</button>
                            </div>
                            <div className={styles.divider}>OR</div>
                        </div>

                        <form className={styles.form} onSubmit={handleCheckout}>
                            <h2 className={styles.sectionTitle}>Contact Information</h2>
                            <p style={{ marginBottom: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
                                You will be redirected to Stripe's secure checkout to securely enter your shipping address and payment details.
                            </p>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <button
                                className={styles.submit}
                                disabled={isProcessing}
                                style={{ marginTop: '2rem' }}
                            >
                                {isProcessing ? 'Processing secure checkout...' : `Continue to Payment ($${subtotal.toFixed(2)})`}
                            </button>
                        </form>

                        <div className={styles.return}>
                            <Link href="/products" className={styles.link}>Return to Store</Link>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className={styles.summaryColumn}>
                        <h2 className={styles.sectionTitle}>Order Summary</h2>
                        <div className={styles.itemsList}>
                            {cart.map((item, idx) => (
                                <div key={idx} className={styles.summaryItem}>
                                    <div className={styles.itemInfo}>
                                        <span className={styles.itemName}>{item.name}</span>
                                        <span className={styles.itemVariant}>{item.variant}</span>
                                        <span className={styles.itemQty}>Qty: {item.quantity}</span>
                                    </div>
                                    <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.summaryTotal}>
                            <span>Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
