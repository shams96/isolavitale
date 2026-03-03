import FadeIn from "@/components/FadeIn";
import Image from "next/image";

export default function TechnologyPage() {
    return (
        <main style={{ backgroundColor: 'var(--color-ivory)', minHeight: '100vh', color: 'var(--color-obsidian)' }}>
            <div style={{ position: 'relative', height: '60vh', width: '100%' }}>
                <Image src="/aurabio-tech.png" alt="Aurabio Intelligence" fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '10%', left: '5%', color: 'var(--color-ivory)', zIndex: 10 }}>
                    <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>Isola Vitale Skin Intelligence</h2>
                    <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', maxWidth: '600px', lineHeight: '1.2' }}>Systemic Bio-Adaptation</h1>
                </div>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '6rem 2rem' }}>
                <FadeIn>
                    <section style={{ marginBottom: '6rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-accent)', marginBottom: '2rem' }}>The Intelligence</h3>
                        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', lineHeight: '1.4' }}>
                            Isola Vitale is not an ingredient. It is a communication system. A bio-adaptive complex designed to read micro-signals from the skin structure and respond with precise intervention.
                        </p>
                    </section>
                </FadeIn>

                <FadeIn delay={200}>
                    <section style={{ marginBottom: '6rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-accent)', marginBottom: '3rem' }}>How It Works</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                            <div>
                                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1rem' }}>Active Signaling</h4>
                                <p style={{ fontFamily: 'var(--font-sans)', opacity: '0.8', lineHeight: '1.6' }}>Detects areas of lipid depletion and structural fatigue before they become visible.</p>
                            </div>
                            <div>
                                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1rem' }}>Structural Reinforcement</h4>
                                <p style={{ fontFamily: 'var(--font-sans)', opacity: '0.8', lineHeight: '1.6' }}>Delivers molecular support to the skin barrier, mimicking the body's own repair mechanisms.</p>
                            </div>
                            <div>
                                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1rem' }}>Circadian Alignment</h4>
                                <p style={{ fontFamily: 'var(--font-sans)', opacity: '0.8', lineHeight: '1.6' }}>Synchronizes hydration release with the skin's nocturnal and diurnal cycles.</p>
                            </div>
                            <div>
                                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1rem' }}>Adaptive Hydration</h4>
                                <p style={{ fontFamily: 'var(--font-sans)', opacity: '0.8', lineHeight: '1.6' }}>Adjusts moisture levels based on ambient humidity and internal stress factors.</p>
                            </div>
                        </div>
                    </section>
                </FadeIn>

                <FadeIn delay={400}>
                    <section>
                        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-accent)', marginBottom: '2rem' }}>Why It Matters</h3>
                        <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid rgba(10,10,10,0.1)', paddingTop: '2rem' }}>
                            <p style={{ fontFamily: 'var(--font-sans)', opacity: '0.8', lineHeight: '1.6', flex: 1 }}>
                                Traditional skincare forces the skin to adapt to the product. Isola Vitale adapts to the skin. This ensures maximum tolerance and long-term resilience without the cycle of inflammation.
                            </p>
                            <p style={{ fontFamily: 'var(--font-sans)', opacity: '0.8', lineHeight: '1.6', flex: 1 }}>
                                The result is inevitable: skin that functions at its peak biological potential, regardless of age or environment.
                            </p>
                        </div>
                    </section>
                </FadeIn>
            </div>
        </main>
    );
}
