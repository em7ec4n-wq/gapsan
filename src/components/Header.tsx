"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";

const NAV_LINKS = [
  { href: "/otomotiv", label: "Otomotiv" },
  { href: "/insaat", label: "İnşaat" },
  { href: "/sigorta", label: "Sigorta" },
  { href: "/kurumsal", label: "Kurumsal" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { contact } = useGapsanStore();

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [drawerOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E0E4EA]">
      <div className="gapsan-container h-[76px] max-[768px]:h-[64px] flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center shrink-0 focus-visible:outline-[#D6A948]"
          aria-label="GAPSAN Ana Sayfa"
        >
          <img
            src="/assets/gapsan/gapsan-logo-yatay.webp"
            alt="GAPSAN"
            width={176}
            height={40}
            className="h-9 max-[768px]:h-7 w-auto object-contain"
          />
        </Link>

        <nav
          aria-label="Ana menü"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_LINKS.map((item) => {
            const active =
              pathname === item.href ||
              (item.href === "/insaat" && (pathname === "/gayrimenkul" || pathname.startsWith("/gayrimenkul/"))) ||
              (item.href !== "/" && pathname.startsWith(item.href + "/"));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] font-medium transition-colors py-2 ${
                  active
                    ? "text-[#111F35] font-semibold underline decoration-[#D6A948] decoration-2 underline-offset-8"
                    : "text-[#182538] hover:text-[#111F35]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/#talep"
            className="inline-flex items-center justify-center min-h-[44px] px-5 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-semibold text-[15px] transition-colors"
          >
            Talep Oluştur
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Menüyü aç"
          aria-expanded={drawerOpen}
          className="md:hidden inline-flex items-center gap-2 min-h-[44px] px-3 rounded-[10px] text-[#111F35] font-semibold text-[15px] hover:bg-[#F7F5EF]"
        >
          <Menu className="w-5 h-5" aria-hidden="true" />
          <span>Menü</span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden flex justify-end bg-[#111F35]/50 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label="Mobil navigasyon menüsü"
        >
          <div
            className="fixed inset-0"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-[85%] max-w-[340px] bg-white h-full shadow-2xl flex flex-col justify-between p-5 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E0E4EA]">
                <Link
                  href="/"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="GAPSAN Ana Sayfa"
                >
                  <img
                    src="/assets/gapsan/gapsan-logo-yatay.webp"
                    alt="GAPSAN"
                    width={150}
                    height={34}
                    className="h-7 w-auto object-contain"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Menüyü kapat"
                  className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-[10px] text-[#182538] hover:bg-[#F7F5EF]"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <nav className="mt-4 flex flex-col gap-1" aria-label="Mobil menü">
                {NAV_LINKS.map((item) => {
                  const active =
                    pathname === item.href ||
                    (item.href === "/insaat" && (pathname === "/gayrimenkul" || pathname.startsWith("/gayrimenkul/")));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`min-h-[44px] flex items-center px-3 rounded-[10px] text-[16px] font-medium ${
                        active
                          ? "bg-[#F7F5EF] text-[#111F35] font-semibold"
                          : "text-[#182538] hover:bg-[#F7F5EF]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-5">
                <Link
                  href="/#talep"
                  onClick={() => setDrawerOpen(false)}
                  className="w-full inline-flex items-center justify-center min-h-[44px] px-5 rounded-[10px] bg-[#D6A948] text-[#111F35] font-semibold text-[15px]"
                >
                  Talep Oluştur
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E0E4EA] space-y-3 text-[14px] text-[#536174]">
              <p className="font-semibold text-[#111F35]">Hızlı İletişim</p>
              <a
                href={contact.generalPhoneTel}
                className="flex items-center gap-2 min-h-[44px] text-[#182538] font-medium"
              >
                <Phone className="w-4 h-4 text-[#D6A948]" aria-hidden="true" />
                Genel: {contact.generalPhoneDisplay}
              </a>
              <div className="pt-2 space-y-2">
                <p className="text-[12px] font-semibold text-[#111F35]">Sosyal Medya &amp; Kanal:</p>
                <div className="flex flex-wrap items-center gap-1.5">
                  <a
                    href={contact.socialMedia.instagramOtomotiv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-[8px] bg-[#F7F5EF] border border-[#E0E4EA] text-[11px] font-semibold text-[#111F35] hover:bg-[#D6A948]"
                  >
                    Oto Instagram
                  </a>
                  <a
                    href={contact.socialMedia.tiktokOtomotiv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-[8px] bg-[#F7F5EF] border border-[#E0E4EA] text-[11px] font-semibold text-[#111F35] hover:bg-[#D6A948]"
                  >
                    Oto TikTok
                  </a>
                  <a
                    href={contact.socialMedia.instagramGayrimenkul}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-[8px] bg-[#F7F5EF] border border-[#E0E4EA] text-[11px] font-semibold text-[#111F35] hover:bg-[#D6A948]"
                  >
                    Emlak Instagram
                  </a>
                  <a
                    href={contact.socialMedia.tiktokGayrimenkul}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-[8px] bg-[#F7F5EF] border border-[#E0E4EA] text-[11px] font-semibold text-[#111F35] hover:bg-[#D6A948]"
                  >
                    Emlak TikTok
                  </a>
                  <a
                    href={contact.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-[8px] bg-[#F7F5EF] border border-[#E0E4EA] text-[11px] font-semibold text-[#111F35] hover:bg-[#D6A948]"
                  >
                    Facebook
                  </a>
                </div>
                <a
                  href={contact.socialMedia.whatsappChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-[8px] bg-[#111F35] text-white text-[12px] font-semibold hover:bg-[#1b2e4b]"
                >
                  <span>WhatsApp Kanalını Takip Edin</span>
                </a>
              </div>
              <p className="text-[12px] leading-relaxed pt-1">
                {contact.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
