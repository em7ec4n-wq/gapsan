import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Phone,
  Mail,
  ChevronRight,
  MessageCircle,
  CheckCircle2,
  Building2,
  Globe,
} from "lucide-react";
import RequestBuilder from "@/components/RequestBuilder";
import { CONTACT_CONFIG, INSURANCE_PARTNERS } from "@/lib/gapsan-data";

export const metadata: Metadata = {
  title: "Sigorta | Trafik, Kasko, DASK ve Sağlık Sigortası",
  description:
    "GAPSAN Sigorta ile Kasko, Trafik, DASK (DSK) ve Sağlık sigortalarınızı tek bir adresten, iyi fiyat avantajıyla alın. 27 anlaşmalı sigorta şirketiyle hizmetinizdeyiz.",
  alternates: {
    canonical: "/sigorta",
  },
  openGraph: {
    images: ["/assets/gapsan/gapsan-og-sigorta.webp"],
  },
};

export default function SigortaPage() {
  return (
    <div>
      {/* Cover */}
      <section className="relative bg-[#111F35] text-white min-h-[360px] md:min-h-[420px] py-12 overflow-hidden flex items-center">
        <img
          src="/assets/gapsan/gapsan-sigorta-konsept.webp"
          alt="Gapşan Sigorta evrak kapağı"
          style={{ objectPosition: "65% 65%" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(17,31,53,0.94) 0%, rgba(17,31,53,0.72) 58%, rgba(17,31,53,0.28) 100%)",
          }}
        />
        <div className="relative z-10 w-full gapsan-container">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded bg-[#D6A948] text-[#111F35] text-[12px] font-extrabold uppercase tracking-wide">
              7/24 Müşteri Hizmetleri Hizmetinizde
            </span>
            <span className="px-3 py-1 rounded bg-white/15 border border-white/25 text-white text-[12px] font-semibold">
              Bize Sormadan Teklif Almayın!
            </span>
          </div>
          <h1 className="gapsan-h1 text-white max-w-[680px]">GAPSAN Sigorta</h1>
          <p className="mt-3 text-[18px] text-[#D6A948] font-semibold">
            İçiniz Rahat Olsun, Artık Sigorta Alanında da Sizlere Hizmet
            Sunuyoruz
          </p>
          <p className="mt-2 text-[15px] text-white/90 max-w-[620px]">
            Kasko, Trafik, DASK (DSK) ve Sağlık Sigortalarınızı tek bir
            adresten, uygun fiyatlı sigorta teklifi ve iyi fiyat avantajıyla
            alın.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#sigorta-talep"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-semibold text-[15px]"
            >
              <span>Sigorta Talebi Oluştur</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/905330598804?text=${encodeURIComponent(
                "Merhaba Gapşan Sigorta, uygun fiyatlı sigorta teklifi almak istiyorum."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] bg-white text-[#111F35] hover:bg-[#F7F5EF] font-semibold text-[15px]"
            >
              <MessageCircle className="w-4 h-4 text-[#D6A948]" />
              <span>WhatsApp Teklif Hattı: 0533 059 88 04</span>
            </a>
            <a
              href={CONTACT_CONFIG.units.sigorta.phoneTel}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] border border-white/30 hover:bg-white/10 text-white font-semibold text-[15px]"
            >
              <Phone className="w-4 h-4 text-[#D6A948]" />
              <span>{CONTACT_CONFIG.units.sigorta.phoneDisplay}</span>
            </a>
          </div>
        </div>
        <span className="absolute bottom-3 right-5 z-10 text-[12px] italic text-white/85 bg-[#111F35]/60 px-2.5 py-0.5 rounded">
          Konsept görsel
        </span>
      </section>

      {/* Sigorta Tanıtım & Kapsam */}
      <section className="gapsan-container pt-10 pb-4 space-y-8">
        <div className="bg-[#111F35] text-white rounded-[10px] p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-white/15 pb-5">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded bg-[#D6A948] text-[#111F35] text-[12px] font-extrabold uppercase tracking-wide">
                GAPSAN SİGORTA GÜVENCESİ
              </span>
              <h2 className="font-heading font-bold text-[24px] md:text-[30px] text-white">
                GAPSAN SİGORTA’da Fiyatlar Hep İyi!
              </h2>
              <p className="text-[17px] text-[#D6A948] font-semibold">
                İçiniz rahat olsun, artık sigorta alanında da sizlere hizmet sunacağız.
              </p>
            </div>
            <div className="shrink-0 p-3 rounded-[8px] bg-white/5 border border-white/10 text-right">
              <p className="text-[11px] text-white/70 uppercase tracking-wider">Yetkili / Şirket Müdürü</p>
              <p className="text-[15px] font-bold text-white">Harun ŞAN</p>
              <p className="text-[12px] text-[#D6A948]">GAPSAN Şirketler Grubu</p>
            </div>
          </div>

          <p className="text-[15px] md:text-[16px] text-white/90 leading-relaxed max-w-[900px]">
            Sigorta alanında hizmete başlayan <strong>GAPSAN SİGORTA</strong>, hayatınızı kolaylaştırmakla beraber sizi her alanda güvence altına alıyor. 
            Uygun Fiyatlı Sigorta Teklifi: <strong>Kasko, Trafik, DSK (DASK) ve Sağlık Sigortanızı</strong> tek bir adresten, iyi fiyat garantisiyle alın.
          </p>

          <div className="flex flex-wrap gap-4 text-[14px] text-[#D6A948] font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Uygun Fiyatlı Sigorta Teklifi
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              7/24 Müşteri Hizmetleri Hizmetinizde
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Bize Sormadan Teklif Almayın!
            </span>
          </div>

          {/* Quick Contact & Direct Action Strip */}
          <div className="pt-4 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <a
              href={`https://wa.me/${CONTACT_CONFIG.units.sigorta.whatsappNumber}?text=${encodeURIComponent(
                "Merhaba Gapşan Sigorta, sigorta teklifi almak istiyorum."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-[10px] bg-white/10 hover:bg-white/15 border border-white/15 transition-colors flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-white/70 font-medium">WhatsApp Hattımız</p>
                <p className="text-[14px] font-bold text-white">{CONTACT_CONFIG.units.sigorta.phoneDisplay}</p>
              </div>
            </a>

            <a
              href={CONTACT_CONFIG.generalPhoneTel}
              className="p-3.5 rounded-[10px] bg-white/10 hover:bg-white/15 border border-white/15 transition-colors flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-[#D6A948] text-[#111F35] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-white/70 font-medium">Müşteri Hizmetleri (7/24)</p>
                <p className="text-[14px] font-bold text-white">{CONTACT_CONFIG.generalPhoneDisplay}</p>
              </div>
            </a>

            <a
              href={`mailto:${CONTACT_CONFIG.insuranceEmail}`}
              className="p-3.5 rounded-[10px] bg-white/10 hover:bg-white/15 border border-white/15 transition-colors flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 text-[#D6A948] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] text-white/70 font-medium">E-Posta</p>
                <p className="text-[14px] font-bold text-white truncate">{CONTACT_CONFIG.insuranceEmail}</p>
              </div>
            </a>

            <a
              href={CONTACT_CONFIG.officialWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-[10px] bg-white/10 hover:bg-white/15 border border-white/15 transition-colors flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 text-[#D6A948] flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] text-white/70 font-medium">İnternet Siteniz</p>
                <p className="text-[14px] font-bold text-white truncate">gapsanticaret.com.tr</p>
              </div>
            </a>
          </div>

          <div className="text-right text-[13px] text-white/75 italic">
            Saygılarımızla, <strong className="text-white">Harun ŞAN</strong> &bull; {CONTACT_CONFIG.companyLegalName}
          </div>
        </div>

        <div>
          <h2 className="gapsan-h2 text-[#111F35] mb-6">
            Sigorta Hizmet Kapsamımız
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Trafik Sigortası",
                desc: "Zorunlu trafik sigortası teklif süreciniz için 27 anlaşmalı sigorta şirketinden hızlı karşılaştırma.",
              },
              {
                title: "Kasko",
                desc: "Aracınıza uygun geniş kapsamlı kasko seçenekleri için en iyi fiyat teklifini alın.",
              },
              {
                title: "DASK (DSK)",
                desc: "Zorunlu deprem ve konut sigortası poliçelerinizi tek adresten hızlıca oluşturun.",
              },
              {
                title: "Sağlık Sigortası",
                desc: "Tamamlayıcı, bireysel veya aile sağlık sigortası teklif sürecinizi güvenle başlatın.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-[#E0E4EA] rounded-[10px] p-5 space-y-2"
              >
                <ShieldCheck
                  className="w-6 h-6 text-[#D6A948]"
                  aria-hidden="true"
                />
                <h3 className="font-heading font-bold text-[19px] text-[#111F35]">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#536174] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Faaliyet Gösterdiğimiz Sigorta Şirketlerimiz */}
        <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 md:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#111F35] bg-[#F7F5EF] px-2.5 py-1 rounded border border-[#D6A948]">
                <Building2 className="w-3.5 h-3.5 text-[#D6A948]" />
                {INSURANCE_PARTNERS.length} Anlaşmalı Sigorta Şirketi
              </span>
              <h2 className="mt-2 font-heading font-bold text-[24px] text-[#111F35]">
                Faaliyet Gösterdiğimiz Sigorta Şirketlerimiz
              </h2>
            </div>
            <a
              href="/assets/gapsan/belgeler/gapsan-kurumsal-afis.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold text-[#111F35] underline hover:text-[#D6A948]"
            >
              Kurumsal Tanıtım ve Sigorta Tablosunu Gör
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {INSURANCE_PARTNERS.map((company) => (
              <div
                key={company}
                className="min-h-[46px] px-3 py-2 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] flex items-center justify-center text-center text-[13px] font-bold text-[#111F35]"
              >
                {company}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-5 flex flex-wrap items-center justify-between gap-4 text-[14px] text-[#536174]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>
              Sigorta E-Posta:{" "}
              <a
                href={`mailto:${CONTACT_CONFIG.insuranceEmail}`}
                className="font-semibold text-[#111F35] hover:underline inline-flex items-center gap-1"
              >
                <Mail className="w-4 h-4 text-[#D6A948]" />
                {CONTACT_CONFIG.insuranceEmail}
              </a>
            </span>
            <span>
              WhatsApp &amp; Telefon:{" "}
              <a
                href={CONTACT_CONFIG.units.sigorta.phoneTel}
                className="font-semibold text-[#111F35] hover:underline"
              >
                {CONTACT_CONFIG.units.sigorta.phoneDisplay}
              </a>
            </span>
            <span>
              Müşteri Hizmetleri:{" "}
              <a
                href={CONTACT_CONFIG.generalPhoneTel}
                className="font-semibold text-[#111F35] hover:underline"
              >
                {CONTACT_CONFIG.generalPhoneDisplay}
              </a>
            </span>
          </div>
          <a
            href={CONTACT_CONFIG.officialWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-semibold text-[#111F35] hover:text-[#D6A948] inline-flex items-center gap-1"
          >
            <Globe className="w-4 h-4 text-[#D6A948]" />
            <span>gapsanticaret.com.tr</span>
          </a>
        </div>
      </section>

      {/* Embedded RequestBuilder locked to Sigorta */}
      <Suspense
        fallback={
          <div className="gapsan-container py-10">
            <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-8 h-[240px]" />
          </div>
        }
      >
        <RequestBuilder
          initialArea="sigorta"
          lockedArea="sigorta"
          sectionId="sigorta-talep"
        />
      </Suspense>
    </div>
  );
}
