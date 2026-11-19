"use client";

import React from "react";
import Link from "next/link";
import { useGapsanStore } from "@/lib/gapsan-store";

export default function Footer() {
  const { contact, setCookieModalOpen } = useGapsanStore();

  return (
    <footer className="bg-white border-t border-[#E0E4EA]">
      <div className="gapsan-container py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <Link href="/" className="inline-flex items-center shrink-0" aria-label="GAPSAN Ana Sayfa">
            <img
              src="/assets/gapsan/gapsan-logo-yatay.webp"
              alt="GAPSAN"
              width={160}
              height={36}
              className="h-8 w-auto object-contain"
            />
          </Link>

          <nav
            aria-label="Alt menü"
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] font-medium text-[#182538]"
          >
            <Link href="/otomotiv" className="hover:text-[#111F35] py-1">
              Otomotiv
            </Link>
            <span className="text-[#E0E4EA] hidden sm:inline" aria-hidden="true">|</span>
            <Link href="/gayrimenkul" className="hover:text-[#111F35] py-1">
              Gayrimenkul
            </Link>
            <span className="text-[#E0E4EA] hidden sm:inline" aria-hidden="true">|</span>
            <Link href="/sigorta" className="hover:text-[#111F35] py-1">
              Sigorta
            </Link>
            <span className="text-[#E0E4EA] hidden sm:inline" aria-hidden="true">|</span>
            <Link href="/kurumsal" className="hover:text-[#111F35] py-1">
              Kurumsal
            </Link>
            <span className="text-[#E0E4EA] hidden sm:inline" aria-hidden="true">|</span>
            <Link href="/iletisim" className="hover:text-[#111F35] py-1">
              İletişim
            </Link>
          </nav>
        </div>

        <div className="mt-6 pt-5 border-t border-[#E0E4EA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13px] text-[#536174]">
          <p>{contact.companyLegalName} &bull; {contact.address}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/yasal-bilgilendirme" className="hover:text-[#111F35] underline-offset-4 hover:underline">
              Yasal Bilgilendirme
            </Link>
            <Link href="/kvkk-aydinlatma" className="hover:text-[#111F35] underline-offset-4 hover:underline">
              KVKK Aydınlatma
            </Link>
            <Link href="/cerez-politikasi" className="hover:text-[#111F35] underline-offset-4 hover:underline">
              Çerez Politikası
            </Link>
            <button
              type="button"
              onClick={() => setCookieModalOpen(true)}
              className="text-[#111F35] font-medium hover:underline underline-offset-4 cursor-pointer"
            >
              Çerez Tercihleri
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
