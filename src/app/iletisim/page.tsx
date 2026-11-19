import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  ShieldCheck,
  Award,
  MessageCircle,
} from "lucide-react";
import { CONTACT_CONFIG } from "@/lib/gapsan-data";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "@/components/SocialIcons";

export const metadata: Metadata = {
  title: "İletişim & Sosyal Medya",
  description:
    "GAPSAN Şirketler Grubu Esenyurt/İstanbul adresi, birim telefon hatları, WhatsApp iletişim ve resmi sosyal medya hesapları (Instagram, Facebook, TikTok).",
  alternates: { canonical: "/iletisim" },
  openGraph: {
    images: ["/assets/gapsan/gapsan-og-genel.webp"],
  },
};

export default function IletisimPage() {
  return (
    <div className="gapsan-container py-10 space-y-8">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded bg-[#111F35] text-[#D6A948] text-[12px] font-bold">
            2010 Yılından Bu Yana Güvenle...
          </span>
          <span className="px-3 py-1 rounded bg-[#F7F5EF] border border-[#E0E4EA] text-[#111F35] text-[12px] font-semibold">
            Yetki Belge No: 340 6225 / 341 0913
          </span>
        </div>
        <h1 className="gapsan-h1 text-[#111F35]">İletişim</h1>
        <p className="mt-2 text-[16px] text-[#536174]">
          {CONTACT_CONFIG.companyLegalName} &bull; MERSİS: {CONTACT_CONFIG.mersisNo}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-5">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#D6A948] mt-1 shrink-0" />
              <div>
                <h2 className="font-heading font-bold text-[19px] text-[#111F35]">
                  Adres
                </h2>
                <p className="mt-1 text-[15px] text-[#182538]">
                  {CONTACT_CONFIG.address}
                </p>
                <p className="text-[13px] text-[#536174] mt-1">
                  Pazar günleri 11:00 - 17:00 dahil hafta sonu nöbetçi noter
                  satışımız mevcuttur.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#D6A948] mt-1 shrink-0" />
              <div className="space-y-1">
                <h2 className="font-heading font-bold text-[19px] text-[#111F35]">
                  E-Posta ve Kurumsal Web
                </h2>
                <p className="text-[15px] text-[#536174]">
                  E-Posta:{" "}
                  <a
                    href={`mailto:${CONTACT_CONFIG.insuranceEmail}`}
                    className="font-bold text-[#111F35] hover:underline"
                  >
                    {CONTACT_CONFIG.insuranceEmail}
                  </a>
                </p>
                <p className="text-[15px] text-[#536174]">
                  Genel Bilgi:{" "}
                  <a
                    href={`mailto:${CONTACT_CONFIG.generalEmail}`}
                    className="font-semibold text-[#111F35] hover:underline"
                  >
                    {CONTACT_CONFIG.generalEmail}
                  </a>
                </p>
                <p className="text-[15px] text-[#536174]">
                  Web Sitesi:{" "}
                  <a
                    href={CONTACT_CONFIG.officialWebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#111F35] hover:underline"
                  >
                    {CONTACT_CONFIG.officialWebsiteUrl.replace("https://", "").replace("/", "")}
                  </a>
                </p>
                <p className="text-[13px] text-[#536174] pt-1">
                  Şirket Müdürü / Yetkilisi: <strong className="text-[#111F35]">{CONTACT_CONFIG.founderName}</strong>
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
                <span>Yol Tarifi Al</span>
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

          {/* Sosyal Medya ve WhatsApp Kanalı */}
          <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-4">
            <h2 className="font-heading font-bold text-[19px] text-[#111F35]">
              Sosyal Medya Hesaplarımız &amp; WhatsApp Kanalı
            </h2>
            <p className="text-[14px] text-[#536174]">
              Güncel araç portföyümüzü, gayrimenkul fırsatlarımızı ve
              duyurularımızı sosyal medya hesaplarımızdan takip edebilirsiniz:
            </p>

            <div className="space-y-3">
              {/* WhatsApp Kanalı */}
              <a
                href={CONTACT_CONFIG.socialMedia.whatsappChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-[10px] bg-[#111F35] text-white flex items-center justify-between gap-3 hover:bg-[#1b2e4b] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[14px]">
                      Gapsan Otomotiv Senetli Satış Merkezi
                    </p>
                    <p className="text-[12px] text-white/80">
                      WhatsApp Kanalımızı Takip Edin
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#D6A948]" />
              </a>

              {/* Sosyal Medya Kartları */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  href={CONTACT_CONFIG.socialMedia.instagramOtomotiv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] hover:border-[#D6A948] flex items-center gap-3 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#111F35] text-[#D6A948] flex items-center justify-center shrink-0">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-[13px] text-[#111F35]">
                      Gapsan Otomotiv
                    </p>
                    <p className="text-[11px] text-[#536174]">Instagram Hesabı</p>
                  </div>
                </a>

                <a
                  href={CONTACT_CONFIG.socialMedia.tiktokOtomotiv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] hover:border-[#D6A948] flex items-center gap-3 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#111F35] text-[#D6A948] flex items-center justify-center shrink-0">
                    <TikTokIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-[13px] text-[#111F35]">
                      Gapsan Otomotiv
                    </p>
                    <p className="text-[11px] text-[#536174]">TikTok Hesabı</p>
                  </div>
                </a>

                <a
                  href={CONTACT_CONFIG.socialMedia.instagramGayrimenkul}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] hover:border-[#D6A948] flex items-center gap-3 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#111F35] text-[#D6A948] flex items-center justify-center shrink-0">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-[13px] text-[#111F35]">
                      Gapsan Gayrimenkul
                    </p>
                    <p className="text-[11px] text-[#536174]">Instagram Hesabı</p>
                  </div>
                </a>

                <a
                  href={CONTACT_CONFIG.socialMedia.tiktokGayrimenkul}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] hover:border-[#D6A948] flex items-center gap-3 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#111F35] text-[#D6A948] flex items-center justify-center shrink-0">
                    <TikTokIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-[13px] text-[#111F35]">
                      Gapsan Gayrimenkul
                    </p>
                    <p className="text-[11px] text-[#536174]">TikTok Hesabı</p>
                  </div>
                </a>

                <a
                  href={CONTACT_CONFIG.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:col-span-2 p-3 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] hover:border-[#D6A948] flex items-center gap-3 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#111F35] text-[#D6A948] flex items-center justify-center shrink-0">
                    <FacebookIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-[13px] text-[#111F35]">
                      GAPSAN Şirketler Grubu
                    </p>
                    <p className="text-[11px] text-[#536174]">Resmi Facebook Sayfamız</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-4">
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
                  Otomotiv &amp; Kredi Hattı
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
                  Sigorta Birimi (7/24)
                </p>
                <p className="mt-1 font-heading font-bold text-[18px] text-[#111F35] flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D6A948]" />
                  {CONTACT_CONFIG.units.sigorta.phoneDisplay}
                </p>
              </a>
            </div>
          </div>

          <div className="bg-[#111F35] text-white rounded-[10px] p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#D6A948] text-[13px] font-bold">
              <Award className="w-4 h-4" />
              <span>Resmi Belgeli &amp; Kurumsal Güvence</span>
            </div>
            <h3 className="font-heading font-bold text-[20px]">
              Yetki Belgelerimiz ve Sertifikalarımız
            </h3>
            <p className="text-[14px] text-white/85 leading-relaxed">
              Otomotiv ve taşınmaz ticareti yetki belgelerimiz, MYK Seviye 5
              sorumlu danışmanlık belgelerimiz ve üniversite onaylı sertifikalarımızın
              orijinallerini online inceleyebilirsiniz.
            </p>
            <div className="pt-2">
              <Link
                href="/kurumsal/galeri"
                className="min-h-[44px] px-5 inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#D6A948] text-[#111F35] font-semibold text-[14px]"
              >
                <span>Resmi Belgeleri İncele</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
