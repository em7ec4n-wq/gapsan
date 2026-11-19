import React from "react";
import type { Metadata } from "next";
import RealEstateListClient from "@/components/RealEstateListClient";

export const metadata: Metadata = {
  title: "Kiralık Gayrimenkul İlanları",
  description:
    "GAPSAN Gayrimenkul kiralık konut ve ticari taşınmaz ilanlarını ilçe ve metrekareye göre filtreleyin.",
  alternates: {
    canonical: "/gayrimenkul/kiralik",
  },
  openGraph: {
    images: ["/assets/gapsan/gapsan-og-gayrimenkul.webp"],
  },
};

export default function KiralikPage() {
  return <RealEstateListClient listingType="Kiralık" />;
}
