export default function TermsPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-ivory)', color: 'var(--color-obsidian)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
          Terms of Service
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', textAlign: 'center', opacity: '0.6', marginBottom: '4rem', fontSize: '0.9rem' }}>
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <div style={{ fontFamily: 'var(--font-sans)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>1. Agreement to Terms</h2>
            <p>By accessing our website Isola Vitale and purchasing our products, you agree to be bound by these Terms of Service.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>2. Use License</h2>
            <p>Permission is granted to temporarily access materials on Isola Vitale's website for personal, non-commercial viewing only.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>3. Products and Services</h2>
            <p>All products are subject to availability. We reserve the right to limit quantities and alter special offers.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>4. Returns and Refunds</h2>
            <p>Contact us at <a href="mailto:info@isolavitale.com" style={{ color: 'var(--color-accent)' }}>info@isolavitale.com</a> within 30 days for returns. Products must be in original condition.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>5. Governing Law</h2>
            <p>These terms are governed by and construed in accordance with the laws of the United States.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
