export default function ContactPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-ivory)', color: 'var(--color-obsidian)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
          Get in Touch
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', textAlign: 'center', opacity: '0.6', marginBottom: '4rem', fontSize: '0.9rem' }}>
          Our concierge team is at your disposal.
        </p>

        <div style={{ fontFamily: 'var(--font-sans)', lineHeight: '1.8' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '2rem', border: '1px solid var(--color-gold)', borderRadius: '8px', width: '100%' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-accent)' }}>Concierge Service</h2>
              <p style={{ marginBottom: '1.5rem' }}>For order inquiries, product consultations, or press requests, please email us directly.</p>
              <a
                href="mailto:info@isolavitale.com"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--color-emerald)',
                  color: 'var(--color-white)',
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  letterSpacing: '0.05em'
                }}
              >
                Email Us: info@isolavitale.com
              </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', width: '100%' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Headquarters</h3>
                <p style={{ opacity: 0.8 }}>
                  1314 Waterdown Dr.<br />
                  Allen TX 75013, USA
                </p>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Research Laboratory</h3>
                <p style={{ opacity: 0.8 }}>
                  Via Borgo San Domenico 134<br />
                  03036 Isola del Liri (FR), Italy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
