import Image from "next/image";
import Link from "next/link";
import styles from './page.module.css';

export default function RefillPage() {
    return (
        <main className="u-page-container">
            {/* Hero Section */}
            <div className={`${styles.hero} u-narrow-container`}>
                <span className="u-overline">Intelligent Replenishment</span>
                <h1 className="u-hero-title">Designed to Last<br />a Lifetime</h1>
                <p className="u-body-text">
                    Join the <b>Circularity Protocol</b>. Subscribe to receiving fresh molecular refills on your schedule, and never pay for the vessel again.
                </p>
                <div className={styles.buttonGroup}>
                    <Link href="/account" className="btn-primary">
                        Manage Subscription
                    </Link>
                    <Link href="/products" className="btn-secondary">
                        Shop Refills
                    </Link>
                </div>
            </div>

            {/* Value Prop Grid */}
            <div className={styles.featureGrid}>
                <div>
                    <h2 className="u-hero-title" style={{ fontSize: '2.5rem' }}>Ownership over Consumption</h2>
                    <p className="u-body-text">
                        Luxury is not disposable. Our primary vessels are crafted from heavyweight violet glass and stone, designed to protect the bio-active ingredients from light degradation.
                    </p>
                    <ul className={styles.featureList}>
                        <li className={styles.featureItem}>
                            <span className={styles.featureCheck}>✓</span> 20% savings on every refill
                        </li>
                        <li className={styles.featureItem}>
                            <span className={styles.featureCheck}>✓</span> Free shipping on subscription orders
                        </li>
                        <li className={styles.featureItem}>
                            <span className={styles.featureCheck}>✓</span> Cancel or pause anytime
                        </li>
                    </ul>
                </div>
                <div className="u-aspect-ratio-plinth">
                    <Image src="/refill-pod-fixed.png" alt="Aluminum Refill Cartridge" fill className="u-image-fit" />
                </div>
            </div>

            {/* How It Works */}
            <div className={styles.stepsGrid}>
                <div>
                    <span className={styles.stepNumber}>01</span>
                    <h3 className={styles.stepTitle}>Unlock</h3>
                    <p className="u-body-text" style={{ fontSize: '0.9rem' }}>
                        Twist the base of the vessel to release the empty core. Our weighted mechanism ensures a satisfying, precise release.
                    </p>
                </div>
                <div>
                    <span className={styles.stepNumber}>02</span>
                    <h3 className={styles.stepTitle}>Replace</h3>
                    <p className="u-body-text" style={{ fontSize: '0.9rem' }}>
                        Insert the fresh cold-touch aluminum cartridge. Listen for the signature <i>click</i> to confirm bio-seal integrity.
                    </p>
                </div>
                <div>
                    <span className={styles.stepNumber}>03</span>
                    <h3 className={styles.stepTitle}>Reactivate</h3>
                    <p className="u-body-text" style={{ fontSize: '0.9rem' }}>
                        Your vessel is renewed. Return the empty cartridge in the provided prepaid envelope for molecular recycling.
                    </p>
                </div>
            </div>
        </main>
    );
}
