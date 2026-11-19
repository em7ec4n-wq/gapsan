import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import { CONTACT_CONFIG } from "@/lib/gapsan-data";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "GAPSAN Şirketler Grubu Esenyurt/İstanbul adresi, birim telefon hatları, e-posta adresleri ve yol tarifi.",
  alternates: { canonical: "/iletisim" },
  openGraph: {
    images: ["/assets/gapsan/gapsan-og-genel.webp"],
  },
};

export default function IletisimPage() {
  return (
    <div className="gapsan-container py-10 space-y-8">
      <div>
        <h1 className="gapsan-h1 text-[#111F35]">İletişim</h1>
        <p className="mt-2 text-[16px] text-[#536174]">
          {CONTACT_CONFIG.companyLegalName}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-5">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#D6A948] mt-1 shrink-0" />
            <div>
              <h2 className="font-heading font-bold text-[19px] text-[#111F35]">
                Adres
              </h2>
              <p className="mt-1 text-[15px] text-[#182538]">
                {CONTACT_CONFIG.address}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-[#D6A948] mt-1 shrink-0" />
            <div className="space-y-1">
              <h2 className="font-heading font-bold text-[19px] text-[#111F35]">
                E-Posta Adresleri
              </h2>
              <p className="text-[15px] text-[#536174]">
                Genel:{" "}
                <a
                  href={`mailto:${CONTACT_CONFIG.generalEmail}`}
                  className="font-semibold text-[#111F35] hover:underline"
                >
                  {CONTACT_CONFIG.generalEmail}
                </a>
              </p>
              <p className="text-[15px] text-[#536174]">
                Sigorta:{" "}
                <a
                  href={`mailto:${CONTACT_CONFIG.insuranceEmail}`}
                  className="font-semibold text-[#111F35] hover:underline"
                >
                  {CONTACT_CONFIG.insuranceEmail}
                </a>
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={CONTACT_CONFIG.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-semibold text-[15px]"
            >
              <MapPin className="w-4 h-4" />
              <span>Yol Tarifi</span>
            </a>
            <Link
              href="/#talep"
              className="min-h-[44px] px-5 inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#111F35] text-white font-semibold text-[15px]"
            >
              <span>Talep Oluştur</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-4">
          <h2 className="font-heading font-bold text-[20px] text-[#111F35]">
            Onaylanmış Birim Hatları
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={CONTACT_CONFIG.generalPhoneTel}
              className="p-4 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] hover:border-[#D6A948] transition-colors"
            >
              <p className="text-[12px] font-semibold text-[#536174]">
                Genel Arama
              </p>
              <p className="mt-1 font-heading font-bold text-[18px] text-[#111F35] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D6A948]" />
                {CONTACT_CONFIG.generalPhoneDisplay}
              </p>
            </a>

            <a
              href={CONTACT_CONFIG.units.otomotiv.phoneTel}
              className="p-4 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] hover:border-[#D6A948] transition-colors"
            >
              <p className="text-[12px] font-semibold text-[#536174]">
                Otomotiv Birimi
              </p>
              <p className="mt-1 font-heading font-bold text-[18px] text-[#111F35] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D6A948]" />
                {CONTACT_CONFIG.units.otomotiv.phoneDisplay}
              </p>
            </a>

            <a
              href={CONTACT_CONFIG.units.gayrimenkul.phoneTel}
              className="p-4 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] hover:border-[#D6A948] transition-colors"
            >
              <p className="text-[12px] font-semibold text-[#536174]">
                Gayrimenkul Birimi
              </p>
              <p className="mt-1 font-heading font-bold text-[18px] text-[#111F35] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D6A948]" />
                {CONTACT_CONFIG.units.gayrimenkul.phoneDisplay}
              </p>
            </a>

            <a
              href={CONTACT_CONFIG.units.sigorta.phoneTel}
              className="p-4 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] hover:border-[#D6A948] transition-colors"
            >
              <p className="text-[12px] font-semibold text-[#536174]">
                Sigorta Birimi (WhatsApp Onaylı)
              </p>
              <p className="mt-1 font-heading font-bold text-[18px] text-[#111F35] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D6A948]" />
                {CONTACT_CONFIG.units.sigorta.phoneDisplay}
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
