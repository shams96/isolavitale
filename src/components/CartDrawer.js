"use client";
import { useCart } from '@/context/CartContext';
import styles from './CartDrawer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function CartDrawer() {
    const { cart, isDrawerOpen, toggleDrawer, updateQuantity, removeFromCart, subtotal, addToCart } = useCart();
    const drawerRef = useRef(null);

    // Free Shipping Logic
    const FREE_SHIPPING_THRESHOLD = 150;
    const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

    // Smart Upsell Logic
    const { PRODUCTS } = require('@/data/items'); // Dynamic import or move to top if client side allows

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


    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isDrawerOpen]);

    if (!isDrawerOpen) return null;

    return (
        <>
            <div className={styles.overlay} onClick={toggleDrawer} />
            <div className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`} ref={drawerRef}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Your Ritual ({cart.length})</h2>
                    <button onClick={toggleDrawer} className={styles.close}>&times;</button>
                </div>

                {/* Free Shipping Bar */}
                <div className={styles.shippingBar}>
                    {remaining > 0 ? (
                        <p className={styles.shippingText}>You are <span>${remaining.toFixed(2)}</span> away from complimentary shipping.</p>
                    ) : (
                        <p className={styles.shippingText}>Complimentary shipping unlocked.</p>
                    )}
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
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
                                        <span className={styles.itemPrice}>${item.price}</span>
                                    </div>
                                    <p className={styles.variant}>{item.variant}</p>
                                    <div className={styles.actions}>
                                        <div className={styles.quantity}>
                                            <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>+</button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.cartId)} className={styles.remove}>Remove</button>
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
                                    <p className={styles.upsellPrice}>${upsell.price}</p>
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
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <Link href="/checkout" onClick={toggleDrawer} className={styles.checkoutBtn}>
                        Proceed to Checkout
                    </Link>
                    <p className={styles.disclaimer}>Shipping & taxes calculated at checkout.</p>
                </div>
            </div >
        </>
    );
}
