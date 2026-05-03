import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import MagneticButton from './MagneticButton';

interface HeroProps {
  imageSrc?: string;
  headline?: string;
  subheadline?: string;
  cta?: string;
  ctaLink?: string;
}

export default function Hero({ imageSrc, headline, subheadline, cta, ctaLink }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section className={`${styles.hero} env-emerald`}>
      <div className={styles.content}>
        <h2 className={styles.subheadline}>{subheadline || "Bio-Adaptive Intelligence"}</h2>
        <h1 className={styles.headline} dangerouslySetInnerHTML={{ __html: headline || "The Inevitability of<br />Timeless Skin" }} />

        <div style={{ marginTop: '3rem' }}>
          <MagneticButton href={ctaLink || "/products"}>
            {cta}
          </MagneticButton>
        </div>
      </div>

      <div className={styles.visualContainer}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={styles.videoBackground}
          poster={imageSrc}
        >
          <source src="/brand-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
