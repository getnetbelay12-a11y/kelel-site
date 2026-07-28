import type { Metadata } from "next";
import { Fraunces, Geist, JetBrains_Mono } from "next/font/google";
import { SiteEffects } from "@/components/site-effects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site-content";
import { baseUrl, jsonLd } from "@/lib/seo";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "International IT Solutions and Website Development | Kelel IT Solutions",
    template: `%s | ${site.name}`,
  },
  description:
    "Kelel IT Solutions builds websites, custom software, mobile apps, business dashboards, cloud systems, and MongoDB solutions for growing businesses internationally.",
  applicationName: site.name,
  icons: {
    icon: "/icon.jpg",
    apple: "/apple-icon.jpg",
  },
  keywords: [
    "international IT solutions company",
    "small business website development",
    "website development for service businesses",
    "custom software development company",
    "mobile app development company",
    "business dashboard development",
    "cloud deployment services",
    "MongoDB consulting services",
    "remote software development team",
    "Kelel IT Solutions",
  ],
  openGraph: {
    title: site.name,
    description: site.intro,
    url: baseUrl,
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
    canonical: baseUrl,
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
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
    url: baseUrl,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Las Vegas",
      addressRegion: "Nevada",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.email,
      telephone: site.phone,
      areaServed: ["US", "ET", "International"],
      availableLanguage: ["en"],
    },
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: baseUrl,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Las Vegas",
      addressRegion: "Nevada",
      addressCountry: "US",
    },
    areaServed: [
      "Ethiopia",
      "United States",
      "International",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: baseUrl,
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
  };

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(organizationJsonLd)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(localBusinessJsonLd)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(websiteJsonLd)}
        />
        <div className={`site-frame ${geist.variable} ${serif.variable} ${mono.variable}`}>
          <SiteEffects />
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
