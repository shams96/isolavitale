"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import Link from 'next/link';
import MagneticButton from './MagneticButton';

// Using the generated image path (assuming it will be placed in public/ or imported)
// Ideally, we import the artifact URL. Since generate_image saves to artifacts, 
// I will assume for now I need to copy it or link it. 
// For this step, I'll use a placeholder logic that implies the image is available.
// I'll update the src after I get the image path.

export default function Hero({ imageSrc, headline, subheadline, cta, ctaLink }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Video autoplay failed:", error);
            });
        }
    }, []);

    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <h2 className={styles.subheadline}>{subheadline || "Bio-Adaptive Intelligence"}</h2>
                <h1 className={styles.headline} dangerouslySetInnerHTML={{ __html: headline || "The Inevitability of<br />Timeless Skin" }} />

                {/* ... */}

                <div style={{ marginTop: '3rem' }}>
                    <MagneticButton href={ctaLink || "/products"}>
                        {cta}
                    </MagneticButton>
                </div>
            </div>

            {/* Cinematic Video Hero */}
            <div className={styles.visualContainer}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={styles.videoBackground}
                    poster={imageSrc} // Fallback to original image
                >
                    <source src="/brand-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Fallback Image is handled by poster, or strictly replace if video fails loading (less common in React without state) */}
            </div>
        </section>
    );
}
