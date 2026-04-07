import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site-content";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kelelitsolution.com"),
  title: {
    default: "Kelel IT Solution | Enterprise Technology and IT Services",
    template: `%s | ${site.name}`,
  },
  description:
    "Kelel IT Solution helps organizations strengthen operations through enterprise technology, platforms, web systems, infrastructure, and IT support.",
  applicationName: site.name,
  icons: {
    icon: "/icon.jpg",
    apple: "/apple-icon.jpg",
  },
  keywords: [
    "digital infrastructure Africa",
    "financial systems platform",
    "banking systems Ethiopia",
    "insurance platforms Africa",
    "enterprise operations infrastructure",
    "logistics systems platform",
  ],
  openGraph: {
    title: site.name,
    description: site.intro,
    url: "https://kelelitsolution.com",
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} social preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.intro,
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://kelelitsolution.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: "https://kelelitsolution.com",
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.email,
      telephone: site.phone,
      areaServed: "ET",
      availableLanguage: ["en"],
    },
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <div className={`site-frame ${sans.variable} ${serif.variable}`}>
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
