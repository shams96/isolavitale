"use client";
import { useState } from 'react';
import styles from './page.module.css';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

const steps = [
    {
        id: 'intro',
        title: "Initialize Isola Vitale Scan",
        subtitle: "Analyzing your bio-environmental signature.",
        button: "Begin Analysis"
    },
    {
        id: 'env',
        question: "Describe your primary environment.",
        options: [
            { label: "Urban / High Density", sub: "Pollution, Blue Light, Stress" },
            { label: "Arid / Controlled", sub: "Dry Air, HVAC, Altitude" },
            { label: "Humid / Tropical", sub: "Heat, UV Exposure, Moisture" }
        ]
    },
    {
        id: 'concern',
        question: "How does your skin signal fatigue?",
        options: [
            { label: "Loss of Volume", sub: "Hollowing, Fine Lines" },
            { label: "Surface Irregularity", sub: "Texture, Dullness, Pigment" },
            { label: "Reactive Sensitivity", sub: "Redness, Tightness, Inflammation" }
        ]
    },
    {
        id: 'result',
        title: "Analysis Complete",
    }
];

export default function DiagnosisPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const { addToCart } = useCart();

    const handleOption = (answer) => {
        setAnswers(prev => ({ ...prev, [currentStep]: answer }));
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleSystemAdd = () => {
        addToCart({
            id: 'biosphere-system-bundle',
            name: 'The Isola Vitale System',
            price: 580,
            imageSrc: '/products-group.jpg',
            variant: 'Complete Protocol (Serum + Cream)',
            quantity: 1
        });
    };

    const currentData = steps[currentStep];
    const progress = ((currentStep) / (steps.length - 1)) * 100;

    return (
        <main className={styles.main}>
            {/* Ambient Background */}
            <div className={styles.background}>
                {/* Can add abstract aura image here later */}
            </div>

            <div className={styles.container}>
                <span className={styles.stepIndicator}>
                    {currentStep === 0 ? 'Step 00' :
                        currentStep === steps.length - 1 ? 'Final Report' :
                            `Step 0${currentStep} / 0${steps.length - 2}`}
                </span>

                {currentStep === 0 && (
                    <div className={styles.resultContainer}>
                        <h1 className={styles.title}>{currentData.title}</h1>
                        <p className={styles.analysisText}>{currentData.subtitle}</p>
                        <button className={styles.addToCartBtn} onClick={() => setCurrentStep(1)}>
                            {currentData.button}
                        </button>
                    </div>
                )}

                {(currentStep > 0 && currentStep < steps.length - 1) && (
                    <>
                        <h1 className={styles.title}>{currentData.question}</h1>
                        <div className={styles.options}>
                            {currentData.options.map((opt, idx) => (
                                <div key={idx} className={styles.option} onClick={() => handleOption(opt.label)}>
                                    <span className={styles.optionText}>{opt.label}</span>
                                    <span className={styles.optionSub}>{opt.sub}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {currentStep === steps.length - 1 && (
                    <div className={styles.resultContainer}>
                        <h1 className={styles.title}>Bio-Signature Detected</h1>
                        <p className={styles.analysisText}>
                            Your skin requires high-level adaptive barrier defense.
                            We have calibrated The System to prioritize retention and repair.
                        </p>

                        <div className={styles.recommendationBox}>
                            <span className={styles.recLabel}>Prescribed Protocol</span>
                            <h2 className={styles.recTitle}>The Isola Vitale™ System</h2>
                            <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '1rem' }}>
                                Peptide Renewal Essence + Barrier Repair Cream
                            </p>
                            <button className={styles.addToCartBtn} onClick={handleSystemAdd}>
                                Acquire System - $580
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </main>
    );
}
