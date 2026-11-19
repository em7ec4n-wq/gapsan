import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Kurumsal Galeri",
  description: "GAPSAN Şirketler Grubu kurumsal tabela ve ofis görselleri.",
  alternates: { canonical: "/kurumsal/galeri" },
  openGraph: {
    images: ["/assets/gapsan/gapsan-og-genel.webp"],
  },
};

export default function KurumsalGaleriPage() {
  return (
    <div className="gapsan-container py-10 space-y-8">
      <div>
        <Link
          href="/kurumsal"
          className="inline-flex items-center gap-1 text-[14px] font-medium text-[#536174] hover:text-[#111F35] mb-3"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kurumsal Sayfasına Dön</span>
        </Link>
        <h1 className="gapsan-h1 text-[#111F35]">Kurumsal Galeri</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-5 flex flex-col items-center text-center">
          <img
            src="/assets/gapsan/gapsan-kurumsal-tabela.webp"
            alt="GAPSAN kurumsal tabela detayı"
            className="w-full max-w-[480px] h-auto rounded-[10px] object-contain mx-auto"
          />
          <p className="mt-3 text-[14px] font-semibold text-[#111F35]">
            GAPSAN Kurumsal Tabela Detayı
          </p>
          <p className="text-[13px] text-[#536174]">
            Üçevler, 906. Sk. No:1/A, Esenyurt/İstanbul
          </p>
        </div>

        <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-4">
          <h2 className="font-heading font-bold text-[22px] text-[#111F35]">
            Ofis ve Galeri Çekimleri
          </h2>
          <p className="text-[15px] text-[#536174] leading-relaxed">
            Gerçek ofis, galeri ve saha çekimleri işletme yayın izni
            onaylandıkça bu galeride yayınlanmaktadır.
          </p>
          <Link
            href="/iletisim"
            className="min-h-[44px] px-5 inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#D6A948] text-[#111F35] font-semibold text-[14px]"
          >
            <span>Bize Ulaşın</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
