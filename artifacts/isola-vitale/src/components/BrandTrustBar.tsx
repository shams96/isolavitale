import styles from './BrandTrustBar.module.css';

const PILLARS = [
  { value: '5', label: 'Breakthrough\nTechnologies', eyebrow: 'Science' },
  { value: '28', label: 'Day Visible\nTransformation', eyebrow: 'Results' },
  { value: '100%', label: 'Refillable\nVessel System', eyebrow: 'Sustainability' },
  { value: 'Parma', label: 'Italian\nLaboratories', eyebrow: 'Craft' },
  { value: '∞', label: 'Vessel\nLifetime', eyebrow: 'Longevity' },
];

export default function BrandTrustBar() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {PILLARS.map((p, i) => (
          <div key={i} className={styles.pillar}>
            <span className={styles.eyebrow}>{p.eyebrow}</span>
            <span className={styles.value}>{p.value}</span>
            <span className={styles.label}>{p.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
