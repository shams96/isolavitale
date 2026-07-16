"use client";
import { useCart } from '@/context/CartContext';
import styles from './CartDrawer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { PRODUCTS } from '@/data/items';
import { formatPrice } from '@/lib/formatPrice';

export default function CartDrawer() {
    const { cart, isDrawerOpen, toggleDrawer, updateQuantity, removeFromCart, subtotal, addToCart } = useCart();
    const drawerRef = useRef(null);

    // Gift Progress Logic
    const has90Day = cart.some(item => item.purchaseType === '90-day');
    const progress = has90Day ? 100 : 50;

    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isDrawerOpen]);

    if (!isDrawerOpen) return null;

    // Smart Upsell Logic

    // Find missing items from the system
    const systemIds = PRODUCTS.map(p => p.id);
    const cartIds = cart.map(item => item.id);

    // Simple logic: Recommend the first product from PRODUCTS that isn't in the cart
    const recommendedProduct = PRODUCTS.find(p => !cartIds.includes(p.id));

    let upsellItem = recommendedProduct || PRODUCTS[0];
    let upsellMessage = "Complete the Protocol";

    if (recommendedProduct) {
        if (recommendedProduct.id.includes('cream')) upsellMessage = "Seal the Barrier";
        if (recommendedProduct.id.includes('spf')) upsellMessage = "Protect Your Investment";
        if (recommendedProduct.id.includes('cleanser')) upsellMessage = "Start Pure";
    }

    // Adapt structure for the UI
    const mappedUpsell = {
        id: upsellItem.id + '-upsell',
        cartId: upsellItem.id, // For checking existence
        name: upsellItem.name,
        price: upsellItem.fullPrice,
        imageSrc: upsellItem.imageSrc || upsellItem.image,
        variant: 'Standard'
    };

    const upsells = [mappedUpsell];

    return (
        <>
            <div className={styles.overlay} onClick={toggleDrawer} />
            <div className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`} ref={drawerRef}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Your Ritual ({cart.length})</h2>
                    <button onClick={toggleDrawer} className={styles.close}>&times;</button>
                </div>

                {/* Gift Progress Bar */}
                <div className={styles.shippingBar}>
                    {!has90Day ? (
                        <p className={styles.shippingText}>Add the <span>90-Day Protocol</span> to unlock the Luxury Silk-Screened Applicator.</p>
                    ) : (
                        <p className={styles.shippingText}>✨ <span>Luxury Silk-Screened Applicator</span> unlocked.</p>
                    )}
                    <div className={styles.progressBar}>
                        <div className={`${styles.progressFill} ${has90Day ? styles.progressComplete : ''}`} style={{ width: `${progress}%` }} />
                    </div>
                </div>

                <div className={styles.items}>
                    {cart.length === 0 ? (
                        <div className={styles.empty}>Your vessel is empty.</div>
                    ) : (
                        cart.map((item, idx) => (
                            <div key={`${item.id}-${idx}`} className={styles.item}>
                                <div className={styles.imageContainer}>
                                    <Image src={item.imageSrc || item.image} alt={item.name} fill className={styles.image} />
                                </div>
                                <div className={styles.details}>
                                    <div className={styles.row}>
                                        <h3 className={styles.itemName}>{item.name}</h3>
                                        <span className={styles.itemPrice}>${formatPrice(item.price)}</span>
                                    </div>
                                    <p className={styles.variant}>{item.variant}</p>
                                    <div className={styles.actions}>
                                        <div className={styles.quantity}>
                                            {!item.isAutoGift && <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>-</button>}
                                            <span>{item.quantity}</span>
                                            {!item.isAutoGift && <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>+</button>}
                                        </div>
                                        {!item.isAutoGift && <button onClick={() => removeFromCart(item.cartId)} className={styles.remove}>Remove</button>}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* In-Cart Upsells */}
                <div className={styles.upsells}>
                    <h4 className={styles.upsellTitle}>{upsellMessage}</h4>
                    <div className={styles.upsellList}>
                        {upsells.map(upsell => (
                            <div key={upsell.id} className={styles.upsellItem}>
                                <div className={styles.upsellImage}>
                                    <Image src={upsell.imageSrc || upsell.image} alt={upsell.name} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div className={styles.upsellInfo}>
                                    <p className={styles.upsellName}>{upsell.name}</p>
                                    <p className={styles.upsellPrice}>${formatPrice(upsell.price)}</p>
                                    <button
                                        className={styles.upsellAdd}
                                        onClick={() => addToCart({ ...upsell, cartId: Date.now() + Math.random(), variant: upsell.variant })}
                                    >
                                        + Add
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.subtotal}>
                        <span>Subtotal</span>
                        <span>${formatPrice(subtotal)}</span>
                    </div>
                    
                    {/* Ambassador Trust Bar */}
                    <div className={styles.trustBar}>
                        <p className={styles.quote}>"As a specialist in cellular longevity, I trust Chiarelle because the third-party testing ensures clinical-grade purity in every jar."</p>
                        <p className={styles.author}>— Dr. E. Rossi, Longevity Specialist</p>
                    </div>

                    <Link href="/checkout" onClick={toggleDrawer} className={styles.checkoutBtn}>
                        Proceed to Secure Checkout
                    </Link>

                    {/* Third-Party Testing Transparency */}
                    <div className={styles.guaranteeLinks}>
                        <Link href="/purity" className={styles.purityLink}>View Batch Results (Third-Party Tested)</Link>
                        <p className={styles.disclaimer}>Shipping & taxes calculated at checkout.</p>
                    </div>
                </div>
            </div >
        </>
    );
}
