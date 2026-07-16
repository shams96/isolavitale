"use client";
import { useState } from 'react';
import styles from './ProductActions.module.css';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/formatPrice';

export default function ProductActions({ fullPrice, refillPrice, subscriptionPrice, product }) {
    const [purchaseType, setPurchaseType] = useState('90-day'); // '90-day', '30-day', 'one-time'
    const [vesselType, setVesselType] = useState('full'); // 'full' or 'refill'
    const { addToCart } = useCart();

    // Base prices
    const isFull = vesselType === 'full';
    const basePrice = isFull ? fullPrice : refillPrice;
    
    // Default subscription price for Full
    const defaultFullSub = subscriptionPrice || (fullPrice * 0.80);
    // Subscription price for Refill
    const refillSub = refillPrice * 0.80;

    // Tier 1: 90-Day (Billed Quarterly)
    const price90DayTotal = isFull 
        ? (product.price90Day || (defaultFullSub * 3 * 0.9)) 
        : (refillSub * 3 * 0.9);
    
    // Tier 2: 30-Day
    const price30DayTotal = isFull 
        ? (product.price30Day || defaultFullSub) 
        : refillSub;

    // Tier 3: One-Time
    const priceOneTimeTotal = isFull 
        ? (product.priceOneTime || (basePrice * 1.25)) 
        : (basePrice * 1.25);

    // Formatted Strings for Display
    const price90DayMonthly = formatPrice(price90DayTotal / 3);
    const price30Day = formatPrice(price30DayTotal);
    const priceOneTime = formatPrice(priceOneTimeTotal);

    let currentPriceDisplay = price90DayMonthly;
    let currentPriceTotal = price90DayTotal;
    
    if (purchaseType === '30-day') {
        currentPriceDisplay = price30Day;
        currentPriceTotal = price30DayTotal;
    } else if (purchaseType === 'one-time') {
        currentPriceDisplay = priceOneTime;
        currentPriceTotal = priceOneTimeTotal;
    }

    const handleAddToCart = () => {
        let variantText = vesselType === 'full' ? 'Signature Vessel' : 'Refill Cartridge';
        if (purchaseType === '90-day') variantText += ' - 90-Day Protocol';
        if (purchaseType === '30-day') variantText += ' - 30-Day Routine';
        if (purchaseType === 'one-time') variantText += ' - One-Time Purchase';

        addToCart({
            ...product,
            price: currentPriceTotal,
            variant: variantText,
            purchaseType, // Pass purchase type to cart context
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

            {/* 3-Tier Subscription Box */}
            <div className={styles.subscriptionBox}>
                {/* Tier 1 */}
                <div
                    className={`${styles.subOption} ${styles.tier1} ${purchaseType === '90-day' ? styles.subActive : ''}`}
                    onClick={() => setPurchaseType('90-day')}
                >
                    <div className={styles.radioWrapper}>
                        <div className={styles.radio} />
                    </div>
                    <div className={styles.tierInfo}>
                        <span className={styles.tierTitle}>Founder's 90-Day Cellular Reset</span>
                        <span className={styles.bestValueBadge}>Best Value</span>
                    </div>
                    <div className={styles.tierPrice}>
                        <strong>${price90DayMonthly}/mo</strong>
                        <span className={styles.billedInfo}>Billed quarterly (${formatPrice(price90DayTotal)})</span>
                    </div>
                </div>

                {/* Tier 2 */}
                <div
                    className={`${styles.subOption} ${purchaseType === '30-day' ? styles.subActive : ''}`}
                    onClick={() => setPurchaseType('30-day')}
                >
                    <div className={styles.radioWrapper}>
                        <div className={styles.radio} />
                    </div>
                    <div className={styles.tierInfo}>
                        <span className={styles.tierTitle}>Monthly Maintenance</span>
                    </div>
                    <div className={styles.tierPrice}>
                        <strong>${price30Day}/mo</strong>
                    </div>
                </div>

                {/* Tier 3 */}
                <div
                    className={`${styles.subOption} ${purchaseType === 'one-time' ? styles.subActive : ''}`}
                    onClick={() => setPurchaseType('one-time')}
                >
                    <div className={styles.radioWrapper}>
                        <div className={styles.radio} />
                    </div>
                    <div className={styles.tierInfo}>
                        <span className={styles.tierTitle}>One-Time Purchase</span>
                    </div>
                    <div className={styles.tierPrice}>
                        <strong>${priceOneTime}</strong>
                    </div>
                </div>
            </div>

            {/* Loss Aversion Banner */}
            {purchaseType === 'one-time' && (
                <div className={styles.lossAversionBanner}>
                    ⚠️ You are opting out of the $99 Welcome Gift and Free Shipping.
                </div>
            )}
            
            {/* 90-Day Guarantee Badge */}
            <div className={styles.guaranteeBadge}>
                <span className={styles.shieldIcon}>🛡️</span>
                <span>90-Day Guarantee: Feel the Reset or full refund.</span>
            </div>

            <div className={styles.footer}>
                <div className={styles.priceDisplay}>
                    ${currentPriceDisplay}{purchaseType !== 'one-time' && <span className={styles.moSuffix}>/mo</span>}
                </div>

                <button className={styles.button} onClick={handleAddToCart}>
                    {vesselType === 'full' ? 'Add to Ritual' : 'Add Refill'}
                </button>
            </div>
        </div>
    );
}
