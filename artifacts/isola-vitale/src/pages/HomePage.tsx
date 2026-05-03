import Hero from "@/components/Hero";
import AurabioTech from "@/components/AurabioTech";
import ProductShowcase from "@/components/ProductShowcase";
import SensorySection from "@/components/SensorySection";
import EditorialSection from "@/components/EditorialSection";
import BrandTrustBar from "@/components/BrandTrustBar";
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
      <FadeIn delay={100}>
        <BrandTrustBar />
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
