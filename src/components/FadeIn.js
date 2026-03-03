"use client";
import { useEffect, useRef, useState } from 'react';
import styles from './FadeIn.module.css';

export default function FadeIn({ children, delay = 0 }) {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            });
        });

        const currentElement = domRef.current;
        if (currentElement) observer.observe(currentElement);

        return () => {
            if (currentElement) observer.unobserve(currentElement);
        };
    }, [delay]);

    return (
        <div
            className={`${styles.wrapper} ${isVisible ? styles.visible : ''}`}
            ref={domRef}
        >
            {children}
        </div>
    );
}
