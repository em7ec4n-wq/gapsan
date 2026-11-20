"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  CheckCircle2,
  FileCheck2,
} from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";

export default function RealEstateDetailClient({ slug }: { slug: string }) {
  const { hydrated, realEstates, contact } = useGapsanStore();
  const [activePhoto, setActivePhoto] = useState(0);

  const decodedSlug = decodeURIComponent(slug);
  const listing = realEstates.find(
    (r) => r.slug === decodedSlug || r.id === decodedSlug
  );

  if (!hydrated && !listing) {
    return (
      <div className="gapsan-container py-20 text-center max-w-xl mx-auto">
        <div className="w-10 h-10 border-4 border-[#111F35] border-t-[#D6A948] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[15px] font-semibold text-[#111F35]">
          İlan detayları yükleniyor...
        </p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="gapsan-container py-16 text-center max-w-xl mx-auto">
        <Building2 className="w-12 h-12 text-[#D6A948] mx-auto mb-4" />
        <h1 className="font-heading font-bold text-[26px] text-[#111F35]">
          İlan Yayında Değil veya Bulunamadı
        </h1>
        <p className="mt-2 text-[#536174]">
          Aradığınız taşınmaz ilanı yayından kaldırılmış ya da henüz onay
          bekliyor olabilir.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/insaat"
            className="min-h-[44px] px-5 inline-flex items-center justify-center rounded-[10px] bg-[#111F35] text-white font-semibold text-[14px]"
          >
            İnşaat &amp; Gayrimenkul Sayfasına Dön
          </Link>
        </div>
      </div>
    );
  }

  const photos =
    listing.images && listing.images.length > 0
      ? listing.images
      : ["/assets/gapsan/gapsan-gayrimenkul-konsept.webp"];

  const safePhotoIndex = activePhoto < photos.length ? activePhoto : 0;

  const prevPhoto = () => {
    setActivePhoto((prev) => (prev <= 0 ? photos.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setActivePhoto((prev) => (prev >= photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="gapsan-container py-8 md:py-10 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={
            listing.listingType === "Satılık"
              ? "/gayrimenkul/satilik"
              : "/gayrimenkul/kiralik"
          }
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#536174] hover:text-[#111F35]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{listing.listingType} İlanlarına Dön</span>
        </Link>

        {listing.status !== "Yayında" && (
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[12px] font-bold">
            İlan Durumu: {listing.status} (Önizleme)
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#111F35] rounded-[12px] overflow-hidden border border-[#E0E4EA] shadow-xs">
            <div className="relative aspect-[16/11] flex items-center justify-center bg-[#0c1627]">
              <img
                src={photos[safePhotoIndex] ?? photos[0]}
                alt={`${listing.title} - Fotoğraf ${safePhotoIndex + 1}`}
                className="w-full h-full object-contain"
              />

              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevPhoto}
                    aria-label="Önceki fotoğraf"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextPhoto}
                    aria-label="Sonraki fotoğraf"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/70 text-white text-[12px] font-semibold">
                    {safePhotoIndex + 1} / {photos.length}
                  </span>
                </>
              )}
            </div>

            {photos.length > 1 && (
              <div className="p-3 bg-white border-t border-[#E0E4EA] flex gap-2.5 overflow-x-auto">
                {photos.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActivePhoto(i)}
                    className={`w-20 h-15 rounded-[6px] overflow-hidden border-2 shrink-0 cursor-pointer transition-all ${
                      i === safePhotoIndex
                        ? "border-[#D6A948] scale-105"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${listing.title} küçük görsel ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* İlan Açıklaması */}
          <div className="bg-white border border-[#E0E4EA] rounded-[12px] p-6 space-y-4">
            <h2 className="font-heading font-bold text-[19px] text-[#111F35] flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-[#D6A948]" />
              <span>Taşınmaz Açıklaması ve Detaylar</span>
            </h2>
            <p className="text-[15px] text-[#182538] leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>

            {listing.features && listing.features.length > 0 && (
              <div className="pt-4 border-t border-[#E0E4EA]">
                <h3 className="text-[13px] font-bold text-[#111F35] uppercase tracking-wide mb-2.5">
                  Taşınmaz Özellikleri
                </h3>
                <div className="flex flex-wrap gap-2">
                  {listing.features.map((feat) => (
                    <span
                      key={feat}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F5EF] border border-[#E0E4EA] text-[13px] font-semibold text-[#111F35]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A948]" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-[#E0E4EA] rounded-[12px] p-6 space-y-5 lg:sticky lg:top-24 shadow-xs">
          <div>
            <span className="inline-block mb-2 px-2.5 py-0.5 rounded bg-[#F7F5EF] border border-[#E0E4EA] text-[12px] font-semibold text-[#111F35]">
              {listing.listingType} &bull; {listing.propertyType}
            </span>
            <h1 className="font-heading font-extrabold text-[24px] md:text-[26px] leading-tight text-[#111F35]">
              {listing.title}
            </h1>
            {listing.price && (
              <p className="mt-2 font-heading font-extrabold text-[26px] text-[#111F35]">
                {listing.price}
              </p>
            )}
          </div>

          <dl className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E0E4EA] text-[14px]">
            <div className="p-2.5 rounded bg-[#F7F5EF]/70">
              <dt className="text-[12px] text-[#536174]">İlçe / Bölge</dt>
              <dd className="font-bold text-[#111F35]">{listing.district}</dd>
            </div>
            <div className="p-2.5 rounded bg-[#F7F5EF]/70">
              <dt className="text-[12px] text-[#536174]">Metrekare</dt>
              <dd className="font-bold text-[#111F35]">
                {listing.areaM2 ? `${listing.areaM2} m²` : "—"}
              </dd>
            </div>
            <div className="p-2.5 rounded bg-[#F7F5EF]/70">
              <dt className="text-[12px] text-[#536174]">Oda / Bölüm</dt>
              <dd className="font-bold text-[#111F35]">{listing.rooms || "—"}</dd>
            </div>
            <div className="p-2.5 rounded bg-[#F7F5EF]/70">
              <dt className="text-[12px] text-[#536174]">Bulunduğu Kat</dt>
              <dd className="font-bold text-[#111F35]">{listing.floor || "Belirtilmedi"}</dd>
            </div>
            <div className="p-2.5 rounded bg-[#F7F5EF]/70">
              <dt className="text-[12px] text-[#536174]">Bina Yaşı</dt>
              <dd className="font-bold text-[#111F35]">{listing.buildingAge || "Belirtilmedi"}</dd>
            </div>
            <div className="p-2.5 rounded bg-[#F7F5EF]/70">
              <dt className="text-[12px] text-[#536174]">Isıtma / Tapu</dt>
              <dd className="font-bold text-[#111F35]">
                {[listing.heating, listing.deedStatus].filter(Boolean).join(" • ") || "Kombi / Kat Mülkiyeti"}
              </dd>
            </div>
          </dl>

          <div className="pt-2 space-y-2.5">
            <a
              href={`https://wa.me/${contact.units.gayrimenkul.whatsappNumber}?text=${encodeURIComponent(
                `Merhaba GAPSAN İnşaat & Gayrimenkul, "${listing.title}" (${listing.price || "Fiyat Sorunuz"}) ilanı hakkında bilgi almak istiyorum.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-5 rounded-[10px] bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-[15px] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp ile Hemen Sor</span>
            </a>

            <Link
              href={`/?alan=gayrimenkul&ilan=${listing.slug}#talep`}
              className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-5 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-bold text-[15px] transition-colors"
            >
              <span>Bu İlanla Talep Oluştur</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <a
              href={contact.units.gayrimenkul.phoneTel}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 rounded-[10px] border border-[#E0E4EA] hover:bg-[#F7F5EF] text-[#111F35] font-semibold text-[14px] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#D6A948]" />
              <span>
                İnşaat &amp; Gayrimenkul Hattını Ara ({contact.units.gayrimenkul.phoneDisplay})
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
