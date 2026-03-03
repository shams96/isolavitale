"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';

export default function Header() {
    const { toggleDrawer, cart } = useCart();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerClasses = [
        styles.header,
        scrolled ? styles.scrolled : styles.alwaysGlass
    ].join(' ').trim();

    return (
        <header className={headerClasses}>
            <nav className={styles.nav}>
                <Link href="/products" className={styles.link}>Shop All</Link>
                <Link href="/system" className={styles.link}>The System</Link>
                <Link href="/technology" className={styles.link}>Aurabio™</Link>
                <Link href="/origin" className={styles.link}>Craft</Link>
                <Link href="/refill" className={styles.link}>Refill</Link>
                <Link href="/journal" className={styles.link}>Journal</Link>
            </nav>

            <Link href="/" className={styles.logo}>
                Isola Vitale
                <span className={styles.logoSubtext}>
                    Milano
                </span>
            </Link>

            <div className={styles.actions}>
                <Link href="/account" className={styles.link}>Account</Link>
                <button onClick={toggleDrawer} className={styles.cartButton}>
                    <div className={styles.iconWrapper}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 7H16V6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6V7H5C3.89543 7 3 7.89543 3 9V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V9C21 7.89543 20.1046 7 19 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 7V6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className={styles.badge}>{cart.length}</span>
                    </div>
                </button>
            </div>
        </header>
    );
}
