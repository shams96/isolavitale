import { useRef, useState } from 'react';
import { Link } from 'wouter';
import styles from './MagneticButton.module.css';

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function MagneticButton({ href, children, className }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
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
