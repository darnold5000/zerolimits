import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SITE } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Indoor Baseball Training in Mooresville, IN`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Year-round indoor baseball and softball training in Mooresville, Indiana. Private and group instruction for hitting, pitching, catching, and fielding.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    title: `${SITE.name} | Indoor Baseball Training in Mooresville, IN`,
    description:
      "Year-round indoor baseball and softball training with private and group instruction in Mooresville, Indiana.",
    images: [
      {
        url: "/images/facility/tunnels-wide.jpg",
        alt: "Zero Limits Baseball indoor training facility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Indoor Baseball Training in Mooresville, IN`,
    description:
      "Year-round indoor baseball and softball training with private and group instruction in Mooresville, Indiana.",
    images: ["/images/facility/tunnels-wide.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "SportsActivityLocation"],
  "@id": `${SITE.url}/#business`,
  name: SITE.name,
  url: SITE.url,
  telephone: "+1-765-341-9070",
  description: SITE.tagline,
  image: `${SITE.url}/images/facility/tunnels-wide.jpg`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.zip,
    addressCountry: "US",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: SITE.region,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-zinc-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
