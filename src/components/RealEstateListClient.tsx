"use client";

import React, { useState, useRef, useMemo } from "react";
import Link from "next/link";
import {
  Building2,
  SlidersHorizontal,
  RotateCcw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";
import { RealEstateListing } from "@/lib/gapsan-data";

export default function RealEstateListClient({
  listingType,
}: {
  listingType: "Satılık" | "Kiralık";
}) {
  const { realEstates } = useGapsanStore();

  const [district, setDistrict] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minM2, setMinM2] = useState("");
  const [filterError, setFilterError] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [applied, setApplied] = useState({
    district: "",
    propertyType: "",
    minM2: "",
  });

  const resultsHeadingRef = useRef<HTMLHeadingElement>(null);

  const publishedForType = useMemo(
    () =>
      realEstates.filter(
        (r) =>
          r.status === "Yayında" &&
          r.isAvailable &&
          r.listingType === listingType
      ),
    [realEstates, listingType]
  );

  const matches = (item: RealEstateListing): boolean => {
    if (applied.district) {
      if (
        !item.district ||
        !item.district.toLowerCase().includes(applied.district.toLowerCase())
      ) {
        return false;
      }
    }
    if (applied.propertyType) {
      if (!item.propertyType || item.propertyType !== applied.propertyType) {
        return false;
      }
    }
    if (applied.minM2) {
      const m = Number(applied.minM2);
      if (item.areaM2 === null || item.areaM2 < m) {
        return false;
      }
    }
    return true;
  };

  const filtered = useMemo(
    () => publishedForType.filter(matches),
    [publishedForType, applied]
  );

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (minM2.trim() !== "") {
      const m = Number(minM2.trim());
      if (Number.isNaN(m) || m <= 0) {
        setFilterError("Minimum metrekare sıfırdan büyük olmalı.");
        return;
      }
    }
    setFilterError("");
    setApplied({
      district: district.trim(),
      propertyType: propertyType.trim(),
      minM2: minM2.trim(),
    });
    setMobileFiltersOpen(false);
    setTimeout(() => {
      resultsHeadingRef.current?.focus();
    }, 30);
  };

  const handleClear = () => {
    setDistrict("");
    setPropertyType("");
    setMinM2("");
    setFilterError("");
    setApplied({ district: "", propertyType: "", minM2: "" });
  };

  return (
    <div className="gapsan-container py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <Link
            href="/gayrimenkul"
            className="inline-flex items-center gap-1 text-[14px] font-medium text-[#536174] hover:text-[#111F35] mb-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Gayrimenkul Ana Sayfa</span>
          </Link>
          <h1
            ref={resultsHeadingRef}
            tabIndex={-1}
            className="gapsan-h1 text-[#111F35] focus-visible:outline-none"
          >
            {listingType} Gayrimenkul İlanları
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={
              listingType === "Satılık"
                ? "/gayrimenkul/kiralik"
                : "/gayrimenkul/satilik"
            }
            className="min-h-[44px] px-4 inline-flex items-center justify-center rounded-[10px] border border-[#E0E4EA] bg-white text-[#111F35] font-semibold text-[14px] hover:bg-[#F7F5EF]"
          >
            {listingType === "Satılık"
              ? "Kiralık İlanlara Geç"
              : "Satılık İlanlara Geç"}
          </Link>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((prev) => !prev)}
            aria-expanded={mobileFiltersOpen}
            className="md:hidden inline-flex items-center gap-2 min-h-[44px] px-4 rounded-[10px] bg-[#111F35] text-white font-semibold text-[14px]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#D6A948]" />
            <span>Filtreler</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <form
        onSubmit={handleApply}
        className={`${
          mobileFiltersOpen ? "block" : "hidden"
        } md:block bg-white border border-[#E0E4EA] rounded-[10px] p-5 mb-8`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="re-f-district"
              className="block text-[13px] font-semibold text-[#182538] mb-1"
            >
              İlçe
            </label>
            <input
              id="re-f-district"
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Örn: Esenyurt"
              className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] bg-white text-[14px]"
            />
          </div>

          <div>
            <label
              htmlFor="re-f-type"
              className="block text-[13px] font-semibold text-[#182538] mb-1"
            >
              Taşınmaz Türü
            </label>
            <select
              id="re-f-type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] bg-white text-[14px]"
            >
              <option value="">Tümü</option>
              <option value="Daire">Daire</option>
              <option value="İş Yeri">İş Yeri</option>
              <option value="Arsa">Arsa</option>
              <option value="Villa">Villa</option>
              <option value="Bina">Bina</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="re-f-m2"
              className="block text-[13px] font-semibold text-[#182538] mb-1"
            >
              Minimum m²
            </label>
            <input
              id="re-f-m2"
              type="number"
              inputMode="numeric"
              value={minM2}
              onChange={(e) => setMinM2(e.target.value)}
              placeholder="Örn: 90"
              className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] bg-white text-[14px]"
            />
          </div>
        </div>

        {filterError && (
          <p
            role="alert"
            className="mt-3 flex items-center gap-2 text-[14px] text-red-700"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{filterError}</span>
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="min-h-[44px] px-6 rounded-[10px] bg-[#111F35] hover:bg-[#1b2e4b] text-white font-semibold text-[14px] cursor-pointer"
          >
            Uygula
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 min-h-[44px] px-4 rounded-[10px] border border-[#E0E4EA] text-[#182538] font-medium text-[14px] hover:bg-[#F7F5EF] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Filtreleri Temizle</span>
          </button>
        </div>
      </form>

      {/* Results */}
      {publishedForType.length === 0 ? (
        <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-8 text-center space-y-3">
          <Building2 className="w-10 h-10 text-[#D6A948] mx-auto" />
          <p className="text-[16px] font-semibold text-[#111F35]">
            Henüz yayında ilan bulunmuyor.
          </p>
          <p className="text-[14px] text-[#536174]">
            {listingType} gayrimenkul talebinizi doğrudan ekibimize
            iletebilirsiniz.
          </p>
          <div className="pt-2">
            <Link
              href="/?alan=gayrimenkul#talep"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-[10px] bg-[#D6A948] text-[#111F35] font-semibold text-[14px]"
            >
              <span>Gayrimenkul Talebi Oluştur</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[#536174]">
            Bu filtrelerle eşleşen ilan bulunamadı.
          </span>
          <button
            type="button"
            onClick={handleClear}
            className="min-h-[44px] px-4 rounded-[10px] border border-[#E0E4EA] text-[#111F35] font-semibold text-[14px]"
          >
            Filtreleri Temizle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-[#E0E4EA] rounded-[10px] overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] bg-[#111F35] overflow-hidden">
                  <img
                    src={
                      item.images[0] ||
                      "/assets/gapsan/gapsan-gayrimenkul-konsept.webp"
                    }
                    alt={item.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="inline-block px-2 py-0.5 rounded bg-[#F7F5EF] border border-[#E0E4EA] text-[12px] font-semibold text-[#111F35]">
                    {item.listingType} &bull; {item.propertyType}
                  </span>
                  <h2 className="font-heading font-bold text-[18px] text-[#111F35]">
                    {item.title}
                  </h2>
                  <p className="text-[14px] text-[#536174]">
                    {[
                      item.district,
                      item.areaM2 ? `${item.areaM2} m²` : null,
                      item.rooms || null,
                    ]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>
                  {item.price && (
                    <p className="font-heading font-bold text-[17px] text-[#111F35]">
                      {item.price}
                    </p>
                  )}
                </div>
              </div>
              <div className="px-5 pb-5 flex flex-col gap-2">
                <Link
                  href={`/gayrimenkul/ilan/${item.slug}`}
                  className="w-full min-h-[44px] inline-flex items-center justify-center rounded-[10px] bg-[#111F35] text-white font-semibold text-[14px]"
                >
                  İlanı İncele
                </Link>
                <Link
                  href={`/?alan=gayrimenkul&ilan=${item.slug}#talep`}
                  className="w-full min-h-[44px] inline-flex items-center justify-center rounded-[10px] bg-[#D6A948] text-[#111F35] font-semibold text-[14px]"
                >
                  Bu İlanla Talep Oluştur
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
