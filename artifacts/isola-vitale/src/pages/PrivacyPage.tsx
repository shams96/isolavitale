export default function PrivacyPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-ivory)', color: 'var(--color-obsidian)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
          Privacy Policy
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', textAlign: 'center', opacity: '0.6', marginBottom: '4rem', fontSize: '0.9rem' }}>
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <div style={{ fontFamily: 'var(--font-sans)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>1. Introduction</h2>
            <p>Welcome to Isola Vitale. We respect your privacy and are committed to protecting your personal data.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>2. Data We Collect</h2>
            <p>We may collect Identity Data, Contact Data, Financial Data, and Transaction Data.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>3. How We Use Your Data</h2>
            <p>We use your data to perform contractual obligations, for legitimate interests, and to comply with legal requirements.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>4. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent unauthorized access to your personal data.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>5. Contact Details</h2>
            <p>If you have any questions about this privacy policy, please contact us at: <a href="mailto:info@isolavitale.com" style={{ textDecoration: 'underline', color: 'var(--color-accent)' }}>info@isolavitale.com</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}
