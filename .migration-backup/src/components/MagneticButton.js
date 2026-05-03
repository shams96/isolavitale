"use client";
import { useRef, useState } from 'react';
import Link from 'next/link';
import styles from './MagneticButton.module.css';

export default function MagneticButton({ href, children, className }) {
    const buttonRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

        // Calculate center of button
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Calculate distance from center (max 15px movement)
        const x = (clientX - centerX) * 0.2;
        const y = (clientY - centerY) * 0.2;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <Link
            href={href}
            className={`${styles.magnetic} ${className || ''}`}
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
            <span className={styles.text}>{children}</span>
        </Link>
    );
}
