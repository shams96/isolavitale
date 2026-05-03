"use client";
import { useState } from 'react';
import styles from './VideoSection.module.css';
import Image from 'next/image';

export default function VideoSection() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <h2 className={styles.title}>How To Use</h2>
                <div className={styles.videoWrapper} onClick={() => setIsPlaying(true)}>
                    {!isPlaying ? (
                        <>
                            <div className={styles.poster}>
                                {/* Placeholder Gradient or Image */}
                                <div className={styles.overlay} />
                                <Image
                                    src="/hero-cream.png"
                                    alt="How to use Aurabio"
                                    fill
                                    className={styles.image}
                                    style={{ objectFit: 'cover' }}
                                />
                                <button className={styles.playBtn}>
                                    <span className={styles.playIcon}>▶</span>
                                </button>
                            </div>
                            <div className={styles.textOverlay}>
                                <p>The Ritual: <br /> Activation & Application</p>
                            </div>
                        </>
                    ) : (
                        <div className={styles.playerWrapper}>
                            <video
                                src="https://cdn.pixabay.com/video/2023/10/19/185795-876366223_large.mp4"
                                className={styles.videoPlayer}
                                controls
                                autoPlay
                                playsInline
                            />
                            <button className={styles.closeBtn} onClick={(e) => { e.stopPropagation(); setIsPlaying(false); }}>Close</button>
                        </div>
                    )}
                </div>
                <div className={styles.instructions}>
                    <div className={styles.step}>
                        <span className={styles.stepNum}>01</span>
                        <p>Dispense 2-3 pumps into palm.</p>
                    </div>
                    <div className={styles.step}>
                        <span className={styles.stepNum}>02</span>
                        <p>Warm kinetic energy between hands.</p>
                    </div>
                    <div className={styles.step}>
                        <span className={styles.stepNum}>03</span>
                        <p>Press firmly into face and neck.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
