import React from "react";
import type { Metadata } from "next";
import GayrimenkulClient from "@/components/GayrimenkulClient";

export const metadata: Metadata = {
  title: "Gayrimenkul | Satılık, Kiralık ve İnşaat",
  description:
    "GAPSAN Gayrimenkul ile satılık ve kiralık konut, iş yeri ve arsa seçeneklerini inceleyin.",
  alternates: {
    canonical: "/gayrimenkul",
  },
  openGraph: {
    images: ["/assets/gapsan/gapsan-og-gayrimenkul.webp"],
  },
};

export default function GayrimenkulPage() {
  return <GayrimenkulClient />;
}
