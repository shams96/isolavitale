import styles from './SystemBundle.module.css';
import { useCart } from '@/context/CartContext';
import { Link } from 'wouter';

export default function SystemBundle() {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: 'isola-vitale-biosphere-system-bundle',
      name: 'The Isola Vitale System',
      price: 580,
      imageSrc: '/biosphere-system.png',
      variant: 'Complete Protocol (Mist + Essence + Cream)',
      quantity: 1,
      cartId: Date.now()
    });
  };

  return (
    <section className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.imageWrapper}>
          <img src="/biosphere-system.png" alt="The Biosphere System" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        </div>
        <div className={styles.details}>
          <span className={styles.pretitle}>The Protocol</span>
          <h1 className={styles.title}>The Biosphere™ System</h1>
          <p className={styles.description}>
            A closed-loop regimen designed to arrest cellular exhaustion.
            Bio-adaptive intelligence meets barrier-fortification.
          </p>

          <div className={styles.priceBlock}>
            <span className={styles.price}>$580</span>
            <span className={styles.saving}>Complimentary Refills Included (Save $120)</span>
          </div>

          <button className={styles.addButton} onClick={handleAddToCart}>
            Acquire System — $580
          </button>
        </div>
      </div>

      <div className={styles.steps}>
        <div className={styles.stepRow}>
          <span className={styles.stepNum}>01</span>
          <h3 className={styles.stepName}>Multi-Hydration Mist</h3>
          <Link href="/products/the-atmospheric-mist" className={styles.stepAction}>Explore Formulation</Link>
        </div>
        <div className={styles.stepRow}>
          <span className={styles.stepNum}>02</span>
          <h3 className={styles.stepName}>Peptide Renewal Essence</h3>
          <Link href="/products/the-cellular-essence" className={styles.stepAction}>Explore Formulation</Link>
        </div>
        <div className={styles.stepRow}>
          <span className={styles.stepNum}>03</span>
          <h3 className={styles.stepName}>Barrier Repair Cream</h3>
          <Link href="/products/the-barrier-cream" className={styles.stepAction}>Explore Formulation</Link>
        </div>
      </div>
    </section>
  );
}
