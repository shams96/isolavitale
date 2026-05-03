import styles from './SocialShare.module.css';

interface SocialShareProps {
  title: string;
  text: string;
}

export default function SocialShare({ title, text }: SocialShareProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: window.location.href });
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={handleShare} className={styles.shareBtn}>
        Share This Product
      </button>
    </div>
  );
}
