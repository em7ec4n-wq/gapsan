import React from "react";
import type { Metadata } from "next";
import ProjelerClient from "@/components/ProjelerClient";

export const metadata: Metadata = {
  title: "İnşaat ve Projeler | Gayrimenkul",
  description: "GAPSAN Gayrimenkul bünyesinde yürütülen onaylı inşaat projeleri.",
  alternates: { canonical: "/gayrimenkul/projeler" },
};

export default function ProjelerPage() {
  return <ProjelerClient />;
}
