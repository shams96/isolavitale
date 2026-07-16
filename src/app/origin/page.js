"use client";
import Image from 'next/image';
import styles from './page.module.css';
import FadeIn from "@/components/FadeIn";

export default function OriginPage() {
    return (
        <main className={styles.main}>
            <FadeIn>
                <section className={styles.firstGrid}>
                    <div className={styles.textContent}>
                        <span className="u-overline">The Source</span>
                        <h1 className="u-hero-title" style={{fontSize: 'var(--heading-size-section)'}}>The Heart of the Waterfall</h1>
                        <p className="u-body-text" style={{marginBottom: '2rem', maxWidth: '500px'}}>
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
                        <Image src="/lab-glass.png" alt="Cascata Grande Laboratory" fill className={styles.image} />
                    </div>
                    <div className={styles.textContent}>
                        <span className="u-overline">Provenance</span>
                        <h2 className="u-hero-title" style={{fontSize: 'var(--heading-size-section)'}}>Vital Energy</h2>
                        <p className="u-body-text" style={{marginBottom: '2rem', maxWidth: '500px'}}>
                            We have captured this vital energy in Isola Vitale. Our formulas are enriched with the natural minerals and unique botanicals native to the Frosinone province.
                        </p>
                        <span className={styles.stat}>Isola del Liri • Frosinone</span>
                    </div>
                </section>
            </FadeIn>

            <FadeIn delay={200}>
                <section className={`${styles.grid} ${styles.reverse}`}>
                    <div className={styles.imageContainer}>
                        <Image src="/marble.png" alt="Raw Mineral Sourcing" fill className={styles.image} />
                    </div>
                    <div className={styles.textContent}>
                        <span className="u-overline">Savoir-Faire</span>
                        <h2 className="u-hero-title" style={{fontSize: 'var(--heading-size-section)'}}>Artisanal Innovation</h2>
                        <p className="u-body-text" style={{marginBottom: '2rem', maxWidth: '500px'}}>
                            Creating a bespoke skincare experience that is as pristine as the waters that inspire us.
                            This is not just skincare; it is a testament to Italian savoir-faire.
                        </p>
                        <span className={styles.stat}>Traceable Origins • Historic Legacy</span>
                    </div>
                </section>
            </FadeIn>

            <FadeIn delay={200}>
                <section className={styles.grid}>
                    <div className={styles.imageContainer}>
                        <Image src="/trio-modern.png" alt="Refill Engineering" fill className={styles.image} />
                    </div>
                    <div className={styles.textContent}>
                        <span className="u-overline">Engineering</span>
                        <h2 className="u-hero-title" style={{fontSize: 'var(--heading-size-section)'}}>Heavy-Weight Design</h2>
                        <p className="u-body-text" style={{marginBottom: '2rem', maxWidth: '500px'}}>
                            Our vessels are engineered from ultra-violet glass to block degradative light spectrums, preserving the active formula for months longer than standard packaging.
                        </p>
                        <p className="u-body-text" style={{marginBottom: '2rem', maxWidth: '500px'}}>
                            A permanent object, designed to age with you.
                        </p>
                        <span className={styles.stat}>Violet Glass • Cold-Touch Aluminum</span>
                    </div>
                </section>
            </FadeIn>
        </main>
    );
}
