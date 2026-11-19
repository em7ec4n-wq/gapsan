"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";

export default function HeroSlider() {
  const { slides } = useGapsanStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const total = slides.length;
  const current = slides[activeIndex] ?? slides[0];

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const diff = touchStartX.current - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  if (!current) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Öne çıkan hizmetler"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative bg-[#111F35] text-white overflow-hidden focus-visible:outline-none"
    >
      {/* Desktop Layout: 620px height, left text + right focal image */}
      <div className="hidden md:block relative h-[620px] w-full">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            aria-hidden={idx !== activeIndex}
            className={`absolute inset-0 transition-opacity duration-500 ${
              idx === activeIndex
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              loading={idx === 0 ? "eager" : "lazy"}
              fetchPriority={idx === 0 ? "high" : "auto"}
              style={{ objectPosition: slide.desktopFocus }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* CSS transition / readability overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(17,31,53,0.92) 0%, rgba(17,31,53,0.72) 42%, rgba(17,31,53,0.18) 76%, rgba(17,31,53,0.08) 100%)",
              }}
            />

            <div className="relative z-10 h-full gapsan-container flex items-center">
              <div className="max-w-[540px]">
                <h1 className="gapsan-h1 text-white">{slide.heading}</h1>
                {slide.location && (
                  <p className="mt-4 flex items-center gap-2 text-[16px] text-white/90 font-medium">
                    <MapPin
                      className="w-4 h-4 text-[#D6A948] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{slide.location}</span>
                  </p>
                )}
                <div className="mt-7">
                  <Link
                    href={slide.ctaHref}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-semibold text-[16px] transition-colors"
                  >
                    <span>{slide.ctaLabel}</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            <span className="absolute bottom-4 right-5 z-10 text-[12px] italic text-white/85 bg-[#111F35]/60 px-2.5 py-1 rounded">
              {slide.conceptLabel}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile Layout: min-h 490px, text top block + image bottom block */}
      <div className="md:hidden relative min-h-[490px] flex flex-col justify-between bg-[#111F35]">
        <div className="px-5 pt-7 pb-5 z-10">
          <h1 className="gapsan-h1 text-white">{current.heading}</h1>
          {current.location && (
            <p className="mt-3 flex items-center gap-1.5 text-[14px] text-white/90 font-medium">
              <MapPin
                className="w-4 h-4 text-[#D6A948] shrink-0"
                aria-hidden="true"
              />
              <span>{current.location}</span>
            </p>
          )}
          <div className="mt-5">
            <Link
              href={current.ctaHref}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-semibold text-[15px] transition-colors"
            >
              <span>{current.ctaLabel}</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="relative h-[240px] w-full overflow-hidden">
          <img
            src={current.image}
            alt={current.alt}
            loading={activeIndex === 0 ? "eager" : "lazy"}
            style={{ objectPosition: current.mobileFocus }}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,31,53,0.95) 0%, rgba(17,31,53,0.15) 38%, rgba(17,31,53,0.25) 100%)",
            }}
          />
          <span className="absolute bottom-3 right-4 z-10 text-[11px] italic text-white/90 bg-[#111F35]/60 px-2 py-0.5 rounded">
            {current.conceptLabel}
          </span>
        </div>
      </div>

      {/* Controls: Prev / Next Arrows */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Önceki slayt"
        className="absolute left-3 md:left-5 top-1/2 max-[768px]:top-[72%] -translate-y-1/2 z-20 min-h-[44px] min-w-[44px] rounded-full bg-[#111F35]/65 hover:bg-[#111F35]/90 border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Sonraki slayt"
        className="absolute right-3 md:right-5 top-1/2 max-[768px]:top-[72%] -translate-y-1/2 z-20 min-h-[44px] min-w-[44px] rounded-full bg-[#111F35]/65 hover:bg-[#111F35]/90 border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* Dots */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        role="tablist"
        aria-label="Slayt seçimi"
      >
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={idx === activeIndex}
            aria-label={`${idx + 1}. slayt: ${slide.heading}`}
            onClick={() => setActiveIndex(idx)}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              idx === activeIndex
                ? "w-7 bg-[#D6A948]"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
