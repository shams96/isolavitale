"use client";
import { useState } from 'react';
import styles from './SocialShare.module.css';

export default function SocialShare({ title, text, url }) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: title,
            text: text,
            url: url || window.location.href,
        };

        // Check for native support (Mobile/Modern Browsers)
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('Shared successfully');
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback to Clipboard - Careful with HTTP environments
            try {
                // Determine if clipboard API is available
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(shareData.url);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                } else {
                    // Last resort fallback for non-secure contexts (HTTP)
                    const textArea = document.createElement("textarea");
                    textArea.value = shareData.url;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand("copy");
                    document.body.removeChild(textArea);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                }
            } catch (err) {
                console.error('Failed to copy', err);
            }
        }
    };

    return (
        <div className={styles.container}>
            <button className={styles.shareBtn} onClick={handleShare}>
                <span className={styles.icon}>↗</span>
                <span className={styles.label}>
                    {copied ? 'Link Copied' : 'Share Item'}
                </span>
            </button>
        </div>
    );
}
