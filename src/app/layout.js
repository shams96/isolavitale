import { Cormorant_Garamond, Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

// Canicule Display alternative - Elegant serif with high contrast for Mediterranean luxury
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
});

// Neue Haas Unica alternative - Clean, Swiss, invisible sans-serif
const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: "Isola Vitale | Liri Mineral-Infused Italian Luxury Skincare",
  description: "Experience waterfall-powered beauty rituals from Isola del Liri. Lab-engineered peptides and sustainable refillable luxury. Defined by Italian Craftsmanship and Skin Longevity.",
  keywords: [
    "Liri Mineral-Infused Skincare", "Waterfall-Powered Beauty Rituals", "Italian Craftsmanship", "Skin Longevity",
    "Clean Label Luxury", "Sustainable Beauty", "Ceramide Barrier Repair",
    "Advanced Peptides", "Regenerative Beauty", "Barrier-First Skincare", "Bio-Adaptive Tech", "Postbiotic Barrier Support", "Skinimalism 2.0"
  ],
  metadataBase: new URL('https://www.isolavitale.com'),
};

export const viewport = {
  width: "width=device-width",
  initialScale: 1,
  maximumScale: 5,
};

import JsonLd from "@/components/JsonLd";

export default function RootLayout({ children }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Isola Vitale',
    url: 'https://www.isolavitale.com',
    logo: 'https://www.isolavitale.com/logo.png',
    description: 'Liri Mineral-Infused Italian Luxury Skincare.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Isola del Liri',
      addressRegion: 'Frosinone',
      addressCountry: 'IT'
    },
    sameAs: [
      'https://www.instagram.com/isolavitale',
      'https://www.facebook.com/isolavitale'
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorantGaramond.variable} ${workSans.variable}`} suppressHydrationWarning>
        <JsonLd data={orgSchema} />
        <CartProvider>
          <Header />
          <CartDrawer />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
