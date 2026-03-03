import styles from './SensorySection.module.css';

export default function SensorySection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>Sensory Intelligence</span>
                    <h2 className={styles.title}>Designed to Transform<br /> in Seconds</h2>
                </div>

                <div className={styles.grid}>
                    <div className={styles.item}>
                        <span className={styles.time}>30s</span>
                        <p className={styles.desc}>Bio-recognition. Texture vanishes upon contact.</p>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.time}>60s</span>
                        <p className={styles.desc}>Cellular awakening. Immediate hydration signal.</p>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.time}>90s</span>
                        <p className={styles.desc}>Surface optimization. A velvet, breathable finish.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
