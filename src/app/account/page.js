"use client";
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { MOCK_HISTORY, MOCK_SUBSCRIPTION } from './mockData';
import Link from 'next/link';

export default function AccountPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | scanning | verified | sent | authenticated
    const [message, setMessage] = useState('');

    const [emailProvider, setEmailProvider] = useState(null);

    const handleIdentify = (e) => {
        e.preventDefault();

        if (status === 'sent') {
            // Smart Redirect based on detected provider
            if (emailProvider === 'gmail') {
                window.open('https://mail.google.com/', '_blank');
            } else if (emailProvider === 'yahoo') {
                window.open('https://mail.yahoo.com/', '_blank');
            } else if (emailProvider === 'outlook') {
                window.open('https://outlook.live.com/', '_blank');
            } else {
                window.location.href = `mailto:`; // Fallback to system default
            }
            return;
        }

        if (!email) return;

        // Detect Provider
        const lowerEmail = email.toLowerCase();
        if (lowerEmail.includes('@gmail.com')) setEmailProvider('gmail');
        else if (lowerEmail.includes('@yahoo.com')) setEmailProvider('yahoo');
        else if (lowerEmail.includes('@outlook.com') || lowerEmail.includes('@hotmail.com')) setEmailProvider('outlook');
        else setEmailProvider('default');

        setStatus('scanning');
        setMessage('INITIALIZING BIO-HANDSHAKE...');

        // Simulate scanning process
        setTimeout(() => {
            setMessage('IDENTITY CONFIRMED');

            // Simulate Magic Link Send
            setTimeout(() => {
                setStatus('sent');
                setMessage('SECURE ENTRY LINK DISPATCHED TO DEVICE.');
            }, 1000);
        }, 2000);
    };

    const handleReset = () => {
        setEmail('');
        setStatus('idle');
        setMessage('');
        setEmailProvider(null);
    };

    const simulateVerification = () => {
        setStatus('authenticated');
    };

    if (status === 'authenticated') {
        return (
            <main className={styles.container}>
                <div className={styles.dashboard}>
                    <div className={styles.dashboardHeader}>
                        <h1 className={styles.title}>Welcome Back</h1>
                        <p className={styles.subtitle}>{email}</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Active Protocol</h2>
                        <div className={styles.card}>
                            <div className={styles.cardRow}>
                                <span>Next Replenishment</span>
                                <span className={styles.accent}>{MOCK_SUBSCRIPTION.nextShipment}</span>
                            </div>
                            <div className={styles.cardRow}>
                                <span>Frequency</span>
                                <span>{MOCK_SUBSCRIPTION.frequency}</span>
                            </div>
                            <div className={styles.itemList}>
                                {MOCK_SUBSCRIPTION.items.map((item, i) => (
                                    <div key={i} className={styles.item}>{item}</div>
                                ))}
                            </div>
                            <button className={styles.actionBtn}>Adjust Frequency</button>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Ritual History</h2>
                        <div className={styles.historyList}>
                            {MOCK_HISTORY.map(order => (
                                <div key={order.id} className={styles.historyItem}>
                                    <div>
                                        <div className={styles.orderId}>#{order.id}</div>
                                        <div className={styles.orderDate}>{order.date}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div className={styles.orderTotal}>${order.total}</div>
                                        <div className={styles.orderStatus}>{order.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button onClick={() => setStatus('idle')} className={styles.logoutBtn}>Disconnect</button>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Private Client</h1>
                    <p className={styles.subtitle}>Bio-Secure Entry</p>
                </div>

                <form className={styles.form} onSubmit={handleIdentify}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="email">CLIENT IDENTITY (EMAIL)</label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            placeholder="scan@identity"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status !== 'idle'}
                        />
                    </div>

                    {/* Removed Password Field entirely for "Frictionless" feel */}

                    <button
                        type="submit"
                        className={`${styles.button} ${status === 'scanning' ? styles.scanning : ''} ${status === 'sent' ? styles.sent : ''}`}
                        disabled={status === 'scanning'}
                    >
                        {status === 'idle' && "INITIATE PROTOCOL"}
                        {status === 'scanning' && "SCANNING..."}
                        {status === 'sent' && (
                            emailProvider === 'gmail' ? "OPEN GMAIL" :
                                emailProvider === 'yahoo' ? "OPEN YAHOO MAIL" :
                                    emailProvider === 'outlook' ? "OPEN OUTLOOK" :
                                        "OPEN MAIL CLIENT"
                        )}

                        {/* Scanner Animation Line */}
                        <div className={styles.scanner} />
                    </button>

                    <div className={styles.status}>
                        <span>{message}</span>
                        {status === 'sent' && (
                            <>
                                <button type="button" onClick={handleReset} className={styles.resetBtn}>
                                    Use Different Identity / Resend
                                </button>

                                {/* Demo / Prototype Tool */}
                                <button type="button" onClick={simulateVerification} className={styles.demoLink}>
                                    Click here to Simulate Verification Link
                                    <span className={styles.demoNote}>(Prototype Only)</span>
                                </button>
                            </>
                        )}
                    </div>

                    <div className={styles.divider}>
                        <div className={styles.line}></div>
                        <span className={styles.or}>OR ACCESS VIA</span>
                        <div className={styles.line}></div>
                    </div>

                    <div className={styles.socials}>
                        <button type="button" className={styles.socialBtn}>APPLE ID</button>
                        <button type="button" className={styles.socialBtn}>GOOGLE PASSKEY</button>
                    </div>
                </form>
            </div>
        </main>
    );
}
