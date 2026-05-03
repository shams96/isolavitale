import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';

const ANNOUNCEMENTS = [
  'Subscribe & Save 20% · Free Shipping Over $200 · Complimentary Samples With Every Order',
  'Refillable Vessels · Zero Waste Ritual · Cellular Science Milano',
  'The Laboratory Collection · Clinical-Grade Skincare · Italian Craftsmanship',
];

const DARK_PATHS = ['/'];

export default function Header() {
  const { toggleDrawer, cart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [barDismissed, setBarDismissed] = useState(false);
  const [location] = useLocation();
  const [msgIdx] = useState(0);

  const isDarkPage = DARK_PATHS.includes(location);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = [
    styles.nav,
    scrolled ? styles.scrolled : isDarkPage ? styles.transparent : styles.light,
  ].join(' ');

  const itemCount = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <header className={styles.header}>
      {/* Announcement strip */}
      {!barDismissed && (
        <div className={styles.bar}>
          <span className={styles.barMessage}>{ANNOUNCEMENTS[msgIdx % ANNOUNCEMENTS.length]}</span>
          <button className={styles.barClose} onClick={() => setBarDismissed(true)} aria-label="Dismiss">✕</button>
        </div>
      )}

      {/* Main nav */}
      <nav className={navClasses}>
        <div className={styles.navSide}>
          <Link href="/products" className={styles.link}>Shop All</Link>
          <Link href="/system" className={styles.link}>The System</Link>
          <Link href="/technology" className={styles.link}>Aurabio™</Link>
        </div>

        <Link href="/" className={styles.logo}>
          <span className={styles.logoMain}>Isola Vitale</span>
          <span className={styles.logoSubtext}>Milano</span>
        </Link>

        <div className={styles.navSide}>
          <Link href="/origin" className={styles.link}>Craft</Link>
          <Link href="/refill" className={styles.link}>Refill</Link>
          <Link href="/journal" className={styles.link}>Journal</Link>
          <Link href="/account" className={styles.link}>Account</Link>
          <button onClick={toggleDrawer} className={styles.cartButton} aria-label="Open cart">
            <div className={styles.iconWrapper}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 7H16V6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6V7H5C3.89543 7 3 7.89543 3 9V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V9C21 7.89543 20.1046 7 19 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 7V6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
}
