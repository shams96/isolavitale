import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/data/items';
import FadeIn from '@/components/FadeIn';
import styles from '@/app/products/page.module.css';

export default function ProductsPage() {
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
