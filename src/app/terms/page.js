import { PortableText } from "next-sanity";
import ThemeSetter from "@/components/ThemeSetter";

export const revalidate = 60; // Revalidate every minute

async function getTermsData() {
    try {
        const query = `*[_type == "legal" && slug.current == "terms"][0]`;
        const data = await client.fetch(query);
        return data;
    } catch (error) {
        console.error("Sanity fetch failed:", error);
        return null;
    }
}

export default async function TermsPage() {
    const data = await getTermsData();

    return (
        <main style={{ backgroundColor: 'var(--color-ivory)', color: 'var(--color-obsidian)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
            <ThemeSetter theme="light" />
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                    {data?.title || "Terms of Service"}
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
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>1. Agreement to Terms</h2>
                                <p>
                                    By accessing our website Isola Vitale and purchasing our products, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                                </p>
                            </section>

                            <section>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>2. Use License</h2>
                                <p>
                                    Permission is granted to temporarily download one copy of the materials (information or software) on Isola Vitale's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                                </p>
                            </section>

                            <section>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>3. Products and Services</h2>
                                <p>
                                    All products are subject to availability. We reserve the right to limit the quantity of products we supply, supply only part of an order or to divide up orders. We also reserve the right to alter the terms or duration of any special offers or sale promotion. We will inform you if we are unable to fulfill your order.
                                </p>
                            </section>

                            <section>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>4. Returns and Refunds</h2>
                                <p>
                                    Our goal is to ensure that you are completely satisfied with your purchase. If for any reason you are not satisfied, please contact us at <a href="mailto:info@1hubsolutions.com" style={{ textDecoration: 'underline', color: 'var(--color-accent)' }}>info@1hubsolutions.com</a> within 30 days of your purchase to arrange a return. Products must be returned in their original condition.
                                </p>
                            </section>

                            <section>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>5. Limitation of Liability</h2>
                                <p>
                                    In no event shall Isola Vitale or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Isola Vitale's website, even if Isola Vitale or a authorized representative has been notified orally or in writing of the possibility of such damage.
                                </p>
                            </section>

                            <section>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>6. Governing Law</h2>
                                <p>
                                    These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                                </p>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
