import { useCart } from '@/context/CartContext';
import styles from './CartDrawer.module.css';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { PRODUCTS } from '@/data/items';

const SUBSCRIPTION_DISCOUNT = 0.20;
const FREE_SHIPPING_THRESHOLD = 200;

export default function CartDrawer() {
  const { cart, isDrawerOpen, toggleDrawer, updateQuantity, removeFromCart, subtotal, addToCart, toggleSubscription } = useCart();

  const [progress, setProgress] = useState(0);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  useEffect(() => {
    setProgress(Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100));
  }, [subtotal]);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  const cartIds = cart.map(item => item.id);
  const recommendedProduct = PRODUCTS.find(p => !cartIds.includes(p.id));
  const upsellItem = recommendedProduct || PRODUCTS[0];
  let upsellLabel = 'Pair It With';
  if (upsellItem?.id?.includes('spf')) upsellLabel = 'Protect Your Investment';
  if (upsellItem?.id?.includes('cream')) upsellLabel = 'Seal the Barrier';
  if (upsellItem?.id?.includes('cleanser')) upsellLabel = 'Start Pure';

  const subscriptionItems = cart.filter(item => item.isSubscription);
  const totalSavings = subscriptionItems.reduce((acc, item) => {
    const originalPrice = item.fullPrice || item.price / (1 - SUBSCRIPTION_DISCOUNT);
    return acc + ((originalPrice - item.price) * item.quantity);
  }, 0);

  const itemCount = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <>
      <div className={styles.overlay} onClick={toggleDrawer} />
      <div className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}>

        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Your Ritual{itemCount > 0 ? ` (${itemCount})` : ''}</h2>
          <button onClick={toggleDrawer} className={styles.close} aria-label="Close cart">✕</button>
        </div>

        {/* Subscribe & Save Banner */}
        <div className={styles.saveBanner}>
          <p className={styles.saveBannerText}>
            Subscribe below &amp; <strong>Save 20%</strong> — Free Shipping on All Orders
          </p>
        </div>

        {/* Free Shipping Progress */}
        <div className={styles.shippingBar}>
          {remaining > 0 ? (
            <p className={styles.shippingText}>
              Add <span>${remaining.toFixed(0)}</span> more for complimentary shipping
            </p>
          ) : (
            <p className={styles.shippingUnlocked}>✓ Complimentary shipping unlocked</p>
          )}
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Cart Items */}
        <div className={styles.items}>
          {cart.length === 0 ? (
            <div className={styles.empty}>
              <span style={{ fontSize: '2rem', opacity: 0.3 }}>◎</span>
              <span>Your ritual awaits.</span>
            </div>
          ) : (
            cart.map((item, idx) => {
              const fullPrice = item.fullPrice || item.price;
              const subPrice = item.isSubscription
                ? item.price
                : Math.round(fullPrice * (1 - SUBSCRIPTION_DISCOUNT));
              const displayPrice = item.isSubscription ? item.price : item.price;

              return (
                <div key={`${item.cartId}-${idx}`} className={styles.item}>
                  <div className={styles.imageContainer}>
                    <img src={item.imageSrc || item.image} alt={item.name} />
                  </div>
                  <div className={styles.details}>
                    <span className={styles.itemName}>{item.name}</span>
                    {item.variant && <span className={styles.variant}>{item.variant}</span>}

                    {/* Per-item subscription toggle */}
                    <div className={styles.itemSubToggle}>
                      <button
                        className={`${styles.itemSubBtn} ${!item.isSubscription ? styles.itemSubBtnActive : ''}`}
                        onClick={() => item.isSubscription && toggleSubscription(item.cartId)}
                      >
                        One-Time
                      </button>
                      <button
                        className={`${styles.itemSubBtn} ${item.isSubscription ? styles.itemSubBtnActive : ''}`}
                        onClick={() => !item.isSubscription && toggleSubscription(item.cartId)}
                      >
                        Subscribe — Save 20%
                      </button>
                    </div>

                    {/* Price */}
                    <div className={styles.priceRow}>
                      <span className={styles.itemPrice}>
                        ${(displayPrice * item.quantity).toFixed(0)}
                      </span>
                      {item.isSubscription && (
                        <>
                          <span className={styles.itemPriceStrike}>
                            ${(fullPrice * item.quantity).toFixed(0)}
                          </span>
                          <span className={styles.saveBadge}>20% off</span>
                        </>
                      )}
                    </div>

                    {/* Quantity + Remove */}
                    <div className={styles.actions}>
                      <div className={styles.quantity}>
                        <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className={styles.remove}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Upsell */}
        {upsellItem && cart.length > 0 && (
          <div className={styles.upsells}>
            <div className={styles.upsellHeader}>
              <span className={styles.upsellTitle}>{upsellLabel}</span>
              <div className={styles.upsellLine} />
            </div>
            <div className={styles.upsellItem}>
              <div className={styles.upsellImage}>
                <img src={upsellItem.imageSrc || (upsellItem as any).image} alt={upsellItem.name} />
              </div>
              <div className={styles.upsellInfo}>
                <span className={styles.upsellLabel}>
                  {upsellItem.collection === 'laboratory' ? 'Laboratory Collection' : 'Daily Collection'}
                </span>
                <p className={styles.upsellName}>{upsellItem.name}</p>
                <p className={styles.upsellPrice}>${upsellItem.fullPrice}</p>
              </div>
              <button
                className={styles.upsellAdd}
                onClick={() => addToCart({
                  ...upsellItem,
                  price: upsellItem.fullPrice,
                  cartId: Date.now() + Math.random(),
                  variant: 'Signature Vessel'
                })}
              >
                + Add
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className={styles.footer}>
          {totalSavings > 0 && (
            <div className={styles.savings}>
              <span className={styles.savingsLabel}>Your Savings</span>
              <span className={styles.savingsAmount}>−${totalSavings.toFixed(0)}</span>
            </div>
          )}

          <div className={styles.subtotalRow}>
            <span className={styles.subtotalLabel}>Subtotal</span>
            <span className={styles.subtotalAmount}>${subtotal.toFixed(0)}</span>
          </div>

          <Link href="/checkout" onClick={toggleDrawer} className={styles.checkoutBtn}>
            Proceed to Checkout
            <span className={styles.checkoutArrow}>→</span>
          </Link>

          <p className={styles.disclaimer}>Taxes & shipping calculated at checkout</p>

          <div className={styles.trustBadges}>
            <span className={styles.trustBadge}>🔒 Secure Checkout</span>
            <span className={styles.trustBadge}>↩ Free Returns</span>
            <span className={styles.trustBadge}>♻ Refillable</span>
          </div>
        </div>
      </div>
    </>
  );
}
