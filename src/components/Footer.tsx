"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Lock } from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "./SocialIcons";

export default function Footer() {
  const { contact, setCookieModalOpen } = useGapsanStore();

  return (
    <footer className="bg-white border-t border-[#E0E4EA]">
      <div className="gapsan-container py-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center shrink-0"
              aria-label="GAPSAN Ana Sayfa"
            >
              <img
                src="/assets/gapsan/gapsan-logo-yatay.webp"
                alt="GAPSAN"
                width={160}
                height={36}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <span className="hidden sm:inline text-[#E0E4EA]" aria-hidden="true">
              |
            </span>
            <p className="text-[13px] font-semibold text-[#111F35]">
              2010’dan Bu Yana Güvenle &bull; Yetki Belge No: 340 6225 / 341 0913
            </p>
          </div>

          <nav
            aria-label="Alt menü"
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] font-medium text-[#182538]"
          >
            <Link href="/otomotiv" className="hover:text-[#111F35] py-1">
              Otomotiv
            </Link>
            <span className="text-[#E0E4EA] hidden sm:inline" aria-hidden="true">
              |
            </span>
            <Link href="/insaat" className="hover:text-[#111F35] py-1">
              İnşaat
            </Link>
            <span className="text-[#E0E4EA] hidden sm:inline" aria-hidden="true">
              |
            </span>
            <Link href="/sigorta" className="hover:text-[#111F35] py-1">
              Sigorta
            </Link>
            <span className="text-[#E0E4EA] hidden sm:inline" aria-hidden="true">
              |
            </span>
            <Link href="/kurumsal" className="hover:text-[#111F35] py-1">
              Kurumsal
            </Link>
            <span className="text-[#E0E4EA] hidden sm:inline" aria-hidden="true">
              |
            </span>
            <Link href="/kurumsal/galeri" className="hover:text-[#111F35] py-1">
              Belgelerimiz
            </Link>
            <span className="text-[#E0E4EA] hidden sm:inline" aria-hidden="true">
              |
            </span>
            <Link href="/iletisim" className="hover:text-[#111F35] py-1">
              İletişim
            </Link>
          </nav>
        </div>

        {/* Social Media & WhatsApp Channel Bar */}
        <div className="mt-6 pt-5 border-t border-[#E0E4EA] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-[#111F35] uppercase">
                Otomotiv:
              </span>
              <a
                href={contact.socialMedia.instagramOtomotiv}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Gapsan Otomotiv Instagram"
                title="Gapsan Otomotiv Instagram"
                className="w-8 h-8 rounded-full bg-[#F7F5EF] border border-[#E0E4EA] flex items-center justify-center text-[#111F35] hover:bg-[#D6A948] transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={contact.socialMedia.tiktokOtomotiv}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Gapsan Otomotiv TikTok"
                title="Gapsan Otomotiv TikTok"
                className="w-8 h-8 rounded-full bg-[#F7F5EF] border border-[#E0E4EA] flex items-center justify-center text-[#111F35] hover:bg-[#D6A948] transition-colors"
              >
                <TikTokIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-[#111F35] uppercase">
                İnşaat:
              </span>
              <a
                href={contact.socialMedia.instagramGayrimenkul}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Gapsan Gayrimenkul Instagram"
                title="Gapsan Gayrimenkul Instagram"
                className="w-8 h-8 rounded-full bg-[#F7F5EF] border border-[#E0E4EA] flex items-center justify-center text-[#111F35] hover:bg-[#D6A948] transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={contact.socialMedia.tiktokGayrimenkul}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Gapsan Gayrimenkul TikTok"
                title="Gapsan Gayrimenkul TikTok"
                className="w-8 h-8 rounded-full bg-[#F7F5EF] border border-[#E0E4EA] flex items-center justify-center text-[#111F35] hover:bg-[#D6A948] transition-colors"
              >
                <TikTokIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-[#111F35] uppercase">
                Facebook:
              </span>
              <a
                href={contact.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Gapsan Facebook"
                title="Gapsan Facebook Sayfamız"
                className="w-8 h-8 rounded-full bg-[#F7F5EF] border border-[#E0E4EA] flex items-center justify-center text-[#111F35] hover:bg-[#D6A948] transition-colors"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <a
            href={contact.socialMedia.whatsappChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] bg-[#111F35] hover:bg-[#1b2e4b] text-white text-[12px] font-semibold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Gapsan Otomotiv WhatsApp Kanalını Takip Edin</span>
          </a>
        </div>

        <div className="mt-5 pt-4 border-t border-[#E0E4EA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13px] text-[#536174]">
          <div className="space-y-1">
            <p>
              {contact.companyLegalName} &bull; MERSİS: {contact.mersisNo} &bull;{" "}
              {contact.address}
            </p>
            <p className="text-[12px] text-[#536174]">
              Müşteri Hizmetleri: <a href="tel:+902125966000" className="font-semibold text-[#111F35] hover:underline">0 212 596 60 00</a> &bull; 
              E-Posta: <a href="mailto:gapsan@outlook.com.tr" className="font-semibold text-[#111F35] hover:underline">gapsan@outlook.com.tr</a> &bull; 
              Yetkili: <strong className="text-[#111F35]">Harun ŞAN</strong>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/yasal-bilgilendirme"
              className="hover:text-[#111F35] underline-offset-4 hover:underline"
            >
              Yasal Bilgilendirme
            </Link>
            <Link
              href="/kvkk-aydinlatma"
              className="hover:text-[#111F35] underline-offset-4 hover:underline"
            >
              KVKK Aydınlatma
            </Link>
            <Link
              href="/cerez-politikasi"
              className="hover:text-[#111F35] underline-offset-4 hover:underline"
            >
              Çerez Politikası
            </Link>
            <button
              type="button"
              onClick={() => setCookieModalOpen(true)}
              className="text-[#111F35] font-medium hover:underline underline-offset-4 cursor-pointer"
            >
              Çerez Tercihleri
            </button>
            <Link
              href="/yonetim"
              className="text-[#536174] hover:text-[#111F35] underline-offset-4 hover:underline text-[12px] flex items-center gap-1"
              title="GAPSAN Yönetim Paneli"
            >
              <Lock className="w-3 h-3" />
              <span>Yönetim</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
