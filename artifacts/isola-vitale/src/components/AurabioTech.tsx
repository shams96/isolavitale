import styles from './AurabioTech.module.css';

interface AurabioTechProps {
  imageSrc?: string;
}

export default function AurabioTech({ imageSrc }: AurabioTechProps) {
  return (
    <section className={`${styles.section} env-white`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.label}>Core Technology</span>
          <h2 className={styles.headline}>Intelligence<br />That Adapts</h2>
          <p className={styles.description}>
            Your skin's needs fluctuate by the hour. Isola Vitale is the world's first bio-adaptive complex that reads these micro-changes.
          </p>
          <p className={styles.description}>
            It delivers hydration, repair, or protection exactly when and where it is required, mimicking the skin's own biological rhythms.
          </p>
        </div>

        <div className={styles.visual}>
          {imageSrc && (
            <img
              src={imageSrc}
              alt="Aurabio Abstract Structure"
              className={styles.image}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
