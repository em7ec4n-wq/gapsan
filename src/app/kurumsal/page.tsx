import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Building, ShieldCheck, Award } from "lucide-react";
import { CONTACT_CONFIG } from "@/lib/gapsan-data";
import CertificatesGrid from "@/components/CertificatesGrid";

export const metadata: Metadata = {
  title: "Kurumsal | Resmi Yetki Belgeleri ve Hakkımızda",
  description:
    "2010 yılından bu yana güvenle hizmet veren GAPSAN Şirketler Grubu kurumsal yapısı, resmi yetki belgeleri (3406225 & 3410913) ve faaliyet alanları.",
  alternates: { canonical: "/kurumsal" },
  openGraph: {
    images: ["/assets/gapsan/gapsan-og-genel.webp"],
  },
};

export default function KurumsalPage() {
  return (
    <div className="gapsan-container py-10 space-y-12">
      <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <img
            src="/assets/gapsan/gapsan-logo.png"
            alt="GAPSAN Şirketler Grubu Kurumsal Logo"
            className="h-20 w-auto object-contain max-[768px]:mx-auto"
          />
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded bg-[#111F35] text-[#D6A948] text-[12px] font-bold">
              2010 Yılından Bu Yana Güvenle...
            </span>
            <span className="px-3 py-1 rounded bg-[#F7F5EF] border border-[#E0E4EA] text-[#111F35] text-[12px] font-semibold">
              MERSİS: {CONTACT_CONFIG.mersisNo}
            </span>
          </div>
          <h1 className="gapsan-h1 text-[#111F35]">Kurumsal</h1>
          <p className="text-[16px] text-[#182538] font-semibold">
            {CONTACT_CONFIG.companyLegalName}
          </p>
          <p className="text-[15px] text-[#536174] leading-relaxed">
            2010 yılından bu yana Esenyurt, İstanbul merkezli yapımızla{" "}
            <strong>Otomotiv (0’ km ve 2. El Senetli Satış Merkezi)</strong>,{" "}
            <strong>İnşaat &amp; Gayrimenkul</strong> ve{" "}
            <strong>Sigorta</strong> alanlarında resmi yetki belgeli, şeffaf ve
            güvenilir hizmet sunuyoruz.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA]">
              <p className="text-[12px] text-[#536174]">
                İkinci El Motorlu Kara Taşıtı Ticareti
              </p>
              <p className="font-heading font-bold text-[15px] text-[#111F35]">
                Yetki Belge No: {CONTACT_CONFIG.otomotivYetkiBelgeNo}
              </p>
            </div>
            <div className="p-3.5 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA]">
              <p className="text-[12px] text-[#536174]">
                Taşınmaz Ticareti Yetki Belgesi
              </p>
              <p className="font-heading font-bold text-[15px] text-[#111F35]">
                Yetki Belge No: {CONTACT_CONFIG.tasinmazYetkiBelgeNo}
              </p>
            </div>
          </div>
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
              className="min-h-[44px] px-5 inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#111F35] text-white font-semibold text-[15px]"
            >
              <Award className="w-4 h-4 text-[#D6A948]" />
              <span>Kurumsal Galeri &amp; Tanıtım</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
          <div className="w-full rounded-[10px] overflow-hidden border border-[#E0E4EA] bg-[#111F35]">
            <img
              src="/assets/gapsan/gapsan-kurumsal-tabela.webp"
              alt="GAPSAN Şirketler Grubu kurumsal tabela detayı"
              className="w-full h-auto object-contain mx-auto"
            />
          </div>
          <div className="w-full rounded-[10px] overflow-hidden border border-[#E0E4EA] bg-white p-2">
            <img
              src="/assets/gapsan/belgeler/gapsan-kurumsal-afis.jpg"
              alt="GAPSAN Şirketler Grubu Faaliyet Alanları ve Sigorta Şirketleri"
              className="w-full h-auto rounded object-contain mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Resmi Yetki Belgeleri ve Sertifikalar */}
      <CertificatesGrid />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-2">
          <Building className="w-6 h-6 text-[#D6A948]" />
          <h2 className="font-heading font-bold text-[20px] text-[#111F35]">
            Faaliyet İlkelerimiz ve Ekspertiz Güvencesi
          </h2>
          <p className="text-[14px] text-[#536174] leading-relaxed">
            Ağır hasar kayıtlı, şase işlemli, podye işlemli, airbag açmış veya
            işlem görmüş ve kilometresi ile oynanmış araçların alım ve satımını
            kesinlikle yapmıyoruz. Tüm senetli satışlarımız kurumsal altyapı ve
            banka tasdiki ile yapılır.
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
