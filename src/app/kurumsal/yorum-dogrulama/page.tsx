import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Müşteri Yorumları Doğrulama Politikası",
  description:
    "GAPSAN Şirketler Grubu müşteri yorumlarının doğrulama ve yayın esasları.",
  alternates: { canonical: "/kurumsal/yorum-dogrulama" },
};

export default function YorumDogrulamaPage() {
  return (
    <div className="gapsan-container py-10 max-w-3xl">
      <Link
        href="/kurumsal"
        className="inline-flex items-center gap-1 text-[14px] font-medium text-[#536174] hover:text-[#111F35] mb-4"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Kurumsal Sayfasına Dön</span>
      </Link>

      <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 md:p-8 space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F7F5EF] border border-[#D6A948] text-[13px] font-semibold text-[#111F35]">
          <BadgeCheck className="w-4 h-4 text-[#D6A948]" />
          <span>Doğrulanmış Müşteri Esasları</span>
        </div>
        <h1 className="gapsan-h1 text-[#111F35]">
          Yorum Doğrulama Açıklaması
        </h1>
        <p className="text-[16px] text-[#536174] leading-relaxed">
          GAPSAN Şirketler Grubu web sitesinde yayınlanan müşteri yorumları,
          yalnızca tamamlanmış bir hizmet veya işlem kaydı ile eşleştirilen ve
          müşterinin açık yayın izni alınan değerlendirmelerden oluşur.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-[15px] text-[#182538]">
          <li>
            <strong>İşlem Eşleştirmesi:</strong> Her yorum, ilgili birim
            (Otomotiv, Gayrimenkul veya Sigorta) işlem kaydıyla dahili panelde
            eşleştirilir.
          </li>
          <li>
            <strong>Yayın İzni:</strong> Müşterinin açık onayı olmadan hiçbir
            yorum veya isim kamuya açık alanda yayınlanmaz.
          </li>
          <li>
            <strong>Gizlilik:</strong> İşlem referans ve doğrulama kayıtları
            yalnızca yetkili yönetim panelinde saklanır, dışarıya açılmaz.
          </li>
        </ul>
      </div>
    </div>
  );
}
