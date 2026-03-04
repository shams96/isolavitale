import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductShowcase.module.css';
import { getProductBySlug } from '@/data/items';

export default function ProductShowcase() {
    // Select 3 key products for the "Ritual" showcase
    const showcaseSkus = [
        'the-cellular-essence',
        'the-comfort-cream',
        'the-nocturnal-treatment'
    ];

    const products = showcaseSkus.map(slug => getProductBySlug(slug)).filter(Boolean);

    return (
        <section className={`${styles.section} env-black`}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>The Ritual</span>
                    <h2 className={styles.title}>The Isola Vitale™ System</h2>
                </div>

                <div className={styles.list}>
                    {products.map((product, index) => (
                        <div key={product.id} className={styles.item}>
                            <div className={`${styles.visual} u-aspect-ratio-plinth`}>
                                <Image
                                    src={product.imageSrc}
                                    alt={product.name}
                                    fill
                                    className="u-image-fit"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                            <div className={styles.details}>
                                <span className={styles.step}>Step {index + 1}</span>
                                <h3 className={styles.name}>{product.name}</h3>
                                <p className={styles.desc}>{product.truth}</p>
                                <Link href={`/products/${product.slug}`} className={styles.link}>View Product</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
