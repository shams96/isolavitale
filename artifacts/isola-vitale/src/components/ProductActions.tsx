import { useState } from 'react';
import styles from './ProductActions.module.css';
import { useCart } from '@/context/CartContext';

interface ProductActionsProps {
  fullPrice: number;
  refillPrice: number;
  subscriptionPrice?: number;
  product: any;
}

export default function ProductActions({ fullPrice, refillPrice, product }: ProductActionsProps) {
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>('one-time');
  const [vesselType, setVesselType] = useState<'full' | 'refill'>('full');
  const { addToCart } = useCart();

  const DISCOUNT = 0.20;
  const basePrice = vesselType === 'full' ? fullPrice : refillPrice;
  const displayPrice = purchaseType === 'subscription'
    ? Math.round(basePrice * (1 - DISCOUNT))
    : basePrice;
  const savings = basePrice - displayPrice;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      price: displayPrice,
      fullPrice: basePrice,
      isSubscription: purchaseType === 'subscription',
      variant: vesselType === 'full' ? 'Signature Vessel' : 'Refill Cartridge',
      cartId: Date.now() + Math.random()
    });
  };

  return (
    <div className={styles.container}>

      {/* Vessel type tabs */}
      <div className={styles.vesselTabs}>
        <button
          className={`${styles.vesselTab} ${vesselType === 'full' ? styles.vesselTabActive : ''}`}
          onClick={() => setVesselType('full')}
        >
          Signature Vessel
        </button>
        <button
          className={`${styles.vesselTab} ${vesselType === 'refill' ? styles.vesselTabActive : ''}`}
          onClick={() => setVesselType('refill')}
        >
          Refill Cartridge
        </button>
      </div>

      <p className={styles.vesselInfo}>
        {vesselType === 'full'
          ? 'Hand-polished violet glass vessel + 30ml bio-active core. Designed for infinite reuse.'
          : 'Airless aluminum cartridge — 100% recyclable. Snaps into your existing vessel.'}
      </p>

      {/* im8health-style purchase toggle */}
      <div className={styles.purchaseToggle}>
        <div
          className={`${styles.purchaseOption} ${purchaseType === 'one-time' ? styles.purchaseOptionActive : ''}`}
          onClick={() => setPurchaseType('one-time')}
          role="button"
        >
          <div className={styles.radioCircle}>
            {purchaseType === 'one-time' && <div className={styles.radioDot} />}
          </div>
          <div className={styles.purchaseOptionText}>
            <span className={styles.purchaseOptionLabel}>One-Time Purchase</span>
          </div>
          <span className={styles.purchaseOptionPrice}>${basePrice}</span>
        </div>

        <div
          className={`${styles.purchaseOption} ${styles.subscribeOption} ${purchaseType === 'subscription' ? styles.purchaseOptionActive : ''}`}
          onClick={() => setPurchaseType('subscription')}
          role="button"
        >
          <div className={styles.radioCircle}>
            {purchaseType === 'subscription' && <div className={styles.radioDot} />}
          </div>
          <div className={styles.purchaseOptionText}>
            <span className={styles.purchaseOptionLabel}>
              Subscribe &amp; Save
              <span className={styles.saveBadge}>20% Off</span>
            </span>
            <span className={styles.purchaseOptionSub}>Deliver every 30 days · Cancel anytime</span>
          </div>
          <span className={styles.purchaseOptionPrice}>${Math.round(basePrice * (1 - DISCOUNT))}</span>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.ctaRow}>
        <div className={styles.priceBlock}>
          <span className={styles.currentPrice}>${displayPrice}</span>
          {purchaseType === 'subscription' && (
            <>
              <span className={styles.originalPrice}>${basePrice}</span>
              <span className={styles.savingsChip}>Save ${savings}</span>
            </>
          )}
        </div>
        <button className={styles.addButton} onClick={handleAddToCart}>
          {vesselType === 'full' ? 'Add to Ritual' : 'Add Refill'}
        </button>
      </div>

    </div>
  );
}
