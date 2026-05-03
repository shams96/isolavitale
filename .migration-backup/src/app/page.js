export const dynamic = 'force-dynamic';
import { client } from "@/sanity/client";
import Hero from "@/components/Hero";
import AurabioTech from "@/components/AurabioTech";
import ProductShowcase from "@/components/ProductShowcase"; // Assuming this will also be dynamic later
import SensorySection from "@/components/SensorySection";
import EditorialSection from "@/components/EditorialSection";
import FadeIn from "@/components/FadeIn";
import Image from 'next/image';
// import { groq } from "next-sanity"; // Optional, can use string query

async function getData() {
  try {
    const query = `*[_type == "homepage"][0] {
      heroHeadline,
      heroSubheadline,
      "heroImage": heroImage.asset->url,
      heroCta
    }`;
    const data = await client.fetch(query);
    return data || {};
  } catch (error) {
    console.warn("Sanity fetch failed (likely no project ID), using fallbacks.");
    return {};
  }
}

export default async function Home() {
  const data = await getData();

  return (
    <main>
      <Hero
        imageSrc={data.heroImage || "/hero-model.jpg"}
        headline={data.heroHeadline || "Where Italian Craftsmanship<br />Meets Cellular Science"}
        subheadline={data.heroSubheadline || "Cellular Vitality. Isola Crafted."}
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
