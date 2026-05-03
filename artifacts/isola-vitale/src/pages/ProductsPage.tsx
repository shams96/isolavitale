import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/data/items';
import FadeIn from '@/components/FadeIn';
import styles from '@/app/products/page.module.css';
import { usePageSeo } from '@/hooks/usePageSeo';
import type { Product } from '@/types/product';

const typedProducts = PRODUCTS as unknown as Product[];

export default function ProductsPage() {
  usePageSeo({
    title: 'Shop All Skincare',
    description: 'Explore all three Isola Vitale collections — Laboratory, Daily, and Cellular Chronos. Clinically engineered Italian skincare in refillable luxury vessels.',
  });

  return (
    <main className={`${styles.main} env-white`}>
      <div className={styles.container}>
        <header className={styles.header}>
          <FadeIn>
            <span className={styles.label}>The Collections</span>
            <h1 className={styles.title}>
              Cellular Vitality<br />
              <span className={styles.titleAccent}>Isola Crafted</span>
            </h1>
            <div className={styles.divider} />
          </FadeIn>
        </header>

        <div className="u-product-grid">
          {typedProducts.map(product => (
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
