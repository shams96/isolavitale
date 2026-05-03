import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.brandColumn}>
                        <span className={styles.logo}>ISOLA VITALE</span>
                        <p className={styles.tagline}>
                            Cellular Vitality. Isola Crafted. Laboratory-grade efficacy formulated in Italy.
                        </p>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Collections</h4>
                        <ul className={styles.links}>
                            <li><Link href="/products" className={styles.link}>All Products</Link></li>
                            <li><Link href="/daily-collection" className={styles.link}>Daily Collection</Link></li>
                            <li><Link href="/laboratory-collection" className={styles.link}>Laboratory</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Exploration</h4>
                        <ul className={styles.links}>
                            <li><Link href="/origin" className={styles.link}>Our Origin</Link></li>
                            <li><Link href="/technology" className={styles.link}>Technology</Link></li>
                            <li><Link href="/journal" className={styles.link}>Journal</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Contact</h4>
                        <ul className={styles.links}>
                            <li><a href="mailto:info@isolavitale.com" className={styles.link}>Inquiries</a></li>
                            <li><Link href="/contact" className={styles.link}>Support</Link></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>© {new Date().getFullYear()} Isola Vitale. All Rights Reserved.</p>
                    <div className={styles.legal}>
                        <Link href="/privacy" className={styles.link}>Privacy</Link>
                        <Link href="/terms" className={styles.link}>Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
