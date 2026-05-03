import ProductCard from '@/components/ProductCard';
export const dynamic = 'force-dynamic';
import { getProductsByCollection } from '@/data/items';
import styles from '../products/page.module.css';
import FadeIn from '@/components/FadeIn';

export const metadata = {
    title: 'Daily Collection | Isola Vitale',
    description: 'Effortless luxury skincare for daily care. Advanced technology in comfortable formulations. €85-200.',
};

export default function DailyCollectionPage() {
    const products = getProductsByCollection('daily');

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <FadeIn>
                    <div className={styles.header}>
                        <span className={styles.label}>
                            Daily Collection
                        </span>
                        <h1 className={styles.title}>
                            Effortless Luxury Skincare
                        </h1>
                        <p style={{
                            fontFamily: 'var(--font-sans)',
                            opacity: '0.8',
                            maxWidth: '600px',
                            margin: '2rem auto 0',
                            lineHeight: '1.6',
                            textAlign: 'center'
                        }}>
                            Daily luxury care with advanced technology in comfortable, wearable formulations.
                            Perfect for those seeking effortless sophistication.
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
