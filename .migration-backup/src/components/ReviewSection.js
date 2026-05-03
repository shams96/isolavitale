"use client";
import { useState } from 'react';
import styles from './ReviewSection.module.css';

const MOCK_REVIEWS = [
    {
        id: 1,
        author: "Thomas A.",
        role: "Verified Buyer",
        rating: 5,
        title: "Transcendent hydration.",
        content: "I've never used a serum that absorbs this completely. My skin feels recalibrated, not just coated. The scent is subtle but grounding."
    },
    {
        id: 2,
        author: "Sarah J.",
        role: "Verified Buyer",
        rating: 5,
        title: "Less is more.",
        content: "You really only need 2 drops. It's transformed my texture in about 10 days. Worth every penny for the science behind it."
    },
    {
        id: 3,
        author: "Marcus K.",
        role: "Verified Buyer",
        rating: 4,
        title: "Effective but pricey.",
        content: "The results are undeniable, skin is plumper and clearer. I just wish the refill system was slightly more affordable, but will subscribe for the discount."
    }
];

export default function ReviewSection() {
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.mainTitle}>4.8 <span className={styles.stars}>★★★★★</span></h2>
                <span className={styles.count}>(142 Reviews)</span>
            </div>

            <div className={styles.filterBar}>
                <div className={styles.filterItem}>
                    <span>Skin Type</span>
                    <span className={styles.arrow}>↓</span>
                </div>
                <div className={styles.filterItem}>
                    <span>Age Range</span>
                    <span className={styles.arrow}>↓</span>
                </div>
                <div className={styles.filterItem}>
                    <span>Sort By: Newest</span>
                    <span className={styles.arrow}>↓</span>
                </div>
                <div className={styles.search}>
                    <input type="text" placeholder="Search reviews" />
                    <span className={styles.searchIcon}>🔍</span>
                </div>
            </div>

            <div className={styles.list}>
                {MOCK_REVIEWS.map(review => (
                    <div key={review.id} className={styles.review}>
                        <div className={styles.reviewHeader}>
                            <div className={styles.authorInfo}>
                                <span className={styles.author}>{review.author}</span>
                                <span className={styles.role}>{review.role}</span>
                            </div>
                            <div className={styles.rating}>
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < review.rating ? styles.starFilled : styles.starEmpty}>★</span>
                                ))}
                            </div>
                        </div>
                        <h3 className={styles.reviewTitle}>{review.title}</h3>
                        <p className={styles.reviewContent}>{review.content}</p>
                        <div className={styles.actions}>
                            <span>Helpful?</span>
                            <button>Yes (2)</button>
                            <button>No (0)</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.pagination}>
                <button className={styles.pageBtn}>1</button>
                <button className={styles.pageBtn}>2</button>
                <button className={styles.pageBtn}>3</button>
                <span className={styles.dots}>...</span>
                <button className={styles.pageBtn}>Next</button>
            </div>
        </section>
    );
}
