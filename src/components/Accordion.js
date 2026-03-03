"use client";
import { useState } from 'react';
import styles from './Accordion.module.css';

export default function Accordion({ title, children, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`${styles.item} ${isOpen ? styles.open : ''}`}>
            <button className={styles.header} onClick={() => setIsOpen(!isOpen)}>
                <span className={styles.title}>{title}</span>
                <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
            </button>
            <div className={styles.content}>
                <div className={styles.inner}>
                    {children}
                </div>
            </div>
        </div>
    );
}
