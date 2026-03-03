import ProductCard from '@/components/ProductCard';
export const dynamic = 'force-dynamic';
import { getProductsByCollection } from '@/data/items';
import styles from '../products/page.module.css';
import FadeIn from '@/components/FadeIn';

export const metadata = {
    title: 'Cellular Chronos Collection | Isola Vitale',
    description: 'Age-specific precision skincare. Formulations optimized for your exact life stage. €95-290.',
};

export default function CellularChronosPage() {
    const products = getProductsByCollection('chronos');

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <FadeIn>
                    <div className={styles.header}>
                        <span className={styles.label}>
                            Cellular Chronos Collection
                        </span>
                        <h1 className={styles.title}>
                            Age-Specific Precision Skincare
                        </h1>
                        <p style={{
                            fontFamily: 'var(--font-sans)',
                            opacity: '0.8',
                            maxWidth: '600px',
                            margin: '2rem auto 0',
                            lineHeight: '1.6',
                            textAlign: 'center'
                        }}>
                            Formulations precisely calibrated for your skin&apos;s metabolic needs at every life stage.
                            From prevention to restoration, optimized for ages 13-50+.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delay={200}>
                    <div className="u-product-grid">
                        {products.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
