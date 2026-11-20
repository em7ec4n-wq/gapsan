import React from "react";
import type { Metadata } from "next";
import GayrimenkulClient from "@/components/GayrimenkulClient";

export const metadata: Metadata = {
  title: "İnşaat & Gayrimenkul | Projeler, Satılık ve Kiralık Konut",
  description:
    "GAPSAN İnşaat ve Gayrimenkul ile konut projeleri, geliştirme, satılık ve kiralık gayrimenkul seçeneklerini inceleyin.",
  alternates: {
    canonical: "/insaat",
  },
  openGraph: {
    images: ["/assets/gapsan/gapsan-og-gayrimenkul.webp"],
  },
};

export default function InsaatPage() {
  return <GayrimenkulClient />;
}
