"use client";
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import FadeIn from '@/components/FadeIn';

// --- Dashboard View Component ---
const DashboardView = ({ user, logout }) => {
    return (
        <div className={styles.dashboard}>
            <FadeIn>
                <div className={styles.dashboardHeader}>
                    <span className={styles.uLabel}>Private Client Lounge</span>
                    <h1 className={styles.displayTitle}>Welcome, {user.name}</h1>
                    <div className={styles.vitals}>
                        <span className={styles.vitalItem}>ID: {user.id}</span>
                        <span className={styles.vitalItem}>Security: Post-Quantum</span>
                    </div>
                </div>

                <div className={styles.grid}>
                    {/* Active Protocol (formerly Subscriptions) */}
                    <div className={styles.gridItem}>
                        <div className={styles.moduleHeader}>
                            <h3>Active Protocol</h3>
                            <span className={styles.statusOptimal}>Optimal</span>
                        </div>
                        <p className={styles.moduleDesc}>Next replenishment scheduled for April 12, 2026.</p>
                        <div className={styles.itemList}>
                            <div className={styles.item}>The Biosphere System / Phase I</div>
                            <div className={styles.item}>Nocturn Cream / Dermal Restoration</div>
                        </div>
                        <button className={styles.ghostBtn}>Adjust Frequency</button>
                    </div>

                    {/* Digital Skin Concierge */}
                    <div className={styles.gridItem}>
                        <div className={styles.moduleHeader}>
                            <h3>Your Concierge</h3>
                        </div>
                        <div className={styles.advisorCard}>
                            <div className={styles.advisorInfo}>
                                <span className={styles.advisorName}>Dr. Elena Rossi</span>
                                <span className={styles.advisorTitle}>Lead Skin Scientist</span>
                            </div>
                            <div className={styles.skinScore}>
                                <span className={styles.scoreValue}>88</span>
                                <span className={styles.scoreLabel}>Skin Score</span>
                            </div>
                        </div>
                        <p className={styles.miniNote}>Last analysis: March 01, 2026</p>
                        <button className={styles.primaryBtn}>Initiate Consultation</button>
                    </div>

                    {/* Lab Appointments */}
                    <div className={styles.gridItem}>
                        <div className={styles.moduleHeader}>
                            <h3>Laboratory Appointments</h3>
                        </div>
                        <div className={styles.appointment}>
                            <span className={styles.aptDate}>Mar 15, 2026</span>
                            <span className={styles.aptTime}>10:00 AM (Central European Time)</span>
                            <span className={styles.aptType}>Virtual Laboratory Lounge</span>
                        </div>
                        <button className={styles.ghostBtn}>Reschedule</button>
                    </div>

                    {/* Ritual History */}
                    <div className={styles.gridItem}>
                        <div className={styles.moduleHeader}>
                            <h3>Ritual History</h3>
                        </div>
                        <div className={styles.historyCompact}>
                            <div className={styles.historyRow}>
                                <span>ORD-2026-XJ9</span>
                                <span className={styles.accent}>$860</span>
                            </div>
                            <div className={styles.historyRow}>
                                <span>ORD-2025-VP2</span>
                                <span className={styles.accent}>$240</span>
                            </div>
                        </div>
                        <button className={styles.ghostBtn}>View All Archives</button>
                    </div>
                </div>

                <footer className={styles.dashboardFooter}>
                    <button onClick={logout} className={styles.disconnectBtn}>Secure Log-out</button>
                </footer>
            </FadeIn>
        </div>
    );
};

// --- Login View Component ---
const LoginView = ({ authenticate }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | authenticate | complete

    const handleBiometric = () => {
        setStatus('authenticate');
        // Simulating 2026 Biometric (Passkey) Handshake
        setTimeout(() => {
            setStatus('complete');
            setTimeout(() => {
                authenticate({ name: 'Shams', id: 'ISV-29384-LX' });
            }, 800);
        }, 1500);
    };

    return (
        <div className={styles.authWrapper}>
            <FadeIn>
                <div className={styles.authHeader}>
                    <span className={styles.uLabel}>Identity Protocol</span>
                    <h1 className={styles.title}>Private Client</h1>
                    <p className={styles.subtitle}>Bio-Secure Entry Only.</p>
                </div>

                <div className={styles.biometricSection}>
                    <button
                        className={`${styles.biometricBtn} ${status === 'authenticate' ? styles.pulse : ''}`}
                        onClick={handleBiometric}
                        disabled={status !== 'idle'}
                    >
                        <div className={styles.bioIcon}>
                            {/* Simple SVG icon representing fingerprint or face scan */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 11V13M12 7V8M12 16V17M8 12H7M17 12H16M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" />
                            </svg>
                        </div>
                        <span className={styles.btnText}>
                            {status === 'idle' && "Biometric Secure Entry"}
                            {status === 'authenticate' && "Scanning Identity..."}
                            {status === 'complete' && "Identity Confirmed"}
                        </span>
                        <div className={styles.scannerLine} />
                    </button>
                </div>

                <div className={styles.divider}>
                    <span className={styles.or}>Alternative Cryptographic Access</span>
                </div>

                <div className={styles.manualEntry}>
                    <input
                        type="email"
                        placeholder="client@identity"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className={styles.ghostBtnSmall}>Dispatch Entry Link</button>
                </div>
            </FadeIn>
        </div>
    );
};

// --- Main Page Component ---
export default function AccountPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate checking for a secure session
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const logout = () => {
        setUser(null);
    };

    if (loading) return (
        <div className={styles.loadingContainer}>
            <div className={styles.loader} />
        </div>
    );

    return (
        <main className={styles.container}>
            {user ? (
                <DashboardView user={user} logout={logout} />
            ) : (
                <LoginView authenticate={setUser} />
            )}
        </main>
    );
}
