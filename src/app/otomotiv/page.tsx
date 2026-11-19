import React from "react";
import type { Metadata } from "next";
import OtomotivClient from "@/components/OtomotivClient";

export const metadata: Metadata = {
  title: "Otomotiv | Araç Alım, Satış ve Takas",
  description:
    "GAPSAN Otomotiv ile araç alım, satış ve takas taleplerinizi oluşturun, onaylı araç ilanlarını inceleyin.",
  alternates: {
    canonical: "/otomotiv",
  },
  openGraph: {
    images: ["/assets/gapsan/gapsan-og-otomotiv.webp"],
  },
};

export default function OtomotivPage() {
  return <OtomotivClient />;
}
