import { Link } from 'wouter';

export default function RefillPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-obsidian)', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '6rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', display: 'flex', flexDirection: 'column', gap: '8rem' }}>

        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-accent)' }}>
            Intelligent Replenishment
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', marginTop: '1rem', fontWeight: '400', lineHeight: '1.2' }}>
            Designed to Last<br />a Lifetime
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', marginTop: '2rem', lineHeight: '1.7', opacity: '0.9', fontSize: '1.1rem' }}>
            Join the <b>Circularity Protocol</b>. Subscribe to receiving fresh molecular refills on your schedule, and never pay for the vessel again.
          </p>
          <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link href="/account" style={{
              backgroundColor: 'var(--color-ivory)',
              color: 'var(--color-obsidian)',
              padding: '1rem 2rem',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}>
              Manage Subscription
            </Link>
            <Link href="/products" style={{
              border: '1px solid var(--color-ivory)',
              color: 'var(--color-ivory)',
              padding: '1rem 2rem',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.8rem'
            }}>
              Shop Refills
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1.5rem' }}>Ownership over Consumption</h2>
            <p style={{ fontFamily: 'var(--font-sans)', lineHeight: '1.7', opacity: '0.8', marginBottom: '2rem' }}>
              Luxury is not disposable. Our primary vessels are crafted from heavyweight violet glass and stone, designed to protect the bio-active ingredients from light degradation.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, fontFamily: 'var(--font-sans)', fontSize: '0.9rem', opacity: '0.9', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--color-accent)' }}>✓</span> 20% savings on every refill
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--color-accent)' }}>✓</span> Free shipping on subscription orders
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--color-accent)' }}>✓</span> Cancel or pause anytime
              </li>
            </ul>
          </div>
          <div className="u-aspect-ratio-plinth" style={{ borderRadius: '4px', position: 'relative' }}>
            <img src="/refill-pod-fixed.png" alt="Aluminum Refill Cartridge" className="u-image-fit" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', borderTop: '1px solid rgba(244,243,239,0.2)', paddingTop: '4rem' }}>
          {[
            { num: '01', title: 'Unlock', desc: 'Twist the base of the vessel to release the empty core. Our weighted mechanism ensures a satisfying, precise release.' },
            { num: '02', title: 'Replace', desc: 'Insert the fresh cold-touch aluminum cartridge. Listen for the signature click to confirm bio-seal integrity.' },
            { num: '03', title: 'Reactivate', desc: 'Your vessel is renewed. Return the empty cartridge in the provided prepaid envelope for molecular recycling.' }
          ].map(step => (
            <div key={step.num}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '3rem', opacity: '0.2' }}>{step.num}</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: '1rem 0' }}>{step.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', opacity: '0.7', lineHeight: '1.6' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
