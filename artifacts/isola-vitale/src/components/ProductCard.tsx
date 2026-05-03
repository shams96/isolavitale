import { Link } from 'wouter';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: any;
  noLink?: boolean;
}

export default function ProductCard({ product, noLink = false }: ProductCardProps) {
  const cardContent = (
    <>
      <div className="u-aspect-ratio-plinth">
        {(product.imageSrc || product.image) && (
          <img
            src={product.imageSrc || product.image}
            alt={product.name}
            className="u-image-fit"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          />
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.header}>
          <span className={styles.collection}>{product.collection} Collection</span>
          <h3 className={styles.name}>{product.name}</h3>
        </div>

        <span className={styles.tech}>
          {product.technologies ? product.technologies.split(' + ')[0] : 'Advanced Tech'} +
        </span>

        <div className={styles.meta}>
          <span className={styles.context}>Refillable System</span>
          <span className={styles.price}>${product.fullPrice || product.price}</span>
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
