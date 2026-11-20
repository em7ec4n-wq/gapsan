import React from "react";
import type { Metadata } from "next";
import ProjeDetailClient from "@/components/ProjeDetailClient";

export const dynamicParams = true;

export function generateStaticParams() {
  return [{ slug: "ornek-proje" }];
}

export const metadata: Metadata = {
  title: "Proje Detayı | GAPSAN Gayrimenkul",
  description: "GAPSAN Gayrimenkul onaylı proje detayları.",
};

export default async function ProjeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjeDetailClient slug={slug} />;
}
