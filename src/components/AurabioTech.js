import Image from 'next/image';
import styles from './AurabioTech.module.css';

export default function AurabioTech({ imageSrc }) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <span className={styles.label}>Core Technology</span>
                    <h2 className={styles.headline}>Intelligence<br />That Adapts</h2>
                    <p className={styles.description}>
                        Your skin&apos;s needs fluctuate by the hour. Isola Vitale is the world&apos;s first bio-adaptive complex that reads these micro-changes.
                    </p>
                    <p className={styles.description}>
                        It delivers hydration, repair, or protection exactly when and where it is required, mimicking the skin&apos;s own biological rhythms.
                    </p>
                </div>

                <div className={styles.visual}>
                    {imageSrc && (
                        <Image
                            src={imageSrc}
                            alt="Aurabio Abstract Structure"
                            fill
                            className={styles.image}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
