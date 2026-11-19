"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";

export default function CerezPolitikasiPage() {
  const { cookiePreferences, setCookieModalOpen } = useGapsanStore();

  return (
    <div className="gapsan-container py-10 max-w-3xl">
      <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 md:p-8 space-y-5">
        <h1 className="gapsan-h1 text-[#111F35]">Çerez Politikası</h1>
        <p className="text-[15px] text-[#536174] leading-relaxed">
          Sitemizde yalnızca temel işlevler için gerekli zorunlu çerezler
          varsayılan olarak aktiftir. Analitik ve reklam çerezleri açık
          tercihiniz ve onayınız olmadan çalıştırılmaz.
        </p>

        <div className="p-4 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] space-y-2 text-[14px]">
          <p className="font-semibold text-[#111F35]">Mevcut Tercihiniz:</p>
          <ul className="space-y-1 text-[#536174]">
            <li>Zorunlu Çerezler: Her zaman açık</li>
            <li>
              Analitik Çerezler:{" "}
              <strong>{cookiePreferences.analytics ? "Açık" : "Kapalı"}</strong>
            </li>
            <li>
              Reklam Çerezleri:{" "}
              <strong>
                {cookiePreferences.advertising ? "Açık" : "Kapalı"}
              </strong>
            </li>
          </ul>
        </div>

        <button
          type="button"
          onClick={() => setCookieModalOpen(true)}
          className="min-h-[44px] px-5 inline-flex items-center gap-2 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-semibold text-[15px] cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Çerez Tercihlerini Yönet</span>
        </button>
      </div>
    </div>
  );
}
