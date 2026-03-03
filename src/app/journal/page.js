export const dynamic = 'force-dynamic';
import Image from 'next/image';
import styles from './page.module.css';

const articles = [
    {
        id: 1,
        title: "The Chronobiology of Repair",
        category: "Science",
        date: "Oct 12, 2025",
        excerpt: "Why the skin's circadian rhythm dictates the efficacy of molecular actives.",
        imageSrc: "/aurabio-tech.png"
    },
    {
        id: 2,
        title: "Permanence in Design",
        category: "Philosophy",
        date: "Sep 28, 2025",
        excerpt: "Exploring the intersection of Italian brutalist architecture and sustainable packaging.",
        imageSrc: "/refill-pod.png"
    },
    {
        id: 3,
        title: "Sourcing the Future",
        category: "Origin",
        date: "Sep 15, 2025",
        excerpt: "A journey to the bio-fermentation labs of Parma.",
        imageSrc: "/marble.png"
    }
];

export default function JournalPage() {
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <span className={styles.label}>Thought Leadership</span>
                <h1 className={styles.title}>The Journal</h1>
            </header>

            <div className={styles.grid}>
                {articles.map(article => (
                    <article key={article.id} className={styles.article}>
                        <div className={styles.imageContainer}>
                            <Image src={article.imageSrc} alt={article.title} fill className={styles.image} />
                        </div>
                        <div className={styles.meta}>
                            {article.category} — {article.date}
                        </div>
                        <h2 className={styles.articleTitle}>{article.title}</h2>
                        <p className={styles.excerpt}>{article.excerpt}</p>
                    </article>
                ))}
            </div>
        </main>
    );
}
