"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Lock, Phone, Car } from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";

export default function OtomotivDetailClient({ slug }: { slug: string }) {
  const { vehicles, demoVehicle, previewMode, contact } = useGapsanStore();
  const [activePhoto, setActivePhoto] = useState(0);

  const isDemo = slug === demoVehicle.slug;
  const listing = isDemo
    ? previewMode
      ? demoVehicle
      : null
    : vehicles.find(
        (v) => v.slug === slug && v.status === "Yayında" && v.isAvailable
      ) ?? null;

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
    listing.images.length > 0
      ? listing.images
      : ["/assets/gapsan/gapsan-ilan-siluet.png"];

  return (
    <div className="gapsan-container py-10">
      <Link
        href="/otomotiv#ilanlar"
        className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#536174] hover:text-[#111F35] mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Otomotiv İlanlarına Dön</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Full-frame Gallery */}
        <div className="lg:col-span-7 bg-[#111F35] rounded-[10px] overflow-hidden border border-[#E0E4EA]">
          <div className="relative aspect-[16/10] flex items-center justify-center p-4">
            <img
              src={photos[activePhoto] ?? photos[0]}
              alt={listing.title}
              className="w-full h-full object-contain"
            />
            {listing.isExample && (
              <>
                <span className="absolute top-4 left-4 px-3 py-1 rounded bg-[#D6A948] text-[#111F35] text-[12px] font-bold">
                  Örnek
                </span>
                <span className="absolute bottom-3 right-4 text-[12px] italic text-white/80">
                  Fotoğraflar onay bekliyor
                </span>
              </>
            )}
          </div>
          {photos.length > 1 && (
            <div className="p-3 bg-white border-t border-[#E0E4EA] flex gap-2 overflow-x-auto">
              {photos.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setActivePhoto(i)}
                  className={`w-20 h-14 rounded overflow-hidden border-2 shrink-0 cursor-pointer ${
                    i === activePhoto
                      ? "border-[#D6A948]"
                      : "border-transparent opacity-70"
                  }`}
                >
                  <img
                    src={src}
                    alt={`${listing.title} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info & CTA */}
        <div className="lg:col-span-5 bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-5">
          <div>
            {listing.isExample && (
              <span className="inline-block mb-2 px-2.5 py-0.5 rounded bg-[#F7F5EF] border border-[#D6A948] text-[12px] font-semibold text-[#111F35]">
                Yayın onayı bekliyor
              </span>
            )}
            <h1 className="font-heading font-extrabold text-[28px] leading-tight text-[#111F35]">
              {listing.title}
            </h1>
            {listing.price ? (
              <p className="mt-2 font-heading font-bold text-[24px] text-[#111F35]">
                {listing.price}
              </p>
            ) : (
              <p className="mt-2 flex items-center gap-1.5 text-[14px] text-[#536174]">
                <Lock className="w-4 h-4 text-[#D6A948]" />
                <span>Fiyat bilgisi işletme onayı ile açılır</span>
              </p>
            )}
          </div>

          <dl className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E0E4EA] text-[14px]">
            <div>
              <dt className="text-[#536174]">Marka / Model</dt>
              <dd className="font-semibold text-[#111F35]">
                {listing.brand} {listing.model}
              </dd>
            </div>
            <div>
              <dt className="text-[#536174]">Model Yılı</dt>
              <dd className="font-semibold text-[#111F35]">
                {listing.year ?? "Onay bekliyor"}
              </dd>
            </div>
            <div>
              <dt className="text-[#536174]">Yakıt</dt>
              <dd className="font-semibold text-[#111F35]">
                {listing.fuel || "Onay bekliyor"}
              </dd>
            </div>
            <div>
              <dt className="text-[#536174]">Vites</dt>
              <dd className="font-semibold text-[#111F35]">
                {listing.transmission || "Onay bekliyor"}
              </dd>
            </div>
            <div>
              <dt className="text-[#536174]">Donanım / Güç</dt>
              <dd className="font-semibold text-[#111F35]">
                {[listing.trim, listing.horsepower].filter(Boolean).join(" • ") ||
                  "—"}
              </dd>
            </div>
            <div>
              <dt className="text-[#536174]">Kilometre</dt>
              <dd className="font-semibold text-[#111F35]">
                {listing.km !== null
                  ? `${listing.km.toLocaleString("tr-TR")} km`
                  : "Onay bekliyor"}
              </dd>
            </div>
            <div>
              <dt className="text-[#536174]">Hasar / Ekspertiz</dt>
              <dd className="font-semibold text-[#111F35]">
                {listing.damageInfo || "Onay bekliyor"}
              </dd>
            </div>
            <div>
              <dt className="text-[#536174]">Stok Durumu</dt>
              <dd className="font-semibold text-[#111F35]">
                {listing.stockInfo || "Onay bekliyor"}
              </dd>
            </div>
          </dl>

          <p className="text-[14px] text-[#536174] leading-relaxed pt-2 border-t border-[#E0E4EA]">
            {listing.description}
          </p>

          <div className="pt-2 space-y-2.5">
            <Link
              href={`/?alan=otomotiv&ilan=${listing.slug}#talep`}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-semibold text-[15px]"
            >
              <span>Bu İlanla Talep Oluştur</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href={contact.units.otomotiv.phoneTel}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 rounded-[10px] border border-[#E0E4EA] hover:bg-[#F7F5EF] text-[#111F35] font-semibold text-[14px]"
            >
              <Phone className="w-4 h-4 text-[#D6A948]" />
              <span>Otomotiv Birimini Ara ({contact.units.otomotiv.phoneDisplay})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
