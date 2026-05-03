import { useState } from 'react';
import styles from './AnnouncementBar.module.css';

const MESSAGES = [
  'Subscribe & Save 20% · Free Shipping Over $200 · Complimentary Samples With Every Order',
  'Refillable Vessels · Zero Waste Ritual · Cellular Science Milano',
  'The Laboratory Collection · Clinical-Grade Skincare · Italian Craftsmanship',
];

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const [idx] = useState(0);

  if (dismissed) return null;

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <span className={styles.message}>{MESSAGES[idx % MESSAGES.length]}</span>
        <button className={styles.close} onClick={() => setDismissed(true)} aria-label="Dismiss">
          ✕
        </button>
      </div>
    </div>
  );
}
