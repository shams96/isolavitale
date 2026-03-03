import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/data/items';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Collections | Isola Vitale',
    description: '3 distinct collections featuring 5 breakthrough cellular technologies. Laboratory-grade efficacy crafted in Italy.',
};

export default function ProductsPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>

                <div className={styles.header}>
                    <span className={styles.label}>
                        The Collections
                    </span>
                    <h1 className={styles.title}>
                        Cellular Vitality. Isola Crafted.
                    </h1>
                </div>

                <div className="u-product-grid">
                    {PRODUCTS.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>

            </div>
        </main>
    );
}
