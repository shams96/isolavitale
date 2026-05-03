import { Link } from 'wouter';
import styles from './ProductCard.module.css';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product & { price?: string };
  noLink?: boolean;
}

const STARS = '★★★★★';

export default function ProductCard({ product, noLink = false }: ProductCardProps) {
  const displayPrice = product.fullPrice ? `$${product.fullPrice}` : (product.price ?? '');
  const collectionLabel =
    product.collection === 'laboratory' ? 'Laboratory Collection' :
    product.collection === 'daily'      ? 'Daily Collection'      :
    product.collection === 'chronos'    ? 'Cellular Chronos'      :
    `${product.collection} Collection`;

  const techLine = product.technologies
    ? product.technologies.split(' + ').slice(0, 2).join(' + ')
    : null;

  const cardContent = (
    <>
      <div className={`u-aspect-ratio-plinth ${styles.imageWrap}`}>
        {product.imageSrc && (
          <img
            src={product.imageSrc}
            alt={product.name}
            className="u-image-fit"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          />
        )}
        <div className={styles.ctaOverlay}>
          <span className={styles.ctaBtn}>Add to Ritual</span>
        </div>
      </div>

      <div className={styles.info}>
        <span className={styles.collection}>{collectionLabel}</span>
        <h3 className={styles.name}>{product.name}</h3>

        <div className={styles.ratingRow}>
          <span className={styles.stars}>{STARS}</span>
          <span className={styles.ratingCount}>4.8</span>
        </div>

        {techLine && (
          <span className={styles.tech}>{techLine}</span>
        )}

        <div className={styles.priceRow}>
          <span className={styles.price}>{displayPrice}</span>
          {product.fullPrice && (
            <span className={styles.subscribe}>
              or from ${Math.round(product.fullPrice * 0.8)}/mo
            </span>
          )}
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
