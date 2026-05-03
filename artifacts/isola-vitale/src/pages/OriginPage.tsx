import styles from '@/app/origin/page.module.css';
import FadeIn from "@/components/FadeIn";

export default function OriginPage() {
  return (
    <main className={`${styles.main} env-white`}>
      <FadeIn>
        <section className={styles.firstGrid}>
          <div className={styles.textContent}>
            <span className={styles.label}>The Source</span>
            <h1 className={styles.sectionTitle}>The Heart of the Waterfall</h1>
            <p className={styles.text}>
              In the hidden jewel of Lazio—Isola del Liri—life is defined by the rhythm of the falls.
              Our lab sits at the confluence of history and nature, where the Cascata Grande has powered artisanal innovation for centuries.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <video
              src="/isola-vitale-origin.mp4"
              className={styles.cinematicVideo}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={400}>
        <section className={styles.grid}>
          <div className={styles.imageContainer}>
            <img src="/lab-glass.png" alt="Cascata Grande Laboratory" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} className={styles.image} />
          </div>
          <div className={styles.textContent}>
            <span className={styles.label}>Provenance</span>
            <h2 className={styles.sectionTitle}>Vital Energy</h2>
            <p className={styles.text}>
              We have captured this vital energy in Isola Vitale. Our formulas are enriched with the natural minerals and unique botanicals native to the Frosinone province.
            </p>
            <span className={styles.stat}>Isola del Liri • Frosinone</span>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={200}>
        <section className={`${styles.grid} ${styles.reverse}`}>
          <div className={styles.imageContainer}>
            <img src="/aurabio-tech.png" alt="The Craft" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} className={styles.image} />
          </div>
          <div className={styles.textContent}>
            <span className={styles.label}>The Craft</span>
            <h2 className={styles.sectionTitle}>The Science of Longevity</h2>
            <p className={styles.text}>
              Every formula is engineered to the micron. Our pharmaceutical-grade standards leave nothing to chance. Only to possibility.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={200}>
        <section style={{ padding: 'var(--section-padding)', backgroundColor: 'var(--color-emerald)', color: 'var(--color-white)', textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-gold)' }}>The Partnership</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', margin: '2rem 0' }}>Natural You Srl</h2>
          <p style={{ fontFamily: 'var(--font-sans)', opacity: '0.8', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            In partnership with Natural You Srl, a pharmaceutical-grade manufacturer in Italy, we combine the legacy of Italian craftsmanship with the precision of modern biochemistry.
          </p>
        </section>
      </FadeIn>
    </main>
  );
}
