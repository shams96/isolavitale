"use client";
import { useState } from 'react';
import styles from './ProductActions.module.css';
import { useCart } from '@/context/CartContext';

export default function ProductActions({ fullPrice, refillPrice, subscriptionPrice, product }) {
    const [purchaseType, setPurchaseType] = useState('one-time'); // 'one-time' or 'subscription'
    const [vesselType, setVesselType] = useState('full'); // 'full' or 'refill'
    const { addToCart } = useCart();

    // Use subscriptionPrice if provided, otherwise calculate 20% discount
    const subscriptionDiscount = subscriptionPrice || (fullPrice * 0.80);

    const currentPrice = vesselType === 'full'
        ? (purchaseType === 'subscription' ? subscriptionDiscount : fullPrice)
        : (purchaseType === 'subscription' ? (refillPrice * 0.80).toFixed(2) : refillPrice);

    const handleAddToCart = () => {
        addToCart({
            ...product,
            price: currentPrice,
            variant: `${vesselType === 'full' ? 'Signature Vessel' : 'Refill Cartridge'} - ${purchaseType === 'subscription' ? 'Subscribe & Save' : 'One-Time Purchase'}`,
            cartId: Date.now()
        });
    };

    return (
        <div className={styles.container}>
            {/* Vessel Toggle */}
            <div className={styles.toggles}>
                <div
                    className={`${styles.toggle} ${vesselType === 'full' ? styles.active : ''}`}
                    onClick={() => setVesselType('full')}
                >
                    Signature Vessel
                </div>
                <div
                    className={`${styles.toggle} ${vesselType === 'refill' ? styles.active : ''}`}
                    onClick={() => setVesselType('refill')}
                >
                    Refill Cartridge
                </div>
            </div>

            <div className={styles.infoBox}>
                {vesselType === 'full' ? (
                    <p>Hand-polished violet glass vessel + 30ml bio-active core. Designed for infinite reuse.</p>
                ) : (
                    <p>Airless aluminum cartridge. 100% molecularly recyclable. Snaps into your existing vessel.</p>
                )}
            </div>

            {/* Subscription Option */}
            <div className={styles.subscriptionBox}>
                <div
                    className={`${styles.subOption} ${purchaseType === 'one-time' ? styles.subActive : ''}`}
                    onClick={() => setPurchaseType('one-time')}
                >
                    <div className={styles.radio} />
                    <span>One-Time Purchase</span>
                </div>
                <div
                    className={`${styles.subOption} ${purchaseType === 'subscription' ? styles.subActive : ''}`}
                    onClick={() => setPurchaseType('subscription')}
                >
                    <div className={styles.radio} />
                    <span>Subscribe & Save 20%</span>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.priceDisplay}>
                    ${currentPrice}
                </div>

                <button className={styles.button} onClick={handleAddToCart}>
                    {vesselType === 'full' ? 'Add to Collection' : 'Add Refill'}
                </button>
            </div>
        </div>
    );
}
