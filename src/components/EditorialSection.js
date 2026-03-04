import Image from 'next/image';
import styles from './EditorialSection.module.css';

export default function EditorialSection({ marbleImageSrc }) {
    return (
        <section className={`${styles.section} env-white`}>
            <div className={styles.container}>
                <div className={styles.block}>
                    <div className={styles.content}>
                        <span className={styles.label}>Craft & Origin</span>
                        <h2 className={styles.headline}>Formulated<br />in Italy</h2>
                        <p className={styles.text}>
                            Our laboratories in Parma do not chase trends.
                            They pursue the inevitable truth of longevity.
                            Precision formulation, engineered for resilience.
                        </p>
                    </div>
                    <div className={styles.imageContainer}>
                        {marbleImageSrc && (
                            <Image
                                src={marbleImageSrc}
                                alt="Italian Marble Texture"
                                fill
                                className={styles.image}
                            />
                        )}
                    </div>
                </div>

                <div className={`${styles.block} ${styles.reverse}`}>
                    <div className={styles.content}>
                        <span className={styles.label}>Refill & Longevity</span>
                        <h2 className={styles.headline}>Designed<br />to Last</h2>
                        <p className={styles.text}>
                            True luxury is permanence. Our heavy-weight vessels are designed for infinite reuse.
                            A quiet commitment to a sustainable future.
                        </p>
                    </div>
                    <div className={styles.imageContainer}>
                        <Image src="/refill-pod-fixed.png" alt="Refill System" fill className={styles.image} />
                    </div>
                </div>
            </div>
        </section>
    );
}
