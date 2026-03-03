import { client } from "@/sanity/client";
import { PortableText } from "next-sanity";

export const revalidate = 60; // Revalidate every minute

async function getPrivacyData() {
    try {
        const query = `*[_type == "legal" && slug.current == "privacy"][0]`;
        const data = await client.fetch(query);
        return data;
    } catch (error) {
        console.error("Sanity fetch failed:", error);
        return null;
    }
}

export default async function PrivacyPage() {
    const data = await getPrivacyData();

    return (
        <main style={{ backgroundColor: 'var(--color-ivory)', color: 'var(--color-obsidian)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                    {data?.title || "Privacy Policy"}
                </h1>
                <p style={{ fontFamily: 'var(--font-sans)', textAlign: 'center', opacity: '0.6', marginBottom: '4rem', fontSize: '0.9rem' }}>
                    Last Updated: {data?.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : new Date().toLocaleDateString()}
                </p>

                <div className="prose" style={{ fontFamily: 'var(--font-sans)', lineHeight: '1.8' }}>
                    {data?.content ? (
                        <PortableText value={data.content} />
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {/* FALLBACK CONTENT */}
                            <section>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>1. Introduction</h2>
                                <p>
                                    Welcome to Isola Vitale. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                                </p>
                            </section>

                            <section>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>2. Data We Collect</h2>
                                <p>
                                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                                </p>
                                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                                    <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                                    <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                                    <li><strong>Financial Data:</strong> includes payment card details (processed securely by our third-party payment processors).</li>
                                    <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>3. How We Use Your Data</h2>
                                <p>
                                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                                </p>
                                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                                    <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                                    <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                                    <li>Where we need to comply with a legal or regulatory obligation.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>4. Data Security</h2>
                                <p>
                                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                                </p>
                            </section>

                            <section>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>5. Contact Details</h2>
                                <p>
                                    If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:info@1hubsolutions.com" style={{ textDecoration: 'underline', color: 'var(--color-accent)' }}>info@1hubsolutions.com</a>
                                </p>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
