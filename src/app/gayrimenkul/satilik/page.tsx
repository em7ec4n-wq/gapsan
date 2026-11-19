import React from "react";
import type { Metadata } from "next";
import RealEstateListClient from "@/components/RealEstateListClient";

export const metadata: Metadata = {
  title: "Satılık Gayrimenkul İlanları",
  description:
    "GAPSAN Gayrimenkul satılık konut, iş yeri ve arsa ilanlarını ilçe ve metrekareye göre filtreleyin.",
  alternates: {
    canonical: "/gayrimenkul/satilik",
  },
  openGraph: {
    images: ["/assets/gapsan/gapsan-og-gayrimenkul.webp"],
  },
};

export default function SatilikPage() {
  return <RealEstateListClient listingType="Satılık" />;
}
