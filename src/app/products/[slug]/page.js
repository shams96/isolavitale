export const dynamic = 'force-dynamic';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import ProductActions from '@/components/ProductActions';
import Accordion from '@/components/Accordion';
import VideoSection from '@/components/VideoSection';
import ReviewSection from '@/components/ReviewSection';
import ProductCard from '@/components/ProductCard';
import SocialShare from '@/components/SocialShare';
import { client } from '@/sanity/client';
import { getProductBySlug, getRelatedProducts } from '@/data/items';

async function getSanityProduct(slug) {
    try {
        const query = `*[_type == "product" && slug.current == "${slug}"][0] {
      name,
      "slug": slug.current,
      step,
      truth,
      description,
      texture,
      usage,
      fullPrice,
      refillPrice,
      "imageSrc": image.asset->url
    }`;
        const data = await client.fetch(query);
        return data; // Returns null if not found
    } catch (error) {
        return null;
    }
}

// Open Graph Metadata Generation
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const sanityProduct = await getSanityProduct(slug);
    const mockProduct = getProductBySlug(slug);
    const product = sanityProduct || mockProduct;

    if (!product) return { title: 'Isola Vitale — Product Not Found' };

    return {
        title: `${product.name} | Isola Vitale`,
        description: product.description ?
            `${product.description.substring(0, 150)}... ${product.technologies || 'Cellular Vitality. Isola Crafted.'}` :
            'Luxury Italian skincare with breakthrough cellular technologies.',
        openGraph: {
            title: `${product.name} — Isola Vitale`,
            description: product.technologies || product.truth || 'Italian Craftsmanship Meets Cellular Science',
            images: [product.imageSrc || product.image || '/serum-uniform.png'],
        },
    };
}

import JsonLd from '@/components/JsonLd';

export default async function ProductPage({ params }) {
    const { slug } = await params;
    const sanityProduct = await getSanityProduct(slug);
    const mockProduct = getProductBySlug(slug);

    // Prefer Sanity data, fallback to new Mock Data
    const product = sanityProduct || mockProduct;

    if (!product) {
        return (
            <main className={styles.main} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1>Product Not Found (404)</h1>
            </main>
        );
    }

    // SEO: Structure Data
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: (product.imageSrc || product.image) ? `https://www.isolavitale.com${product.imageSrc || product.image}` : undefined,
        description: product.description,
        sku: product.id,
        brand: {
            '@type': 'Brand',
            name: 'Isola Vitale',
            slogan: 'Milano'
        },
        offers: {
            '@type': 'Offer',
            url: `https://www.isolavitale.com/products/${product.slug}`,
            priceCurrency: 'USD',
            price: product.fullPrice,
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '142'
        }
    };

    const upsells = getRelatedProducts(slug).map(p => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        tagline: p.technologies || `Step ${p.step}`,
        imageSrc: p.imageSrc || p.image,
        price: `$${p.fullPrice}`
    }));

    return (
        <main className={styles.main}>
            <JsonLd data={productSchema} />
            {/* Breadcrumbs */}
            <div className={styles.breadcrumbs}>
                <Link href="/">Home</Link> / <Link href="/products">Skin Care</Link> / <span>{product.name}</span>
            </div>

            <div className={styles.grid}>
                {/* Product Image */}
                <div className={`${styles.imageContainer} u-aspect-ratio-plinth`}>
                    {/* Add a specific aspect ratio container or styling if needed */}
                    <Image
                        src={product.imageSrc || product.image}
                        alt={product.name}
                        fill
                        className="u-image-fit"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Product Info */}
                <div className={styles.info}>
                    {/* Header */}
                    <div>
                        {product.collection && (
                            <span className={styles.subtitle}>
                                {product.collection === 'laboratory' && 'Laboratory Collection'}
                                {product.collection === 'daily' && 'Daily Collection'}
                                {product.collection === 'chronos' && `Cellular Chronos • Ages ${product.ageRange}`}
                            </span>
                        )}
                        <h1 className={styles.name}>{product.name}</h1>
                        {product.technologies && (
                            <p className={styles.technologies}>{product.technologies}</p>
                        )}
                        <div className={styles.ratingSummary}>
                            <span className={styles.stars}>★★★★★</span>
                            <span className={styles.ratingText}>4.8 (142 Reviews)</span>
                        </div>
                        <p className={styles.truth}>{product.truth}</p>
                    </div>

                    {/* Actions */}
                    <ProductActions
                        product={product}
                        fullPrice={product.fullPrice}
                        refillPrice={product.refillPrice}
                        subscriptionPrice={product.subscriptionPrice}
                    />

                    {/* Social Share */}
                    <SocialShare
                        title={`Isola Vitale — ${product.name}`}
                        text={`Discover ${product.name}: ${product.truth}`}
                    />

                    {/* Details Accordions */}
                    <div className={styles.accordions}>
                        <Accordion title="What it Does" defaultOpen={true}>
                            {product.description}
                            {product.benefits && product.benefits.length > 0 && (
                                <div style={{ marginTop: '1.5rem' }}>
                                    <strong style={{ display: 'block', marginBottom: '0.75rem' }}>Key Benefits:</strong>
                                    <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8' }}>
                                        {product.benefits.map((benefit, idx) => (
                                            <li key={idx}>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Accordion>

                        {product.keyIngredients && product.keyIngredients.length > 0 && (
                            <Accordion title="Key Ingredients">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {product.keyIngredients.map((ingredient, idx) => (
                                        <div key={idx}>
                                            <strong>{ingredient.name}</strong>
                                            <p style={{ marginTop: '0.25rem', opacity: 0.8 }}>{ingredient.benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </Accordion>
                        )}

                        {product.clinicalResults && (
                            <Accordion title="Clinical Results">
                                <p style={{ marginBottom: '1rem' }}>
                                    <strong>Proven Results in {product.clinicalResults.duration}</strong>
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {product.clinicalResults.results.map((result, idx) => (
                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span>{result.metric}</span>
                                            <strong style={{ color: 'var(--color-accent)' }}>{result.value}</strong>
                                        </div>
                                    ))}
                                </div>
                            </Accordion>
                        )}

                        <Accordion title="Sensory Profile">
                            {product.texture}
                        </Accordion>

                        <Accordion title="How to Use">
                            {product.usage}
                        </Accordion>

                        {product.whoItsFor && (
                            <Accordion title="Who It's For">
                                {product.whoItsFor}
                            </Accordion>
                        )}

                        <Accordion title="Common Questions">
                            <p><strong>Is this suitable for sensitive skin?</strong><br />Yes, the bio-adaptive formula is designed to reduce reactivity.</p>
                            <p style={{ marginTop: '1rem' }}><strong>How long does a bottle last?</strong><br />With daily use (morning and night), one vessel lasts approximately 6-8 weeks.</p>
                            {product.subscriptionPrice && (
                                <p style={{ marginTop: '1rem' }}><strong>Can I subscribe and save?</strong><br />Yes! Subscribe and save 20% on every delivery. Cancel anytime after your first delivery.</p>
                            )}
                        </Accordion>
                    </div>
                </div>
            </div>

            {/* Rich Content Sections */}
            <VideoSection />

            <ReviewSection />

            {/* Upsells */}
            <section className={styles.upsellSection}>
                <div className={styles.upsellHeader}>
                    <h2 className={styles.upsellTitle}>Experience more from this series</h2>
                    <Link href="/system" className={styles.viewAllLink}>Shop The System</Link>
                </div>
                <div className={styles.upsellGrid}>
                    {upsells.map((item, idx) => (
                        <div key={idx} className={styles.upsellWrapper}>
                            <ProductCard product={item} />
                        </div>
                    ))}
                </div>
            </section>

        </main>
    );
}
