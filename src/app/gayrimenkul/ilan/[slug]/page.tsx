import React from "react";
import type { Metadata } from "next";
import RealEstateDetailClient from "@/components/RealEstateDetailClient";

export function generateStaticParams() {
  return [{ slug: "ornek-ilan" }];
}

export const metadata: Metadata = {
  title: "Gayrimenkul İlan Detayı",
  description: "GAPSAN Gayrimenkul onaylı taşınmaz ilan detayları.",
  openGraph: {
    images: ["/assets/gapsan/gapsan-og-gayrimenkul.webp"],
  },
};

export default async function RealEstateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <RealEstateDetailClient slug={slug} />;
}
