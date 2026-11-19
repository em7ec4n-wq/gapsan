"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  BookOpen,
  Car,
  Building2,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  MessageSquare,
  HelpCircle,
  FileText,
  MapPin,
  Phone,
  BadgeCheck,
} from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";

export function ActivityAreasSection() {
  const cards = [
    {
      title: "Otomotiv",
      href: "/otomotiv",
      image: "/assets/gapsan/gapsan-otomotiv-kart-konsept.webp",
      alt: "Gapşan Otomotiv galeri araçları konsept görseli",
      mobileFocus: "50% 56%",
    },
    {
      title: "Gayrimenkul",
      href: "/gayrimenkul",
      image: "/assets/gapsan/gapsan-gayrimenkul-konsept.webp",
      alt: "Gapşan Gayrimenkul apartman cephesi konsept görseli",
      mobileFocus: "68% 62%",
    },
    {
      title: "Sigorta",
      href: "/sigorta",
      image: "/assets/gapsan/gapsan-sigorta-konsept.webp",
      alt: "Gapşan Sigorta evrakları konsept görseli",
      mobileFocus: "65% 65%",
    },
  ];

  return (
    <section className="gapsan-container py-6" aria-labelledby="faaliyet-heading">
      <h2 id="faaliyet-heading" className="gapsan-h2 text-[#111F35] mb-6">
        Faaliyet Alanlarımız
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group relative block h-[220px] md:h-[240px] rounded-[10px] overflow-hidden border border-[#E0E4EA] bg-[#111F35]"
          >
            <img
              src={card.image}
              alt={card.alt}
              loading="lazy"
              style={{ objectPosition: card.mobileFocus }}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,31,53,0.08) 25%, rgba(17,31,53,0.82) 100%)",
              }}
            />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-2">
              <span className="font-heading font-bold text-[22px] text-white flex items-center gap-1.5">
                {card.title}
                <ChevronRight
                  className="w-5 h-5 text-[#D6A948] transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
              <span className="text-[11px] italic text-white/85 bg-[#111F35]/60 px-2 py-0.5 rounded">
                Konsept görsel
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ListingGuideSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="gapsan-container py-3" aria-labelledby="rehber-heading">
      <div className="bg-white border border-[#E0E4EA] rounded-[10px] overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="w-full min-h-[56px] px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#F7F5EF]/60 transition-colors cursor-pointer"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-2.5 font-heading font-bold text-[17px] text-[#111F35]">
              <BookOpen className="w-5 h-5 text-[#D6A948] shrink-0" aria-hidden="true" />
              <span id="rehber-heading">İlan Seçim Rehberi</span>
            </span>
            <span className="text-[14px] text-[#536174] border-l border-[#E0E4EA] pl-4 max-[640px]:border-l-0 max-[640px]:pl-0">
              İhtiyacınıza en uygun ilanı bulmanız için ipuçları ve öneriler.
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-[#536174] shrink-0 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {open && (
          <div className="px-5 pb-5 pt-2 border-t border-[#E0E4EA] grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F7F5EF]/40">
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-[16px] text-[#111F35]">
                Otomotiv İlanlarında Seçim Kriterleri
              </h3>
              <p className="text-[14px] text-[#536174]">
                Araç ararken <strong>model yılı</strong>,{" "}
                <strong>kilometre</strong> ve <strong>vites tipi</strong>{" "}
                filtrelerini birlikte kullanarak bütçenize ve kullanım
                alışkanlığınıza uygun araçları daraltabilirsiniz.
              </p>
              <Link
                href="/otomotiv#ilanlar"
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#111F35] hover:underline"
              >
                <span>Otomotiv İlanlarına Git</span>
                <ChevronRight className="w-4 h-4 text-[#D6A948]" />
              </Link>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading font-bold text-[16px] text-[#111F35]">
                Gayrimenkul İlanlarında Seçim Kriterleri
              </h3>
              <p className="text-[14px] text-[#536174]">
                Taşınmaz ararken <strong>işlem türü (Satılık / Kiralık)</strong>
                , <strong>ilçe</strong> ve <strong>metrekare (m²)</strong>{" "}
                tercihinize göre ayrı sayfalardan filtreleme yapabilirsiniz.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/gayrimenkul/satilik"
                  className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#111F35] hover:underline"
                >
                  <span>Satılık İlanlar</span>
                  <ChevronRight className="w-4 h-4 text-[#D6A948]" />
                </Link>
                <Link
                  href="/gayrimenkul/kiralik"
                  className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#111F35] hover:underline"
                >
                  <span>Kiralık İlanlar</span>
                  <ChevronRight className="w-4 h-4 text-[#D6A948]" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function FeaturedListingSection() {
  const { demoVehicle } = useGapsanStore();

  return (
    <section className="gapsan-container py-5" aria-labelledby="one-cikan-heading">
      <div className="bg-[#111F35] text-white rounded-[10px] p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-6 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2
              id="one-cikan-heading"
              className="font-heading font-bold text-[26px] md:text-[32px] text-white"
            >
              Öne Çıkan İlan
            </h2>
            <span className="px-2.5 py-0.5 rounded bg-white/10 border border-white/20 text-[12px] font-medium text-[#D6A948]">
              Yayın onayı bekliyor
            </span>
          </div>

          <p className="text-[20px] md:text-[22px] font-semibold text-white">
            {demoVehicle.title}
          </p>
          <p className="text-[14px] text-white/75">
            {demoVehicle.fuel} &bull; {demoVehicle.transmission} &bull;{" "}
            {demoVehicle.trim} &bull; {demoVehicle.horsepower}
          </p>

          <div className="pt-2">
            <Link
              href={`/otomotiv/ilan/${demoVehicle.slug}`}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-semibold text-[15px] transition-colors"
            >
              <span>İlanı İncele</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="md:col-span-6 flex flex-col items-center justify-center text-center">
          <img
            src="/assets/gapsan/gapsan-ilan-siluet.png"
            alt="2017 Volkswagen Passat silüet görseli"
            loading="lazy"
            className="w-full max-w-[380px] h-auto object-contain"
          />
          <p className="mt-2 text-[13px] italic text-white/75">
            Fotoğraflar onay bekliyor
          </p>
        </div>
      </div>
    </section>
  );
}

export function ServiceShowcaseSection() {
  const items = [
    {
      title: "Araç Alım ve Takas",
      desc: "Araç alım, satım ve takas süreçlerinizde güvenilir destek.",
      href: "/otomotiv#al-sat-takas",
      icon: Car,
    },
    {
      title: "Satılık ve Kiralık",
      desc: "Konut ve iş yeri ilanlarında size uygun seçenekler.",
      href: "/gayrimenkul",
      icon: Building2,
    },
    {
      title: "Sigorta Talebi",
      desc: "İhtiyacınıza uygun sigorta çözümleri için hızlı teklif.",
      href: "/sigorta#sigorta-talep",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="gapsan-container py-6" aria-labelledby="vitrin-heading">
      <h2 id="vitrin-heading" className="gapsan-h2 text-[#111F35] mb-6">
        Hizmet Vitrini
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-white border border-[#E0E4EA] rounded-[10px] p-5 flex items-start gap-4 hover:border-[#D6A948] transition-colors"
            >
              <div className="w-11 h-11 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#D6A948]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-[18px] text-[#111F35] group-hover:text-[#111F35] flex items-center gap-1">
                  {item.title}
                  <ChevronRight
                    className="w-4 h-4 text-[#D6A948] opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  />
                </h3>
                <p className="mt-1 text-[14px] text-[#536174] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const steps = [
    {
      num: "1",
      title: "Seçin",
      desc: "Hizmet alanınızı ve ihtiyacınızı belirleyin.",
    },
    {
      num: "2",
      title: "Özetleyin",
      desc: "Talebinizin detaylarını ekleyin.",
    },
    {
      num: "3",
      title: "İletin",
      desc: "Talebinizi gönderin, ekibimiz sizinle iletişime geçsin.",
    },
  ];

  return (
    <section className="gapsan-container py-6" aria-labelledby="nasil-heading">
      <h2 id="nasil-heading" className="gapsan-h2 text-[#111F35] mb-6">
        Talep Nasıl İlerler?
      </h2>
      <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => (
          <div key={step.num} className="flex items-start gap-4 relative">
            <span className="w-9 h-9 rounded-full bg-[#D6A948]/20 border border-[#D6A948] text-[#111F35] font-heading font-bold text-[16px] flex items-center justify-center shrink-0">
              {step.num}
            </span>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-[18px] text-[#111F35]">
                {step.title}
              </h3>
              <p className="mt-1 text-[14px] text-[#536174]">{step.desc}</p>
            </div>
            {idx < steps.length - 1 && (
              <ChevronRight
                className="hidden md:block w-5 h-5 text-[#E0E4EA] self-center shrink-0"
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ReviewsSection() {
  const { reviews, previewMode } = useGapsanStore();
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const approvedReviews = reviews.filter((r) => r.status === "Yayında");

  // Canlıda onaylı kayıt yoksa gizle
  if (!previewMode && approvedReviews.length === 0) {
    return null;
  }

  // Önizlemede onay bekleyen mesajı göster
  if (approvedReviews.length === 0) {
    return (
      <section className="gapsan-container py-2" aria-labelledby="yorumlar-heading">
        <div className="bg-white border border-[#E0E4EA] rounded-[10px] px-5 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-2.5 font-heading font-bold text-[17px] text-[#111F35]">
              <MessageSquare
                className="w-5 h-5 text-[#D6A948] shrink-0"
                aria-hidden="true"
              />
              <span id="yorumlar-heading">Müşteri Yorumları</span>
            </span>
            <span className="text-[14px] text-[#536174] border-l border-[#E0E4EA] pl-4 max-[640px]:border-l-0 max-[640px]:pl-0">
              Müşteri yorumları onay bekliyor.
            </span>
          </div>
          <Link
            href="/kurumsal/yorum-dogrulama"
            className="text-[13px] font-semibold text-[#111F35] hover:underline"
          >
            Doğrulama Politikası
          </Link>
        </div>
      </section>
    );
  }

  const maxIndex = Math.max(0, approvedReviews.length - 1);
  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section
      className="gapsan-container py-6"
      aria-labelledby="yorumlar-heading"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff =
          touchStartX.current - (e.changedTouches[0]?.clientX ?? touchStartX.current);
        if (Math.abs(diff) > 40) {
          if (diff > 0) next();
          else prev();
        }
        touchStartX.current = null;
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
      tabIndex={0}
    >
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <h2 id="yorumlar-heading" className="gapsan-h2 text-[#111F35]">
            Müşteri Yorumları
          </h2>
          <Link
            href="/kurumsal/yorum-dogrulama"
            className="text-[13px] text-[#536174] hover:text-[#111F35] underline"
          >
            Yorum doğrulama açıklaması
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            aria-label="Önceki yorum"
            className="min-h-[44px] min-w-[44px] rounded-[10px] border border-[#E0E4EA] bg-white flex items-center justify-center disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-[#111F35]" />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={index >= maxIndex}
            aria-label="Sonraki yorum"
            className="min-h-[44px] min-w-[44px] rounded-[10px] border border-[#E0E4EA] bg-white flex items-center justify-center disabled:opacity-40 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-[#111F35]" />
          </button>
        </div>
      </div>

      {/* Desktop: 2-3 cards; Mobile: 1 card + peek of next */}
      <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto snap-x snap-mandatory pb-2">
        {approvedReviews.slice(index, index + 3).map((rev) => (
          <article
            key={rev.id}
            className="min-w-[85%] md:min-w-0 snap-start bg-white border border-[#E0E4EA] rounded-[10px] p-5 flex flex-col justify-between gap-4"
          >
            <p className="text-[15px] text-[#182538] leading-relaxed">
              “{rev.comment}”
            </p>
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#E0E4EA]">
              <div>
                <p className="font-semibold text-[14px] text-[#111F35]">
                  {rev.author}
                </p>
                <p className="text-[12px] text-[#536174]">{rev.area}</p>
              </div>
              {rev.verifiedMatch && rev.publishPermission && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F7F5EF] border border-[#D6A948]/60 text-[11px] font-semibold text-[#111F35]">
                  <BadgeCheck className="w-3.5 h-3.5 text-[#D6A948]" aria-hidden="true" />
                  Doğrulanmış Müşteri
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FaqSection() {
  const [open, setOpen] = useState(false);

  const faqs = [
    {
      q: "İlan güncelliği nasıl sağlanır?",
      a: "Tüm araç ve gayrimenkul ilanları işletme yetkisi, EİDS kapsamı ve stok durumu doğrulandıktan sonra yayına alınır.",
      ctaLabel: "Öne Çıkan İlanı İncele",
      ctaHref: "/otomotiv/ilan/2017-volkswagen-passat-1347951505",
    },
    {
      q: "Takas başvurusu nasıl yapılır?",
      a: "Talep oluşturucu üzerinden Otomotiv sekmesini seçip 'Takas' seçeneğiyle aracınızın marka-model ve yıl bilgisini iletebilirsiniz.",
      ctaLabel: "Takas Talebi Oluştur",
      ctaHref: "/#talep",
    },
    {
      q: "Sigorta teklifi süreci nasıl işler?",
      a: "Trafik, Kasko veya Sağlık sigortası talebinizi seçtiğinizde kimlik veya plaka bilgisi paylaşmadan doğrudan sigorta birim hattına yönlendirilirsiniz.",
      ctaLabel: "Sigorta Talebi Oluştur",
      ctaHref: "/sigorta#sigorta-talep",
    },
  ];

  return (
    <section className="gapsan-container py-2" aria-labelledby="sss-heading">
      <div className="bg-white border border-[#E0E4EA] rounded-[10px] overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="w-full min-h-[56px] px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#F7F5EF]/60 transition-colors cursor-pointer"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-2.5 font-heading font-bold text-[17px] text-[#111F35]">
              <HelpCircle
                className="w-5 h-5 text-[#D6A948] shrink-0"
                aria-hidden="true"
              />
              <span id="sss-heading">Sık Sorulan Sorular</span>
            </span>
            <span className="text-[14px] text-[#536174] border-l border-[#E0E4EA] pl-4 max-[640px]:border-l-0 max-[640px]:pl-0">
              En çok merak edilen sorular ve cevapları.
            </span>
          </div>
          <ChevronRight
            className={`w-5 h-5 text-[#536174] shrink-0 transition-transform ${
              open ? "rotate-90" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {open && (
          <div className="px-5 pb-5 pt-3 border-t border-[#E0E4EA] space-y-4 bg-[#F7F5EF]/40">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="bg-white border border-[#E0E4EA] rounded-[10px] p-4"
              >
                <h3 className="font-heading font-bold text-[16px] text-[#111F35]">
                  {item.q}
                </h3>
                <p className="mt-1 text-[14px] text-[#536174]">{item.a}</p>
                <Link
                  href={item.ctaHref}
                  className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-[#111F35] hover:underline"
                >
                  <span>{item.ctaLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D6A948]" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function ReachGapsanSection() {
  const { contact } = useGapsanStore();

  return (
    <section className="gapsan-container py-8" aria-labelledby="ulasin-heading">
      <div className="relative overflow-hidden rounded-[10px] bg-[#111F35] text-white p-6 md:p-8">
        {/* Decorative gold diagonal accent matching reference */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute top-0 right-0 bottom-0 w-[44%] bg-[#D6A948]"
          style={{
            clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-white/15 text-[#D6A948] text-[11px] font-bold">
                2010’DAN BU YANA GÜVENLE
              </span>
              <span className="text-[12px] text-white/80">
                Yetki Belge No: 340 6225 / 341 0913
              </span>
            </div>
            <h2
              id="ulasin-heading"
              className="font-heading font-bold text-[26px] md:text-[32px] text-white"
            >
              Gapşan’a Ulaşın
            </h2>
            <p className="text-[15px] text-white/85 max-w-[480px]">
              Otomotiv (0’ km &amp; senetli satış), gayrimenkul ve sigorta
              ihtiyaçlarınız için hemen bizimle iletişime geçin. Hafta sonu
              nöbetçi noter satışımız mevcuttur.
            </p>
            <div className="pt-1 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-white/90">
              <a
                href={contact.generalPhoneTel}
                className="inline-flex items-center gap-1.5 hover:text-[#D6A948]"
              >
                <Phone className="w-3.5 h-3.5 text-[#D6A948]" aria-hidden="true" />
                Genel: {contact.generalPhoneDisplay}
              </a>
              <a
                href={contact.units.otomotiv.phoneTel}
                className="inline-flex items-center gap-1.5 hover:text-[#D6A948]"
              >
                Otomotiv &amp; Kredi: {contact.units.otomotiv.phoneDisplay}
              </a>
              <a
                href={contact.units.gayrimenkul.phoneTel}
                className="inline-flex items-center gap-1.5 hover:text-[#D6A948]"
              >
                Gayrimenkul: {contact.units.gayrimenkul.phoneDisplay}
              </a>
              <a
                href={contact.units.sigorta.phoneTel}
                className="inline-flex items-center gap-1.5 hover:text-[#D6A948]"
              >
                Sigorta (7/24): {contact.units.sigorta.phoneDisplay}
              </a>
              <a
                href={`mailto:${contact.insuranceEmail}`}
                className="inline-flex items-center gap-1.5 hover:text-[#D6A948]"
              >
                E-Posta: {contact.insuranceEmail}
              </a>
              <a
                href={contact.officialWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#D6A948]"
              >
                Web: gapsanticaret.com.tr
              </a>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col sm:flex-row md:justify-end gap-3">
            <Link
              href="/#talep"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] bg-[#111F35] border border-white/25 hover:bg-[#1b2e4b] text-white font-semibold text-[15px] transition-colors"
            >
              <FileText className="w-4 h-4 text-[#D6A948]" aria-hidden="true" />
              <span>Teklif İste</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={contact.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] bg-[#F7F5EF] hover:bg-white text-[#111F35] font-semibold text-[15px] transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#111F35]" aria-hidden="true" />
              <span>Yol Tarifi</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
