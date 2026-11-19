import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Building, ShieldCheck } from "lucide-react";
import { CONTACT_CONFIG } from "@/lib/gapsan-data";

export const metadata: Metadata = {
  title: "Kurumsal",
  description:
    "GAPSAN Şirketler Grubu kurumsal yapısı, faaliyet alanları ve iletişim bilgileri.",
  alternates: { canonical: "/kurumsal" },
  openGraph: {
    images: ["/assets/gapsan/gapsan-og-genel.webp"],
  },
};

export default function KurumsalPage() {
  return (
    <div className="gapsan-container py-10 space-y-10">
      <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <img
            src="/assets/gapsan/gapsan-logo.png"
            alt="GAPSAN Şirketler Grubu Kurumsal Logo"
            className="h-20 w-auto object-contain max-[768px]:mx-auto"
          />
          <h1 className="gapsan-h1 text-[#111F35]">Kurumsal</h1>
          <p className="text-[16px] text-[#182538] font-semibold">
            {CONTACT_CONFIG.companyLegalName}
          </p>
          <p className="text-[16px] text-[#536174] leading-relaxed">
            Esenyurt, İstanbul merkezli yapımızla Otomotiv, Gayrimenkul ve
            Sigorta alanlarında doğrudan birim iletişimi ve şeffaf talep
            yönetimi sunuyoruz. Tüm ilan ve hizmet kayıtlarımız işletme onayı
            ve yasal uygunluk kontrolleri sonrasında yayına alınmaktadır.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/iletisim"
              className="min-h-[44px] px-6 inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-semibold text-[15px]"
            >
              <span>Bize Ulaşın</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/kurumsal/galeri"
              className="min-h-[44px] px-5 inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#E0E4EA] hover:bg-[#F7F5EF] text-[#111F35] font-semibold text-[15px]"
            >
              <span>Kurumsal Galeri</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col items-center text-center">
          <div className="w-full rounded-[10px] overflow-hidden border border-[#E0E4EA] bg-[#111F35]">
            <img
              src="/assets/gapsan/gapsan-kurumsal-tabela.webp"
              alt="GAPSAN Şirketler Grubu kurumsal tabela detayı"
              className="w-full h-auto object-contain mx-auto"
            />
          </div>
          <p className="mt-2.5 text-[13px] text-[#536174]">
            Gerçek tabela fotoğrafından marka detayı
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-2">
          <Building className="w-6 h-6 text-[#D6A948]" />
          <h2 className="font-heading font-bold text-[20px] text-[#111F35]">
            Faaliyet İlkelerimiz
          </h2>
          <p className="text-[14px] text-[#536174] leading-relaxed">
            Araç ve taşınmaz ilanlarında yetki belgesi, EİDS kapsamı, kaynak
            doğruluğu ve güncel stok durumu teyit edilmeden canlı yayın
            açılmaz.
          </p>
        </div>

        <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-2">
          <ShieldCheck className="w-6 h-6 text-[#D6A948]" />
          <h2 className="font-heading font-bold text-[20px] text-[#111F35]">
            Müşteri Yorumları Doğrulaması
          </h2>
          <p className="text-[14px] text-[#536174] leading-relaxed">
            Yalnızca gerçek bir işlemle eşleştirilmiş ve açık yayın izni
            bulunan müşteri yorumları yayınlanır.
          </p>
          <Link
            href="/kurumsal/yorum-dogrulama"
            className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#111F35] hover:underline"
          >
            <span>Doğrulama Sürecini İncele</span>
            <ChevronRight className="w-4 h-4 text-[#D6A948]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
