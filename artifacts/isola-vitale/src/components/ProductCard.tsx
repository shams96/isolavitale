import { Link } from 'wouter';
import styles from './ProductCard.module.css';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product & { price?: string };
  noLink?: boolean;
}

export default function ProductCard({ product, noLink = false }: ProductCardProps) {
  const displayPrice = product.fullPrice ? `$${product.fullPrice}` : (product.price ?? '');
  const collectionLabel =
    product.collection === 'laboratory' ? 'Laboratory Collection' :
    product.collection === 'daily' ? 'Daily Collection' :
    product.collection === 'chronos' ? 'Cellular Chronos' :
    `${product.collection} Collection`;

  const cardContent = (
    <>
      <div className="u-aspect-ratio-plinth">
        {product.imageSrc && (
          <img
            src={product.imageSrc}
            alt={product.name}
            className="u-image-fit"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          />
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.header}>
          <span className={styles.collection}>{collectionLabel}</span>
          <h3 className={styles.name}>{product.name}</h3>
        </div>

        {product.technologies && (
          <span className={styles.tech}>
            {product.technologies.split(' + ')[0]} +
          </span>
        )}

        <div className={styles.meta}>
          <span className={styles.context}>Refillable System</span>
          <span className={styles.price}>{displayPrice}</span>
        </div>
      </div>
    </>
  );

  if (noLink) {
    return <div className={styles.card}>{cardContent}</div>;
  }

  return (
    <Link href={`/products/${product.slug}`} className={styles.card}>
      {cardContent}
    </Link>
  );
}
