import ProductCard from '@/components/ProductCard';
export const dynamic = 'force-dynamic';
import { getProductsByCollection } from '@/data/items';
import styles from '../page.module.css';
import FadeIn from '@/components/FadeIn';

export const metadata = {
    title: 'Laboratory Collection | Isola Vitale',
    description: 'Advanced clinical formulations with breakthrough cellular technologies. €120-380.',
};

export default function LaboratoryCollectionPage() {
    const products = getProductsByCollection('laboratory');

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <FadeIn>
                    <div className={styles.header}>
                        <span className={styles.label}>
                            Laboratory Collection
                        </span>
                        <h1 className={styles.title}>
                            Advanced Clinical Formulations
                        </h1>
                        <p style={{
                            fontFamily: 'var(--font-sans)',
                            opacity: '0.8',
                            maxWidth: '600px',
                            margin: '2rem auto 0',
                            lineHeight: '1.6',
                            textAlign: 'center'
                        }}>
                            Our most advanced formulations featuring the complete technology matrix.
                            Clinical-grade concentrations for transformative results.
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
