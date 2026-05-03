import styles from '@/app/products/[slug]/page.module.css';
import { Link, useParams } from 'wouter';
import ProductActions from '@/components/ProductActions';
import Accordion from '@/components/Accordion';
import VideoSection from '@/components/VideoSection';
import ReviewSection from '@/components/ReviewSection';
import ProductCard from '@/components/ProductCard';
import SocialShare from '@/components/SocialShare';
import JsonLd from '@/components/JsonLd';
import { getProductBySlug, getRelatedProducts } from '@/data/items';
import type { Product } from '@/types/product';
import { usePageSeo } from '@/hooks/usePageSeo';

const COLLECTION_LABELS: Record<string, string> = {
  laboratory: 'Laboratory Collection',
  daily: 'Daily Collection',
  chronos: 'Cellular Chronos',
};

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const product = getProductBySlug(slug) as Product | undefined;

  usePageSeo({
    title: product
      ? `${product.name} — ${COLLECTION_LABELS[product.collection] ?? product.collection}`
      : 'Product Not Found',
    description: product ? `${product.truth ?? ''} ${product.description ?? ''}`.slice(0, 155) : '',
    image: product?.imageSrc,
    type: 'product',
  });

  if (!product) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 'var(--page-padding-top)' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}>Product Not Found</h1>
      </main>
    );
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description ?? product.truth,
    image: product.imageSrc,
    brand: { '@type': 'Brand', name: 'Isola Vitale' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.fullPrice,
      availability: 'https://schema.org/InStock',
      url: `https://isolavitale.com/products/${product.slug}`,
    },
  };

  const upsells = (getRelatedProducts(slug) as Product[]).map(p => ({
    ...p,
    id: p.id,
    slug: p.slug,
    name: p.name,
    technologies: p.technologies,
    imageSrc: p.imageSrc,
    price: `$${p.fullPrice}`,
  }));

  const collectionLabel = product.collection === 'chronos'
    ? `Cellular Chronos · Ages ${product.ageRange ?? ''}`
    : COLLECTION_LABELS[product.collection] ?? product.collection;

  return (
    <main className={`${styles.main} env-white`}>
      <JsonLd data={productJsonLd} />

      {/* ── Main grid: sticky image + scrollable info ── */}
      <div className={styles.grid}>

        {/* LEFT: sticky editorial image */}
        <div className={styles.imagePanel}>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>·</span>
            <Link href="/products">Skin Care</Link>
            <span className={styles.breadcrumbSep}>·</span>
            <span>{product.name}</span>
          </div>
          <img
            src={product.imageSrc}
            alt={product.name}
            className={styles.productImage}
          />
          <span className={styles.imageSideLabel}>Isola Vitale · Milano</span>
        </div>

        {/* RIGHT: scrollable product info */}
        <div className={styles.infoPanel}>

          {/* Collection + step pill */}
          <div className={styles.collectionRow}>
            <span className={styles.subtitle}>{collectionLabel}</span>
            {product.step && (
              <span className={styles.stepPill}>{product.step}</span>
            )}
          </div>

          {/* Product name */}
          <h1 className={styles.name}>{product.name}</h1>

          {/* Technologies */}
          {product.technologies && (
            <p className={styles.technologies}>{product.technologies}</p>
          )}

          {/* Rating */}
          <div className={styles.ratingSummary}>
            <span className={styles.stars}>★★★★★</span>
            <span className={styles.ratingText}>4.8 · 142 Reviews</span>
          </div>

          {/* Editorial truth statement */}
          <p className={styles.truth}>{product.truth}</p>

          {/* Purchase options */}
          <ProductActions
            product={product}
            fullPrice={product.fullPrice}
            refillPrice={product.refillPrice ?? product.fullPrice}
            subscriptionPrice={product.subscriptionPrice}
          />

          {/* Trust row */}
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>✦</span>
              <span className={styles.trustLabel}>Free Delivery</span>
              <span className={styles.trustValue}>Orders over $200</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>◇</span>
              <span className={styles.trustLabel}>Refillable Vessel</span>
              <span className={styles.trustValue}>Infinite reuse design</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>◎</span>
              <span className={styles.trustLabel}>Italian Craft</span>
              <span className={styles.trustValue}>Formulated in Milano</span>
            </div>
          </div>

          <SocialShare
            title={`Isola Vitale — ${product.name}`}
            text={`Discover ${product.name}: ${product.truth}`}
          />

          {/* Accordions */}
          <div className={styles.accordions}>
            <Accordion title="What It Does" defaultOpen={true}>
              <span>{product.description}</span>
              {product.benefits && product.benefits.length > 0 && (
                <ul style={{ marginTop: '1.5rem', paddingLeft: '1.25rem', lineHeight: '1.9' }}>
                  {product.benefits.map((benefit: string, idx: number) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              )}
            </Accordion>

            {product.keyIngredients && product.keyIngredients.length > 0 && (
              <Accordion title="Key Ingredients">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {product.keyIngredients.map((ingredient: any, idx: number) => (
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderBottom: '0.5px solid rgba(10,26,21,0.07)', paddingBottom: '1.25rem' }}>
                      <strong style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: '0.95rem', color: 'var(--color-emerald)' }}>{ingredient.name}</strong>
                      <span style={{ opacity: 0.55, fontSize: '0.85rem', lineHeight: '1.6' }}>{ingredient.benefit}</span>
                    </div>
                  ))}
                </div>
              </Accordion>
            )}

            {product.texture && (
              <Accordion title="Sensory Profile">
                <span>{product.texture}</span>
              </Accordion>
            )}

            {product.usage && (
              <Accordion title="How to Use">
                <span>{product.usage}</span>
              </Accordion>
            )}

            {product.whoItsFor && (
              <Accordion title="Who It's For">
                <span>{product.whoItsFor}</span>
              </Accordion>
            )}

            <Accordion title="Common Questions">
              <p><strong>Is this suitable for sensitive skin?</strong><br />Yes, the bio-adaptive formula is designed to reduce reactivity while delivering clinical-grade results.</p>
              <p style={{ marginTop: '1.25rem' }}><strong>How long does a vessel last?</strong><br />With daily use morning and night, one vessel lasts approximately 6–8 weeks.</p>
              {product.subscriptionPrice && (
                <p style={{ marginTop: '1.25rem' }}><strong>Can I subscribe and save?</strong><br />Yes — subscribe and save 20% on every delivery. Cancel anytime after your first order.</p>
              )}
            </Accordion>
          </div>
        </div>
      </div>

      {/* ── Clinical Science Section ── */}
      {product.clinicalResults && (
        <section className={styles.scienceSection}>
          <div className={styles.scienceLeft}>
            <span className={styles.scienceLabel}>Proven Efficacy</span>
            <h2 className={styles.scienceHeading}>The Science<br />Behind the Ritual</h2>
            <p className={styles.scienceDuration}>
              Results proven in {product.clinicalResults.duration}
            </p>
          </div>
          <div className={styles.scienceResults}>
            {product.clinicalResults.results.map((result: any, idx: number) => (
              <div key={idx} className={styles.scienceStat}>
                <span className={styles.scienceStatValue}>{result.value}</span>
                <span className={styles.scienceStatMetric}>{result.metric}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <VideoSection />
      <ReviewSection />

      {/* ── Complete the Ritual ── */}
      <section className={styles.upsellSection}>
        <div className={styles.upsellHeader}>
          <h2 className={styles.upsellTitle}>Complete the Ritual</h2>
          <Link href="/system" className={styles.viewAllLink}>Shop The System →</Link>
        </div>
        <div className={styles.upsellGrid}>
          {upsells.map((item, idx) => (
            <ProductCard key={idx} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
