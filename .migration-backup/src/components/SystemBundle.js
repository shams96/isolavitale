"use client";
import Image from 'next/image';
import styles from './SystemBundle.module.css';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { getProductBySlug } from '@/data/items';

export default function SystemBundle() {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const bundleItems = [
            getProductBySlug('the-atmospheric-mist'),
            getProductBySlug('the-cellular-essence'),
            getProductBySlug('the-comfort-cream')
        ].filter(Boolean);

        // Calculate total price from individual items
        const totalPrice = bundleItems.reduce((sum, item) => sum + item.price, 0);

        // Add the bundle as a single item to the cart, referencing the new product IDs
        addToCart({
            id: 'isola-vitale-biosphere-system-bundle', // New bundle ID
            name: 'The Isola Vitale System', // New bundle name
            price: 580, // Keep the bundle price as specified, or calculate from items
            imageSrc: '/biosphere-system.png',
            variant: 'Complete Protocol (Mist + Essence + Cream)', // Updated variant description
            quantity: 1,
        });
    };

    return (
        <section className={styles.container}>
            <div className={styles.hero}>
                <div className={styles.imageWrapper}>
                    <Image src="/biosphere-system.png" alt="The Biosphere System" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.details}>
                    <span className={styles.pretitle}>The Protocol</span>
                    <h1 className={styles.title}>The Biosphere™ System</h1>
                    <p className={styles.description}>
                        A closed-loop regimen designed to arrest cellular exhaustion.
                        Bio-adaptive intelligence meets barrier-fortification.
                    </p>

                    <div className={styles.priceBlock}>
                        <span className={styles.price}>$580</span>
                        <span className={styles.saving}>Complimentary Refills Included (Save $120)</span>
                    </div>

                    <button className={styles.addButton} onClick={handleAddToCart}>
                        Acquire System — $580
                    </button>
                </div>
            </div>

            <div className={styles.steps}>
                <div className={styles.stepRow}>
                    <span className={styles.stepNum}>01</span>
                    <h3 className={styles.stepName}>Multi-Hydration Mist</h3>
                    <Link href="/products/aura-biosphere-multi-hydration-mist" className={styles.stepAction}>Explore Formulation</Link>
                </div>
                <div className={styles.stepRow}>
                    <span className={styles.stepNum}>02</span>
                    <h3 className={styles.stepName}>Peptide Renewal Essence</h3>
                    <Link href="/products/aura-biosphere-peptide-renewal-essence" className={styles.stepAction}>Explore Formulation</Link>
                </div>
                <div className={styles.stepRow}>
                    <span className={styles.stepNum}>03</span>
                    <h3 className={styles.stepName}>Barrier Repair Cream</h3>
                    <Link href="/products/aura-biosphere-barrier-repair-cream" className={styles.stepAction}>Explore Formulation</Link>
                </div>
            </div>
        </section>
    );
}
