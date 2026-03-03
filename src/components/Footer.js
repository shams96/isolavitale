import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer} style={{ backgroundColor: 'var(--color-emerald)', color: 'var(--color-white)' }}>
            <div className={styles.top}>
                <div className={styles.brand}>
                    <span className={styles.logo} style={{ color: 'var(--color-gold)' }}>ISOLA VITALE</span>
                    <span className={styles.tagline} style={{ color: 'var(--color-gold)', opacity: 0.8 }}>Est. 2025</span>
                    <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <p style={{ fontWeight: 'bold', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'var(--color-white)' }}>Headquarters</p>
                            <p style={{ opacity: 0.8, fontSize: '0.8rem', lineHeight: '1.6', color: 'var(--color-white)' }}>
                                1314 Waterdown Dr.<br />
                                Allen TX 75013, USA
                            </p>
                        </div>
                        <div>
                            <p style={{ fontWeight: 'bold', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'var(--color-white)' }}>Laboratory</p>
                            <p style={{ opacity: 0.8, fontSize: '0.8rem', lineHeight: '1.6', color: 'var(--color-white)' }}>
                                Via Borgo San Domenico 134<br />
                                03036 Isola del Liri (FR), Italy
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.links}>
                    <div className={styles.column}>
                        <Link href="/contact" className={styles.link}>Contact</Link>
                        <a href="mailto:info@1hubsolutions.com" className={styles.link}>info@1hubsolutions.com</a>
                        <Link href="/privacy" className={styles.link}>Privacy</Link>
                        <Link href="/terms" className={styles.link}>Terms</Link>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <span className={styles.copyright}>© {new Date().getFullYear()} Isola Vitale</span>
            </div>
        </footer>
    );
}
