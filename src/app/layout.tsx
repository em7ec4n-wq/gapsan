import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { GapsanStoreProvider } from "@/lib/gapsan-store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsentModal from "@/components/CookieConsentModal";
import { CONTACT_CONFIG, SITE_URL } from "@/lib/gapsan-data";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GAPSAN Şirketler Grubu | Otomotiv, Gayrimenkul ve Sigorta",
    template: "%s | GAPSAN Şirketler Grubu",
  },
  description:
    "Esenyurt, İstanbul merkezli GAPSAN Şirketler Grubu; otomotiv alım-satım ve takas, satılık-kiralık gayrimenkul ve sigorta taleplerinizde yanınızda.",
  icons: {
    icon: "/assets/gapsan/gapsan-favicon.png",
    apple: "/assets/gapsan/gapsan-favicon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "GAPSAN Şirketler Grubu",
    title: "GAPSAN Şirketler Grubu | Otomotiv, Gayrimenkul ve Sigorta",
    description:
      "Otomotiv, gayrimenkul ve sigorta alanlarında Esenyurt, İstanbul merkezli kurumsal hizmet.",
    images: [
      {
        url: "/assets/gapsan/gapsan-og-genel.webp",
        width: 1200,
        height: 630,
        alt: "GAPSAN Şirketler Grubu",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: CONTACT_CONFIG.companyLegalName,
    alternateName: "GAPSAN Şirketler Grubu",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/gapsan/gapsan-logo.png`,
    telephone: "+902125966000",
    email: CONTACT_CONFIG.generalEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Üçevler Mah. 906. Sk. No:1/A",
      addressLocality: "Esenyurt",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
  };

  return (
    <html
      lang="tr"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F5EF] text-[#182538]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GapsanStoreProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsentModal />
        </GapsanStoreProvider>
      </body>
    </html>
  );
}
