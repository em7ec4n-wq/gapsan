import React from "react";
import type { Metadata } from "next";
import OtomotivDetailClient from "@/components/OtomotivDetailClient";
import { DEMO_VEHICLE_LISTING } from "@/lib/gapsan-data";

export const dynamicParams = true;

export function generateStaticParams() {
  return [{ slug: DEMO_VEHICLE_LISTING.slug }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const isDemo = slug === DEMO_VEHICLE_LISTING.slug;

  return {
    title: isDemo ? `${DEMO_VEHICLE_LISTING.title} (Önizleme)` : "Araç İlanı",
    description: isDemo
      ? DEMO_VEHICLE_LISTING.description
      : "GAPSAN Otomotiv araç ilan detayları.",
    robots: isDemo ? { index: false, follow: false } : undefined,
    openGraph: {
      images: ["/assets/gapsan/gapsan-og-otomotiv.webp"],
    },
  };
}

export default async function OtomotivDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <OtomotivDetailClient slug={slug} />;
}
