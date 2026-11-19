"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, ShieldCheck } from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";

export default function CookieConsentModal() {
  const {
    cookiePreferences,
    cookieModalOpen,
    setCookieModalOpen,
    saveCookiePreferences,
  } = useGapsanStore();

  const [analytics, setAnalytics] = useState(cookiePreferences.analytics);
  const [advertising, setAdvertising] = useState(cookiePreferences.advertising);

  useEffect(() => {
    setAnalytics(cookiePreferences.analytics);
    setAdvertising(cookiePreferences.advertising);
  }, [cookiePreferences]);

  if (!cookieModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111F35]/60 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
    >
      <div className="bg-white border border-[#E0E4EA] rounded-[10px] max-w-lg w-full p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#D6A948]" aria-hidden="true" />
            <h2
              id="cookie-modal-title"
              className="font-heading font-bold text-[20px] text-[#111F35]"
            >
              Çerez Tercihleri
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setCookieModalOpen(false)}
            aria-label="Kapat"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-[10px] text-[#536174] hover:bg-[#F7F5EF]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-2 text-[14px] text-[#536174] leading-relaxed">
          Zorunlu çerezler sitenin temel işlevleri için gereklidir. Analitik ve
          reklam çerezleri açık onayınız olmadan çalıştırılmaz. Ayrıntılar için{" "}
          <Link
            href="/cerez-politikasi"
            onClick={() => setCookieModalOpen(false)}
            className="text-[#111F35] underline font-medium"
          >
            Çerez Politikası
          </Link>{" "}
          sayfamızı inceleyebilirsiniz.
        </p>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA]">
            <div>
              <p className="text-[14px] font-semibold text-[#111F35]">
                Zorunlu Çerezler
              </p>
              <p className="text-[12px] text-[#536174]">
                Oturum ve güvenlik için her zaman etkindir.
              </p>
            </div>
            <span className="text-[12px] font-semibold text-[#111F35] bg-white px-2.5 py-1 rounded border border-[#E0E4EA]">
              Her zaman açık
            </span>
          </div>

          <label className="flex items-center justify-between p-3 rounded-[10px] bg-white border border-[#E0E4EA] cursor-pointer">
            <div>
              <p className="text-[14px] font-semibold text-[#111F35]">
                Analitik Çerezler
              </p>
              <p className="text-[12px] text-[#536174]">
                Site kullanımını anonim olarak ölçmemize yardımcı olur.
              </p>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="w-5 h-5 accent-[#111F35]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-[10px] bg-white border border-[#E0E4EA] cursor-pointer">
            <div>
              <p className="text-[14px] font-semibold text-[#111F35]">
                Reklam ve Pazarlama Çerezleri
              </p>
              <p className="text-[12px] text-[#536174]">
                İlgi alanlarınıza yönelik duyurular için kullanılır.
              </p>
            </div>
            <input
              type="checkbox"
              checked={advertising}
              onChange={(e) => setAdvertising(e.target.checked)}
              className="w-5 h-5 accent-[#111F35]"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={() =>
              saveCookiePreferences({ analytics: false, advertising: false })
            }
            className="min-h-[44px] px-4 rounded-[10px] border border-[#E0E4EA] text-[#182538] font-medium text-[14px] hover:bg-[#F7F5EF] cursor-pointer"
          >
            Yalnızca Zorunlu
          </button>
          <button
            type="button"
            onClick={() =>
              saveCookiePreferences({ analytics, advertising })
            }
            className="min-h-[44px] px-5 rounded-[10px] bg-[#111F35] text-white font-semibold text-[14px] hover:bg-[#1b2e4b] cursor-pointer"
          >
            Tercihleri Kaydet
          </button>
          <button
            type="button"
            onClick={() =>
              saveCookiePreferences({ analytics: true, advertising: true })
            }
            className="min-h-[44px] px-5 rounded-[10px] bg-[#D6A948] text-[#111F35] font-semibold text-[14px] hover:bg-[#c59836] cursor-pointer"
          >
            Tümünü Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
