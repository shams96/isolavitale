"use client";
import { useState } from 'react';
import SystemBundle from "@/components/SystemBundle";
import FadeIn from "@/components/FadeIn";
import styles from './page.module.css';

const RITUALS = {
    AM: [
        {
            step: "01. Prep",
            product: "Multi-Hydration Mist",
            desc: "Just as dry soil cannot absorb rain, dry skin repels treatment. The Mist creates a permeable, hydrated pathway for bio-actives."
        },
        {
            step: "02. Treat",
            product: "Peptide Renewal Essence",
            desc: "A water-light signaling fluid. Applied before heavier creams to ensure peptides reach cellular receptors without lipid obstruction."
        },
        {
            step: "03. Seal",
            product: "Barrier Repair Cream",
            desc: "The final lipid layer. It biomimics the stratum corneum to lock in hydration and prevent transepidermal water loss."
        },
        {
            step: "04. Protect",
            product: "Antioxidant Defense SPF 50+",
            desc: "The invisible shield. Protects the investments of the previous steps against the primary driver of aging: UV radiation."
        }
    ],
    PM: [
        {
            step: "01. Prep",
            product: "Multi-Hydration Mist",
            desc: "Crucial at night to reset the skin’s pH after cleansing and prepare it for deep regeneration."
        },
        {
            step: "02. Treat",
            product: "Peptide Renewal Essence",
            desc: "Delivers maximum signaling complexes during the skin’s peak repair window (11 PM - 4 AM)."
        },
        {
            step: "PM. Recover",
            product: "Night Renewal Treatment",
            isReplacement: true,
            desc: "The 'Sleeping Seal'. A rich balm-to-oil that REPLACES the Barrier Cream. It provides an occlusive cocoon for intensive overnight repair."
        }
    ]
};

export default function SystemPage() {
    const [mode, setMode] = useState('AM');

    return (
        <main className={styles.main}>
            <SystemBundle />

            <FadeIn delay={200}>
                <section className={styles.scienceSection}>
                    <div className={styles.headerGroup}>
                        <span className={styles.scienceLabel}>The Circadian Protocol</span>
                        <h2 className={styles.scienceTitle}>Bio-Mimetic Layering</h2>

                        {/* Toggle Switch */}
                        <div className={styles.toggleContainer}>
                            <button
                                className={`${styles.toggleBtn} ${mode === 'AM' ? styles.active : ''}`}
                                onClick={() => setMode('AM')}
                            >
                                <span className={styles.icon}>☀</span> Morning (Protection)
                            </button>
                            <button
                                className={`${styles.toggleBtn} ${mode === 'PM' ? styles.active : ''}`}
                                onClick={() => setMode('PM')}
                            >
                                <span className={styles.icon}>☾</span> Evening (Regeneration)
                            </button>
                        </div>
                    </div>

                    <div className={styles.grid}>
                        {RITUALS[mode].map((item, index) => (
                            <div key={item.step} className={`${styles.stepCard} ${item.isReplacement ? styles.replacementCard : ''} fade-in`}>
                                <h3 className={styles.stepTitle}>{item.step}</h3>
                                <p className={styles.stepDesc}>
                                    <strong>{item.product}</strong><br />
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </FadeIn>
        </main>
    );
}
