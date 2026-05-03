import Hero from "@/components/Hero";
import AurabioTech from "@/components/AurabioTech";
import ProductShowcase from "@/components/ProductShowcase";
import SensorySection from "@/components/SensorySection";
import EditorialSection from "@/components/EditorialSection";
import FadeIn from "@/components/FadeIn";
import { usePageSeo } from "@/hooks/usePageSeo";

export default function HomePage() {
  usePageSeo({
    title: 'Italian Luxury Skincare',
    description: 'Where Italian craftsmanship meets cellular science. Clinical-grade skincare engineered in Milano — OS-01 Senomorphic, GLP-1 Protection, refillable luxury vessels.',
    type: 'website',
  });

  return (
    <main>
      <Hero
        imageSrc="/hero-cream.png"
        headline="Where Italian Craftsmanship<br />Meets Cellular Science"
        subheadline="Cellular Vitality. Isola Crafted."
        cta="Discover Collections"
        ctaLink="/products"
      />
      <FadeIn delay={200}>
        <div style={{ textAlign: 'center', padding: '6rem 2rem', backgroundColor: 'var(--color-ivory)', color: 'var(--color-obsidian)' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-accent)' }}>Italian Heritage</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', margin: '1.5rem 0' }}>Crafted in Isola del Liri</h2>
          <p style={{ fontFamily: 'var(--font-sans)', opacity: '0.8', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            In partnership with Natural You Srl, we combine pharmaceutical-grade precision with Italian craft heritage. Five breakthrough technologies—OS-01 Senomorphic, GLP-1 Protection, DWAT Restoration, Ectoin Environmental, and Fermented Complex—deliver laboratory-grade efficacy in luxurious formulations.
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={200}>
        <AurabioTech imageSrc="/aurabio-tech.png" />
      </FadeIn>
      <FadeIn delay={200}>
        <ProductShowcase />
      </FadeIn>
      <FadeIn delay={200}>
        <SensorySection />
      </FadeIn>
      <FadeIn delay={200}>
        <EditorialSection marbleImageSrc="/marble.png" />
      </FadeIn>
    </main>
  );
}
