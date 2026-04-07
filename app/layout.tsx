import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site-content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kelelitsolution.com"),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.intro,
  applicationName: site.name,
  icons: {
    icon: "/icon.jpg",
    apple: "/apple-icon.jpg",
  },
  keywords: [
    "IT solutions Ethiopia",
    "managed IT support Addis Ababa",
    "business systems development",
    "network infrastructure services",
    "corporate website development",
    "digital transformation Ethiopia",
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
        <div className="site-frame">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
