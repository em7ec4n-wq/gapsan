"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  Phone,
  Car,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  FileCheck2,
} from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";
import { VEHICLE_PARTS, ExpertiseStatus } from "@/lib/gapsan-data";

const STATUS_BADGE_STYLES: Record<ExpertiseStatus, string> = {
  Orijinal: "bg-emerald-50 text-emerald-800 border-emerald-200",
  "Lokal Boyalı": "bg-amber-50 text-amber-800 border-amber-200",
  Boyalı: "bg-orange-50 text-orange-800 border-orange-200",
  Değişen: "bg-red-50 text-red-800 border-red-200",
  İşlemli: "bg-purple-50 text-purple-800 border-purple-200",
};

const STATUS_DOT_STYLES: Record<ExpertiseStatus, string> = {
  Orijinal: "bg-emerald-500",
  "Lokal Boyalı": "bg-amber-500",
  Boyalı: "bg-orange-500",
  Değişen: "bg-red-600",
  İşlemli: "bg-purple-600",
};

export default function OtomotivDetailClient({ slug }: { slug: string }) {
  const { hydrated, vehicles, demoVehicle, previewMode, contact } =
    useGapsanStore();
  const [activePhoto, setActivePhoto] = useState(0);

  const decodedSlug = decodeURIComponent(slug);
  const isDemo = decodedSlug === demoVehicle.slug;
  const matchedVehicle = vehicles.find(
    (v) => v.slug === decodedSlug || v.id === decodedSlug
  );

  const listing = isDemo
    ? previewMode
      ? demoVehicle
      : null
    : matchedVehicle ?? null;

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
        <Car className="w-12 h-12 text-[#D6A948] mx-auto mb-4" />
        <h1 className="font-heading font-bold text-[26px] text-[#111F35]">
          İlan Yayında Değil veya Bulunamadı
        </h1>
        <p className="mt-2 text-[#536174]">
          Aradığınız araç ilanı yayından kaldırılmış ya da henüz yayın onayı
          almamış olabilir.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/otomotiv"
            className="min-h-[44px] px-5 inline-flex items-center justify-center rounded-[10px] bg-[#111F35] text-white font-semibold text-[14px]"
          >
            Otomotiv Sayfasına Dön
          </Link>
        </div>
      </div>
    );
  }

  const photos =
    listing.images && listing.images.length > 0
      ? listing.images
      : ["/assets/gapsan/gapsan-otomotiv-kart-konsept.webp"];

  const safePhotoIndex = activePhoto < photos.length ? activePhoto : 0;

  const prevPhoto = () => {
    setActivePhoto((prev) => (prev <= 0 ? photos.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setActivePhoto((prev) => (prev >= photos.length - 1 ? 0 : prev + 1));
  };

  const expertiseReport = listing.expertiseReport || {};
  const hasExpertiseReport = Object.keys(expertiseReport).length > 0;

  return (
    <div className="gapsan-container py-8 md:py-10 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/otomotiv#ilanlar"
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#536174] hover:text-[#111F35]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Otomotiv İlanlarına Dön</span>
        </Link>

        {listing.status !== "Yayında" && (
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[12px] font-bold">
            İlan Durumu: {listing.status} (Önizleme)
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Multi-Photo Gallery & Description & Expertise */}
        <div className="lg:col-span-7 space-y-6">
          {/* Photo Gallery */}
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

              {listing.isExample && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded bg-[#D6A948] text-[#111F35] text-[12px] font-bold">
                  Örnek İlan
                </span>
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
          <div className="bg-white border border-[#E0E4EA] rounded-[12px] p-6 space-y-3">
            <h2 className="font-heading font-bold text-[19px] text-[#111F35] flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-[#D6A948]" />
              <span>İlan Açıklaması ve Detaylar</span>
            </h2>
            <p className="text-[15px] text-[#182538] leading-relaxed whitespace-pre-line">
              {listing.description ||
                `${listing.title} aracımız GAPSAN Otomotiv güvencesiyle satışa sunulmuştur. Detaylı bilgi ve ekspertiz raporu için bizimle iletişime geçebilirsiniz.`}
            </p>

            {listing.features && listing.features.length > 0 && (
              <div className="pt-4 border-t border-[#E0E4EA]">
                <h3 className="text-[13px] font-bold text-[#111F35] uppercase tracking-wide mb-2.5">
                  Öne Çıkan Donanım &amp; Satış Özellikleri
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

          {/* Ekspertiz Raporu Bölümü */}
          <div className="bg-white border border-[#E0E4EA] rounded-[12px] p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E0E4EA] pb-4">
              <div>
                <h2 className="font-heading font-bold text-[20px] text-[#111F35] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#D6A948]" />
                  <span>Ekspertiz ve Hasar Raporu</span>
                </h2>
                <p className="text-[13px] text-[#536174] mt-0.5">
                  GAPSAN Otomotiv ekspertiz garantisi ve parça bazlı kontrol tablosu
                </p>
              </div>
              <span className="px-3 py-1 rounded bg-[#111F35] text-[#D6A948] text-[12px] font-bold">
                Yetki Belge No: 340 6225
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA]">
                <p className="text-[12px] text-[#536174] font-medium">
                  Genel Ekspertiz Durumu
                </p>
                <p className="text-[15px] font-bold text-[#111F35] mt-0.5">
                  {listing.damageInfo || "Onaylı Ekspertiz Kaydı"}
                </p>
              </div>
              <div className="p-3.5 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA]">
                <p className="text-[12px] text-[#536174] font-medium">
                  Tramer / Hasar Kaydı
                </p>
                <p className="text-[15px] font-bold text-[#111F35] mt-0.5">
                  {listing.tramerInfo || "Belirtilmedi / Sorunuz"}
                </p>
              </div>
            </div>

            {listing.expertiseNotes && (
              <div className="p-3.5 rounded-[10px] bg-amber-50/60 border border-amber-200 text-[14px] text-[#182538] whitespace-pre-line">
                <strong className="text-[#111F35] block mb-1">
                  Ekspertiz Notu:
                </strong>
                {listing.expertiseNotes}
              </div>
            )}

            {hasExpertiseReport && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-[12px] font-semibold">
                  {(
                    ["Orijinal", "Lokal Boyalı", "Boyalı", "Değişen", "İşlemli"] as ExpertiseStatus[]
                  ).map((st) => (
                    <span key={st} className="inline-flex items-center gap-1.5">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${STATUS_DOT_STYLES[st]}`}
                      />
                      <span>{st}</span>
                    </span>
                  ))}
                </div>

                {/* Kritik Güvenlik: Şaseler & Airbag */}
                <div className="p-3.5 rounded-[10px] bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#111F35] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#D6A948]" />
                      <span>Şase, Podye &amp; Airbag (Kritik Güvenlik)</span>
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Doğrulanmış Kontrol
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {VEHICLE_PARTS.filter((p) => p.category === "sase_guvenlik").map((part) => {
                      const status: ExpertiseStatus =
                        expertiseReport[part.key] || "Orijinal";
                      return (
                        <div
                          key={part.key}
                          className={`px-3 py-2 rounded-[8px] border flex items-center justify-between text-[13px] font-semibold ${STATUS_BADGE_STYLES[status]}`}
                        >
                          <span className="truncate">{part.label}</span>
                          <span className="font-extrabold text-[12px] shrink-0 ml-2">
                            {status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Kaporta & Dış Gövde Parçaları */}
                <div>
                  <h4 className="text-[13px] font-bold text-[#111F35] mb-2 flex items-center gap-1.5">
                    <span>Kaporta &amp; Dış Parçalar</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {VEHICLE_PARTS.filter((p) => p.category === "kaporta").map((part) => {
                      const status: ExpertiseStatus =
                        expertiseReport[part.key] || "Orijinal";
                      return (
                        <div
                          key={part.key}
                          className={`px-3 py-2 rounded-[8px] border flex items-center justify-between text-[13px] ${STATUS_BADGE_STYLES[status]}`}
                        >
                          <span className="font-medium truncate">{part.label}</span>
                          <span className="font-bold text-[12px] shrink-0 ml-2">{status}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Summary, Specs & Quick Actions */}
        <div className="lg:col-span-5 bg-white border border-[#E0E4EA] rounded-[12px] p-6 space-y-5 lg:sticky lg:top-24 shadow-xs">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded bg-[#F7F5EF] border border-[#E0E4EA] text-[12px] font-semibold text-[#111F35]">
                {listing.brand} {listing.model}
              </span>
              {listing.stockInfo && (
                <span className="px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[12px] font-bold text-emerald-800">
                  {listing.stockInfo}
                </span>
              )}
            </div>

            <h1 className="font-heading font-extrabold text-[24px] md:text-[26px] leading-tight text-[#111F35]">
              {listing.title}
            </h1>

            {listing.price ? (
              <p className="mt-2 font-heading font-extrabold text-[26px] text-[#111F35]">
                {listing.price}
              </p>
            ) : (
              <p className="mt-2 flex items-center gap-1.5 text-[14px] text-[#536174]">
                <Lock className="w-4 h-4 text-[#D6A948]" />
                <span>Fiyat bilgisi için iletişime geçiniz</span>
              </p>
            )}
          </div>

          <dl className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E0E4EA] text-[14px]">
            <div className="p-2.5 rounded bg-[#F7F5EF]/70">
              <dt className="text-[12px] text-[#536174]">Marka / Model</dt>
              <dd className="font-bold text-[#111F35]">
                {listing.brand} {listing.model}
              </dd>
            </div>
            <div className="p-2.5 rounded bg-[#F7F5EF]/70">
              <dt className="text-[12px] text-[#536174]">Model Yılı</dt>
              <dd className="font-bold text-[#111F35]">
                {listing.year ?? "Belirtilmedi"}
              </dd>
            </div>
            <div className="p-2.5 rounded bg-[#F7F5EF]/70">
              <dt className="text-[12px] text-[#536174]">Yakıt Türü</dt>
              <dd className="font-bold text-[#111F35]">
                {listing.fuel || "Belirtilmedi"}
              </dd>
            </div>
            <div className="p-2.5 rounded bg-[#F7F5EF]/70">
              <dt className="text-[12px] text-[#536174]">Vites</dt>
              <dd className="font-bold text-[#111F35]">
                {listing.transmission || "Belirtilmedi"}
              </dd>
            </div>
            <div className="p-2.5 rounded bg-[#F7F5EF]/70">
              <dt className="text-[12px] text-[#536174]">Kilometre</dt>
              <dd className="font-bold text-[#111F35]">
                {listing.km !== null
                  ? `${listing.km.toLocaleString("tr-TR")} km`
                  : "Belirtilmedi"}
              </dd>
            </div>
            <div className="p-2.5 rounded bg-[#F7F5EF]/70">
              <dt className="text-[12px] text-[#536174]">Paket / Güç</dt>
              <dd className="font-bold text-[#111F35]">
                {[listing.trim, listing.horsepower].filter(Boolean).join(" • ") ||
                  "Standart"}
              </dd>
            </div>
            <div className="p-2.5 rounded bg-[#F7F5EF]/70">
              <dt className="text-[12px] text-[#536174]">Renk</dt>
              <dd className="font-bold text-[#111F35]">
                {listing.color || "Belirtilmedi"}
              </dd>
            </div>
            <div className="p-2.5 rounded bg-[#F7F5EF]/70">
              <dt className="text-[12px] text-[#536174]">Ekspertiz Özeti</dt>
              <dd className="font-bold text-[#111F35] truncate" title={listing.damageInfo || ""}>
                {listing.damageInfo || "Onaylı"}
              </dd>
            </div>
          </dl>

          {/* Senetli Satış Bilgi Notu */}
          <div className="p-3.5 rounded-[10px] bg-[#111F35] text-white text-[13px] space-y-1">
            <p className="font-bold text-[#D6A948]">
              %30 Peşinatla Kredili &bull; %40 Peşinatla Senetli Satış
            </p>
            <p className="text-white/85 text-[12px]">
              Kefilsiz, şartsız, banka güvenceli senetli taksit ve değerinde takas imkanı mevcuttur.
            </p>
          </div>

          <div className="pt-1 space-y-2.5">
            <a
              href={`https://wa.me/${contact.units.otomotiv.whatsappNumber}?text=${encodeURIComponent(
                `Merhaba GAPSAN Otomotiv, "${listing.title}" (${listing.price || "Fiyat Sorunuz"}) ilanı hakkında bilgi almak istiyorum.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-5 rounded-[10px] bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-[15px] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp ile Hemen Sor</span>
            </a>

            <Link
              href={`/?alan=otomotiv&ilan=${listing.slug}#talep`}
              className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-5 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-bold text-[15px] transition-colors"
            >
              <span>Bu İlanla Talep Oluştur</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <a
              href={contact.units.otomotiv.phoneTel}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 rounded-[10px] border border-[#E0E4EA] hover:bg-[#F7F5EF] text-[#111F35] font-semibold text-[14px] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#D6A948]" />
              <span>Otomotiv Hattını Ara ({contact.units.otomotiv.phoneDisplay})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
