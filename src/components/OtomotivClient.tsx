"use client";

import React, { useState, useRef, useMemo } from "react";
import Link from "next/link";
import {
  Car,
  SlidersHorizontal,
  ChevronRight,
  RotateCcw,
  AlertCircle,
  Phone,
} from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";
import { VehicleListing } from "@/lib/gapsan-data";

export default function OtomotivClient() {
  const { vehicles, demoVehicle, previewMode, contact } = useGapsanStore();

  const [brand, setBrand] = useState("");
  const [transmission, setTransmission] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxKm, setMaxKm] = useState("");
  const [filterError, setFilterError] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Applied filter state
  const [applied, setApplied] = useState({
    brand: "",
    transmission: "",
    minYear: "",
    maxKm: "",
  });

  const resultsHeadingRef = useRef<HTMLHeadingElement>(null);

  const publishedVehicles = useMemo(
    () => vehicles.filter((v) => v.status === "Yayında" && v.isAvailable),
    [vehicles]
  );

  const matchesFilters = (item: VehicleListing): boolean => {
    if (applied.brand) {
      if (
        !item.brand ||
        item.brand.toLowerCase() !== applied.brand.toLowerCase()
      ) {
        return false;
      }
    }
    if (applied.transmission) {
      if (
        !item.transmission ||
        item.transmission.toLowerCase() !== applied.transmission.toLowerCase()
      ) {
        return false;
      }
    }
    if (applied.minYear) {
      const y = Number(applied.minYear);
      if (item.year === null || item.year < y) {
        return false;
      }
    }
    if (applied.maxKm) {
      const k = Number(applied.maxKm);
      if (item.km === null || item.km > k) {
        return false;
      }
    }
    return true;
  };

  const filteredPublished = useMemo(
    () => publishedVehicles.filter(matchesFilters),
    [publishedVehicles, applied]
  );

  const showDemoPassat = useMemo(
    () => previewMode && matchesFilters(demoVehicle),
    [previewMode, demoVehicle, applied]
  );

  const hasActiveFilters = Boolean(
    applied.brand || applied.transmission || applied.minYear || applied.maxKm
  );

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const maxYear = new Date().getFullYear() + 1;

    if (minYear.trim() !== "") {
      const y = Number(minYear.trim());
      if (!Number.isInteger(y) || y < 1900 || y > maxYear) {
        setFilterError("Geçerli bir minimum model yılı girin.");
        return;
      }
    }
    if (maxKm.trim() !== "") {
      const k = Number(maxKm.trim());
      if (!Number.isInteger(k) || k < 0) {
        setFilterError(
          "Maksimum kilometre sıfır veya daha büyük bir tam sayı olmalı."
        );
        return;
      }
    }

    setFilterError("");
    setApplied({
      brand: brand.trim(),
      transmission: transmission.trim(),
      minYear: minYear.trim(),
      maxKm: maxKm.trim(),
    });
    setMobileFiltersOpen(false);
    setTimeout(() => {
      resultsHeadingRef.current?.focus();
    }, 30);
  };

  const handleClear = () => {
    setBrand("");
    setTransmission("");
    setMinYear("");
    setMaxKm("");
    setFilterError("");
    setApplied({ brand: "", transmission: "", minYear: "", maxKm: "" });
  };

  const brandOptions = useMemo(() => {
    const set = new Set<string>(["Volkswagen"]);
    publishedVehicles.forEach((v) => {
      if (v.brand) set.add(v.brand);
    });
    return Array.from(set);
  }, [publishedVehicles]);

  return (
    <div>
      {/* Cover */}
      <section className="relative bg-[#111F35] text-white h-[320px] md:h-[380px] overflow-hidden">
        <img
          src="/assets/gapsan/gapsan-otomotiv-kart-konsept.webp"
          alt="Gapşan Otomotiv galeri kapağı"
          style={{ objectPosition: "50% 56%" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(17,31,53,0.92) 0%, rgba(17,31,53,0.68) 55%, rgba(17,31,53,0.25) 100%)",
          }}
        />
        <div className="relative z-10 h-full gapsan-container flex flex-col justify-center">
          <h1 className="gapsan-h1 text-white max-w-[600px]">
            Gapşan Otomotiv
          </h1>
          <p className="mt-3 text-[16px] text-white/85 max-w-[540px]">
            Araç alımı, araç satışı ve takas süreçlerinde şeffaf değerlendirme
            ve doğrudan birim iletişimi.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/?alan=otomotiv#talep"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-semibold text-[15px]"
            >
              <span>Talep Oluştur</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href={contact.units.otomotiv.phoneTel}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] border border-white/30 hover:bg-white/10 text-white font-semibold text-[15px]"
            >
              <Phone className="w-4 h-4 text-[#D6A948]" />
              <span>{contact.units.otomotiv.phoneDisplay}</span>
            </a>
          </div>
        </div>
        <span className="absolute bottom-3 right-5 z-10 text-[12px] italic text-white/85 bg-[#111F35]/60 px-2.5 py-0.5 rounded">
          Konsept görsel
        </span>
      </section>

      {/* Alım, Satış ve Takas */}
      <section
        id="al-sat-takas"
        className="gapsan-container py-10 max-[768px]:py-7"
        aria-labelledby="al-sat-takas-heading"
      >
        <h2
          id="al-sat-takas-heading"
          className="gapsan-h2 text-[#111F35] mb-6"
        >
          Araç Alım, Satış ve Takas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Araç Alımı",
              desc: "Yayındaki veya ön incelemedeki araçlar hakkında doğrudan bilgi ve fiyat talebi oluşturun.",
            },
            {
              title: "Araç Satışı",
              desc: "Aracınızın marka, model, yıl ve kilometre bilgisini paylaşarak ön değerlendirme talep edin.",
            },
            {
              title: "Takas",
              desc: "Mevcut aracınızı yeni bir araçla takas etmek için hızlıca talep özeti hazırlayın.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white border border-[#E0E4EA] rounded-[10px] p-5 flex flex-col justify-between gap-4"
            >
              <div>
                <h3 className="font-heading font-bold text-[19px] text-[#111F35]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] text-[#536174] leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <Link
                href="/?alan=otomotiv#talep"
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#111F35] hover:underline"
              >
                <span>Talep Oluştur</span>
                <ChevronRight className="w-4 h-4 text-[#D6A948]" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* İlanlar ve Filtreler */}
      <section
        id="ilanlar"
        className="gapsan-container pb-14"
        aria-labelledby="ot-ilanlar-heading"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <h2
            id="ot-ilanlar-heading"
            ref={resultsHeadingRef}
            tabIndex={-1}
            className="gapsan-h2 text-[#111F35] focus-visible:outline-none"
          >
            Araç İlanları
          </h2>

          <button
            type="button"
            onClick={() => setMobileFiltersOpen((prev) => !prev)}
            aria-expanded={mobileFiltersOpen}
            className="md:hidden inline-flex items-center gap-2 min-h-[44px] px-4 rounded-[10px] bg-white border border-[#E0E4EA] text-[#111F35] font-semibold text-[14px]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#D6A948]" />
            <span>Filtreler</span>
          </button>
        </div>

        {/* Filter Bar */}
        <form
          onSubmit={handleApply}
          className={`${
            mobileFiltersOpen ? "block" : "hidden"
          } md:block bg-white border border-[#E0E4EA] rounded-[10px] p-5 mb-8`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label
                htmlFor="f-brand"
                className="block text-[13px] font-semibold text-[#182538] mb-1"
              >
                Marka
              </label>
              <select
                id="f-brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] bg-white text-[14px]"
              >
                <option value="">Tümü</option>
                {brandOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="f-trans"
                className="block text-[13px] font-semibold text-[#182538] mb-1"
              >
                Vites
              </label>
              <select
                id="f-trans"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] bg-white text-[14px]"
              >
                <option value="">Tümü</option>
                <option value="Otomatik">Otomatik</option>
                <option value="Manuel">Manuel</option>
                <option value="Yarı Otomatik">Yarı Otomatik</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="f-year"
                className="block text-[13px] font-semibold text-[#182538] mb-1"
              >
                Minimum Yıl
              </label>
              <input
                id="f-year"
                type="number"
                inputMode="numeric"
                value={minYear}
                onChange={(e) => setMinYear(e.target.value)}
                placeholder="Örn: 2017"
                className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] bg-white text-[14px]"
              />
            </div>

            <div>
              <label
                htmlFor="f-km"
                className="block text-[13px] font-semibold text-[#182538] mb-1"
              >
                Maksimum Km
              </label>
              <input
                id="f-km"
                type="number"
                inputMode="numeric"
                value={maxKm}
                onChange={(e) => setMaxKm(e.target.value)}
                placeholder="Örn: 150000"
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

        {/* Live Published Listings */}
        <div className="space-y-8">
          <div>
            <h3 className="font-heading font-bold text-[19px] text-[#111F35] mb-4">
              Yayındaki İlanlar
            </h3>

            {publishedVehicles.length === 0 ? (
              <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 text-[#536174] text-[15px]">
                Henüz yayında ilan bulunmuyor.
              </div>
            ) : filteredPublished.length === 0 ? (
              <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 text-[#536174] text-[15px] flex flex-wrap items-center justify-between gap-4">
                <span>Bu filtrelerle eşleşen ilan bulunamadı.</span>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="min-h-[44px] px-4 rounded-[10px] border border-[#E0E4EA] text-[#111F35] font-semibold text-[14px]"
                  >
                    Filtreleri Temizle
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredPublished.map((car) => (
                  <article
                    key={car.id}
                    className="bg-white border border-[#E0E4EA] rounded-[10px] overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[4/3] bg-[#111F35] overflow-hidden">
                        <img
                          src={car.images[0] || "/assets/gapsan/gapsan-ilan-siluet.png"}
                          alt={car.title}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="p-5 space-y-2">
                        <h4 className="font-heading font-bold text-[18px] text-[#111F35]">
                          {car.title}
                        </h4>
                        <p className="text-[14px] text-[#536174]">
                          {[
                            car.year,
                            car.transmission,
                            car.km !== null ? `${car.km.toLocaleString("tr-TR")} km` : null,
                          ]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                        {car.price && (
                          <p className="font-heading font-bold text-[17px] text-[#111F35]">
                            {car.price}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="px-5 pb-5 flex flex-col gap-2">
                      <Link
                        href={`/otomotiv/ilan/${car.slug}`}
                        className="w-full min-h-[44px] inline-flex items-center justify-center rounded-[10px] bg-[#111F35] text-white font-semibold text-[14px]"
                      >
                        İlanı İncele
                      </Link>
                      <Link
                        href={`/?alan=otomotiv&ilan=${car.slug}#talep`}
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

          {/* Separate Demo Dataset */}
          {showDemoPassat && (
            <div>
              <h3 className="font-heading font-bold text-[19px] text-[#111F35] mb-4 flex items-center gap-2">
                <Car className="w-5 h-5 text-[#D6A948]" />
                <span>Örnek İlan Kaydı</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <article className="bg-white border border-[#E0E4EA] rounded-[10px] overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[4/3] bg-[#111F35] flex items-center justify-center p-4">
                      <img
                        src={demoVehicle.images[0]}
                        alt={demoVehicle.title}
                        className="w-full h-full object-contain object-center"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-[#D6A948] text-[#111F35] text-[12px] font-bold">
                        Örnek
                      </span>
                      <span className="absolute bottom-2 right-3 text-[11px] italic text-white/75">
                        Fotoğraflar onay bekliyor
                      </span>
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-heading font-bold text-[18px] text-[#111F35]">
                          {demoVehicle.title}
                        </h4>
                      </div>
                      <p className="text-[14px] text-[#536174]">
                        {demoVehicle.fuel} &bull; {demoVehicle.transmission} &bull;{" "}
                        {demoVehicle.trim} &bull; {demoVehicle.horsepower}
                      </p>
                      <p className="text-[12px] font-medium text-[#536174]">
                        Yayın onayı bekliyor
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-5 flex flex-col gap-2">
                    <Link
                      href={`/otomotiv/ilan/${demoVehicle.slug}`}
                      className="w-full min-h-[44px] inline-flex items-center justify-center rounded-[10px] bg-[#111F35] text-white font-semibold text-[14px]"
                    >
                      İlanı İncele
                    </Link>
                    <Link
                      href={`/?alan=otomotiv&ilan=${demoVehicle.slug}#talep`}
                      className="w-full min-h-[44px] inline-flex items-center justify-center rounded-[10px] bg-[#D6A948] text-[#111F35] font-semibold text-[14px]"
                    >
                      Bu İlanla Talep Oluştur
                    </Link>
                  </div>
                </article>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
