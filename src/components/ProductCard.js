import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, noLink = false }) {
    const cardContent = (
        <>
            <div className="u-aspect-ratio-plinth">
                {product.imageSrc && (
                    <Image
                        src={product.imageSrc}
                        alt={product.name}
                        fill
                        className="u-image-fit"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={false}
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
                    <span className={styles.price}>${product.fullPrice}</span>
                </div>
            </div>
        </>
    );

    // If noLink is true, return just the card content without Link wrapper
    if (noLink) {
        return <div className={styles.card}>{cardContent}</div>;
    }

    // Otherwise, return with Link wrapper
    return (
        <Link href={`/products/${product.slug}`} className={styles.card}>
            {cardContent}
        </Link>
    );
}
