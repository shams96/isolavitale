import { useState } from 'react';
import SystemBundle from "@/components/SystemBundle";
import FadeIn from "@/components/FadeIn";

const RITUALS = {
  AM: [
    {
      step: "01",
      product: "Multi-Hydration Mist",
      desc: "Just as dry soil cannot absorb rain, dry skin repels treatment. The Mist creates a permeable, hydrated pathway for bio-actives."
    },
    {
      step: "02",
      product: "Peptide Renewal Essence",
      desc: "A water-light signaling fluid. Applied before heavier creams to ensure peptides reach cellular receptors without lipid obstruction."
    },
    {
      step: "03",
      product: "Barrier Repair Cream",
      desc: "The final lipid layer. It biomimics the stratum corneum to lock in hydration and prevent transepidermal water loss."
    },
    {
      step: "04",
      product: "Antioxidant Defense SPF 50+",
      desc: "The invisible shield. Protects the investments of the previous steps against the primary driver of aging: UV radiation."
    }
  ],
  PM: [
    {
      step: "01",
      product: "Multi-Hydration Mist",
      desc: "Crucial at night to reset the skin's pH after cleansing and prepare it for deep regeneration."
    },
    {
      step: "02",
      product: "Peptide Renewal Essence",
      desc: "Delivers maximum signaling complexes during the skin's peak repair window (11 PM - 4 AM)."
    },
    {
      step: "PM",
      product: "Night Renewal Treatment",
      isReplacement: true,
      desc: "The 'Sleeping Seal'. A rich balm-to-oil that REPLACES the Barrier Cream. It provides an occlusive cocoon for intensive overnight repair."
    }
  ]
};

export default function SystemPage() {
  const [activeTab, setActiveTab] = useState<'AM' | 'PM'>('AM');
  const steps = RITUALS[activeTab];

  const containerStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-obsidian)',
    color: 'var(--color-ivory)',
    minHeight: '100vh',
    paddingTop: 'var(--page-padding-top)'
  };

  const headerStyle: React.CSSProperties = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '6rem',
    textAlign: 'center'
  };

  return (
    <main style={containerStyle}>
      <FadeIn>
        <header style={headerStyle}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-accent)', display: 'block', marginBottom: '2rem' }}>
            The Protocol
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '4rem', fontWeight: 300, marginBottom: '2rem' }}>
            Intelligent Layering
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', opacity: 0.7, lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
            Each product is formulated to amplify the next. The System is not a collection. It is a sequence.
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={200}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', borderRadius: '50px', padding: '4px', gap: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
            {(['AM', 'PM'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? 'var(--color-ivory)' : 'transparent',
                  border: 'none',
                  color: activeTab === tab ? 'var(--color-obsidian)' : 'var(--color-ivory)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '12px 32px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab ? 600 : 400,
                  opacity: activeTab === tab ? 1 : 0.6,
                  transition: 'all 0.3s ease'
                }}
              >
                {tab === 'AM' ? 'Morning Protocol' : 'Evening Protocol'}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={300}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 6rem 6rem' }}>
          {steps.map((stepData, index) => (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                gap: '3rem',
                padding: '3rem 0',
                borderBottom: '0.5px solid rgba(255,255,255,0.1)',
                ...(stepData.isReplacement ? { border: '1px solid var(--color-accent)', padding: '2rem', borderRadius: '4px', marginBottom: '1rem', background: 'rgba(197,160,89,0.05)' } : {})
              }}
            >
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', opacity: 0.2, lineHeight: 1 }}>
                {stepData.step}
              </span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem', color: stepData.isReplacement ? 'var(--color-accent)' : 'var(--color-ivory)' }}>
                  {stepData.product}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', opacity: 0.6, lineHeight: 1.8 }}>{stepData.desc}</p>
                {stepData.isReplacement && (
                  <span style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--color-accent)', color: 'var(--color-obsidian)', padding: '3px 10px', borderRadius: '2px', fontWeight: 600 }}>
                    Replaces Day Cream
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={400}>
        <SystemBundle />
      </FadeIn>
    </main>
  );
}
