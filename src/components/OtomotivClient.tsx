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
  ShieldCheck,
  Clock,
  CreditCard,
  Sparkles,
  BadgeCheck,
  Landmark,
  RefreshCw,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";
import {
  FINANCE_PARTNERS,
  SAVINGS_FINANCE_PARTNERS,
  VehicleListing,
} from "@/lib/gapsan-data";
import CertificatesGrid from "./CertificatesGrid";

export default function OtomotivClient() {
  const { vehicles, demoVehicle, previewMode, contact } = useGapsanStore();

  const [brand, setBrand] = useState("");
  const [transmission, setTransmission] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxKm, setMaxKm] = useState("");
  const [filterError, setFilterError] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
      <section className="relative bg-[#111F35] text-white min-h-[360px] md:min-h-[420px] py-12 overflow-hidden flex items-center">
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
              "linear-gradient(90deg, rgba(17,31,53,0.94) 0%, rgba(17,31,53,0.75) 60%, rgba(17,31,53,0.3) 100%)",
          }}
        />
        <div className="relative z-10 w-full gapsan-container">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded bg-[#D6A948] text-[#111F35] text-[12px] font-extrabold uppercase tracking-wide">
              2010 Yılından Bu Yana Güvenle...
            </span>
            <span className="px-3 py-1 rounded bg-white/15 border border-white/25 text-white text-[12px] font-semibold">
              İkinci El Motorlu Kara Taşıtı Yetki Belge No: 340 6225
            </span>
          </div>
          <h1 className="gapsan-h1 text-white max-w-[740px]">
            GAPSAN Otomotiv Senetli Satış Merkezi
          </h1>
          <p className="mt-3 text-[18px] text-[#D6A948] font-semibold">
            0’ Kilometre ve 2. Elde Güvenilir Adres
          </p>
          <p className="mt-2 text-[15px] text-white/90 max-w-[650px]">
            Kefilsiz, Kredisiz, %30–%40 Peşinat ve 36–48 Aya Varan Taksit
            Seçenekleri &bull; Taksitleri Sen Belirle, Ödemeye 3 Ay Sonra Başla!
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/?alan=otomotiv#talep"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-semibold text-[15px]"
            >
              <span>Talep &amp; Kredi Başvurusu</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/905324284332?text=${encodeURIComponent(
                "Merhaba Gapşan Otomotiv, senetli araç satışı ve kredi başvurusu hakkında bilgi almak istiyorum."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] bg-white text-[#111F35] hover:bg-[#F7F5EF] font-semibold text-[15px]"
            >
              <MessageCircle className="w-4 h-4 text-[#D6A948]" />
              <span>WhatsApp Kredi Hattı: 0532 428 43 32</span>
            </a>
            <a
              href={contact.socialMedia.whatsappChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-[15px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Kanalımızı Takip Edin</span>
            </a>
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

      {/* GAPSAN OTOMOTİV GÜVENCESİ & KAMPANYA BANNER */}
      <section className="gapsan-container pt-10 pb-4 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Güvence */}
          <div className="lg:col-span-7 bg-[#111F35] text-white rounded-[10px] p-6 md:p-8 flex flex-col justify-between gap-4 border border-[#E0E4EA]">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D6A948]/20 border border-[#D6A948] text-[#D6A948] text-[12px] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>GAPSAN OTOMOTİV GÜVENCESİ</span>
              </div>
              <h2 className="font-heading font-bold text-[24px] md:text-[28px] text-white">
                Ekspertiz ve Güvenilir Ticaret Garantisi
              </h2>
              <p className="text-[15px] text-white/90 leading-relaxed">
                Müşteri memnuniyeti ve güvenilir ticaret anlayışımız gereği;{" "}
                <strong className="text-[#D6A948]">
                  ağır hasar kayıtlı, şase işlemli, podye işlemli, airbag açmış
                  veya işlem görmüş ve kilometresi ile oynanmış
                </strong>{" "}
                araçların alım ve satımını kesinlikle yapmıyoruz.
              </p>
            </div>
            <div className="pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-[13px] text-white/80">
              <span>Yetki Belge No: 340 6225</span>
              <span>Değerinde Nakit Araç Alımı &bull; Eski Aracını Getir, Yenisini Götür</span>
            </div>
          </div>

          {/* Öne Çıkan Kampanya: Şimdi Al, 3 Ay Sonra Öde */}
          <div className="lg:col-span-5 bg-white border-2 border-[#D6A948] rounded-[10px] p-6 md:p-8 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D6A948] text-[#111F35] text-[12px] font-extrabold">
                <Sparkles className="w-4 h-4" />
                <span>ÖNE ÇIKAN KAMPANYAMIZ</span>
              </div>
              <h2 className="font-heading font-extrabold text-[24px] md:text-[26px] text-[#111F35]">
                ŞİMDİ AL, 3 AY SONRA ÖDE!
              </h2>
              <p className="text-[15px] text-[#536174] leading-relaxed">
                Senetli taksitli satışlarımızda geçerli olan bu özel kampanya
                ile aracınızı bugün teslim alın, ödemelerinize tam{" "}
                <strong className="text-[#111F35]">3 ay sonra</strong> başlayın.
                Peşinat ödemenizi takiben, ilk taksitiniz için 3 aylık bir
                erteleme fırsatından yararlanın.
              </p>
            </div>
            <a
              href={`https://wa.me/905324284332?text=${encodeURIComponent(
                "Merhaba Gapşan Otomotiv, 'Şimdi Al, 3 Ay Sonra Öde' senetli araç kampanyanız hakkında bilgi almak istiyorum."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 rounded-[10px] bg-[#111F35] hover:bg-[#1b2e4b] text-white font-semibold text-[14px]"
            >
              <MessageCircle className="w-4 h-4 text-[#D6A948]" />
              <span>Kampanyaya Başvur (0532 428 43 32)</span>
            </a>
          </div>
        </div>
      </section>

      {/* SENETLİ SATIŞ, KREDİ VE ÖDEME AVANTAJLARI */}
      <section
        id="al-sat-takas"
        className="gapsan-container py-8"
        aria-labelledby="avantajlar-heading"
      >
        <h2 id="avantajlar-heading" className="gapsan-h2 text-[#111F35] mb-6">
          Kredi, Senetli Satış ve Takas İmkanlarımız
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-2.5">
            <Clock className="w-6 h-6 text-[#D6A948]" />
            <h3 className="font-heading font-bold text-[19px] text-[#111F35]">
              Kimlik Bilgilerinizle Anında 30 Dakikada Krediniz Hazır
            </h3>
            <p className="text-[14px] text-[#536174] leading-relaxed">
              Kredi işlemlerinizi kendi satış ofisimizde hızlı ve kolay bir
              şekilde gerçekleştiriyoruz. Başvurunuzun onaylandığı aynı gün
              noter devir işlemleriniz tamamlanır.
            </p>
          </div>

          <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-2.5">
            <BadgeCheck className="w-6 h-6 text-[#D6A948]" />
            <h3 className="font-heading font-bold text-[19px] text-[#111F35]">
              Kefilsiz ve Şartsız Alım Fırsatı
            </h3>
            <p className="text-[14px] text-[#536174] leading-relaxed">
              Kredi skoru ne olursa olsun, kefilsiz ve şartsız olarak{" "}
              <strong>%30 peşinatla</strong>, <strong>2.69’dan başlayan</strong>{" "}
              avantajlı oranlar ve <strong>36–48 aya varan vade</strong>{" "}
              seçenekleri sunuyoruz.
            </p>
          </div>

          <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-2.5">
            <CreditCard className="w-6 h-6 text-[#D6A948]" />
            <h3 className="font-heading font-bold text-[19px] text-[#111F35]">
              Kredi Kartı ile 12 Aya Varan Taksit
            </h3>
            <p className="text-[14px] text-[#536174] leading-relaxed">
              Tüm kredi kartlarına 12 aya varan taksit mevcuttur. Araç
              peşinatınızı veya aylık senet taksitlerinizi kredi kartıyla
              ödeyebilirsiniz.
            </p>
          </div>

          <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-2.5">
            <Landmark className="w-6 h-6 text-[#D6A948]" />
            <h3 className="font-heading font-bold text-[19px] text-[#111F35]">
              KKB Puanınıza Göre Avantajlı Teklifler
            </h3>
            <ul className="text-[14px] text-[#536174] space-y-1.5 leading-relaxed">
              <li>
                &bull; <strong>1500 ve Üzeri KKB Puanı:</strong> Müşterilerimize
                özel <strong>PEŞİNATSIZ</strong> ve 24 aya varan vade imkanı.
              </li>
              <li>
                &bull; <strong>1250 ve Üzeri KKB Puanı:</strong> Sadece{" "}
                <strong>%20 peşinatla</strong> aracınıza sahip olma fırsatı.
              </li>
            </ul>
          </div>

          <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-2.5">
            <Car className="w-6 h-6 text-[#D6A948]" />
            <h3 className="font-heading font-bold text-[19px] text-[#111F35]">
              Ticari Müşterilerimize Özel Kredi &amp; Çekle Satış
            </h3>
            <p className="text-[14px] text-[#536174] leading-relaxed">
              Vergi levhalı müşterilerimiz ve şirketler için aracın kasko
              değerinin <strong>%90’ına kadar</strong> ticari taşıt kredisi
              kullanma olanağı (Maksimum 36 ay vade ile).{" "}
              <strong>Firmamızın kısa vadeli çek ile araç satışı vardır.</strong>
            </p>
          </div>

          <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-2.5">
            <RefreshCw className="w-6 h-6 text-[#D6A948]" />
            <h3 className="font-heading font-bold text-[19px] text-[#111F35]">
              Esnek Ödeme, Erken Kapama ve Takas Kolaylığı
            </h3>
            <p className="text-[14px] text-[#536174] leading-relaxed">
              <strong>Erken Kapama Avantajı:</strong> Borcunuzu erken
              kapattığınızda geriye kalan ayların tüm vade farkı silinir.{" "}
              <strong>Değişim ve Takas:</strong> Borcunuz devam ederken
              aracınızı bize geri satabilir veya takasla model
              yükseltebilir/düşürebilirsiniz.
            </p>
          </div>
        </div>

        {/* NEDEN GAPSAN OTOMOTİV & HAFTA SONU NOTER */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white border border-[#E0E4EA] rounded-[10px] p-6 md:p-8 space-y-4">
            <h3 className="font-heading font-bold text-[22px] text-[#111F35]">
              Neden GAPSAN Otomotiv? (Kurumsal Hizmet ve Güvence)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] space-y-1.5">
                <p className="font-heading font-bold text-[16px] text-[#111F35] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D6A948] shrink-0" />
                  Banka Güvencesi
                </p>
                <p className="text-[13px] text-[#536174] leading-relaxed">
                  Tüm senetli satışlarımız kurumsal altyapı ve banka tasdiki ile
                  yapılır. Peşinat ve tüm taksitleriniz banka güvencesi
                  altındadır.
                </p>
              </div>
              <div className="p-4 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] space-y-1.5">
                <p className="font-heading font-bold text-[16px] text-[#111F35] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D6A948] shrink-0" />
                  Kredi Limitiniz Etkilenmez
                </p>
                <p className="text-[13px] text-[#536174] leading-relaxed">
                  Yaptığınız taksitli alım, mevcut banka kredi limitlerinizi
                  etkilemez ve kredi sicilinizde (Findeks) görünmez.
                </p>
              </div>
              <div className="p-4 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] space-y-1.5">
                <p className="font-heading font-bold text-[16px] text-[#111F35] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D6A948] shrink-0" />
                  Aynı Gün Hızlı Teslimat
                </p>
                <p className="text-[13px] text-[#536174] leading-relaxed">
                  Başvurunuzun onaylandığı aynı gün içerisinde noter devir
                  işlemleriniz tamamlanır ve aracınız size teslim edilir.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#111F35] text-white rounded-[10px] p-6 md:p-8 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded bg-[#D6A948] text-[#111F35] text-[12px] font-bold">
                ÇALIŞMA SAATLERİ VE NOTER
              </span>
              <h3 className="font-heading font-bold text-[22px] text-white">
                Hafta Sonu Noter Hizmeti
              </h3>
              <p className="text-[14px] text-white/85 leading-relaxed">
                <strong>Cumartesi ve Pazar günleri</strong> nöbetçi noter satışı
                yapılmaktadır.
              </p>
              <p className="text-[15px] font-semibold text-[#D6A948]">
                Pazar günleri 11:00 – 17:00 saatleri arasında hizmet
                vermekteyiz.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <a
                href="tel:+905324284332"
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 rounded-[10px] bg-[#D6A948] text-[#111F35] font-semibold text-[14px]"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp &amp; Kredi Hattı: 0532 428 43 32</span>
              </a>
              <p className="text-center text-[12px] text-white/80">
                Otomotiv E-Posta:{" "}
                <a
                  href={`mailto:${contact.otomotivEmail}`}
                  className="underline hover:text-[#D6A948]"
                >
                  {contact.otomotivEmail}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* FİNANS ORTAKLARIMIZ & FAİZSİZ TASARRUF FİNANSMANI */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-3">
            <h3 className="font-heading font-bold text-[18px] text-[#111F35]">
              Güçlü Finans Ortaklarımız (Yetkili Bayi)
            </h3>
            <p className="text-[13px] text-[#536174]">
              Türkiye’nin önde gelen finans kuruluşlarının yetkili bayisi olarak
              hizmet sunmaktayız:
            </p>
            <div className="flex flex-wrap gap-2">
              {FINANCE_PARTNERS.map((partner) => (
                <span
                  key={partner}
                  className="px-3 py-1.5 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] text-[13px] font-semibold text-[#111F35]"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-3">
            <h3 className="font-heading font-bold text-[18px] text-[#111F35]">
              Faizsiz Tasarruf Finansmanı ile Satış İmkanı
            </h3>
            <p className="text-[13px] text-[#536174]">
              Tasarruf finansman şirketleri üzerinden araç alım işlemlerinizde
              tam destek sağlıyoruz:
            </p>
            <div className="flex flex-wrap gap-2">
              {SAVINGS_FINANCE_PARTNERS.map((partner) => (
                <span
                  key={partner}
                  className="px-3.5 py-1.5 rounded-[10px] bg-[#111F35] text-[#D6A948] text-[13px] font-bold uppercase"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* İlanlar ve Filtreler */}
      <section
        id="ilanlar"
        className="gapsan-container py-8"
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
                          src={
                            car.images[0] ||
                            "/assets/gapsan/gapsan-ilan-siluet.png"
                          }
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
                            car.km !== null
                              ? `${car.km.toLocaleString("tr-TR")} km`
                              : null,
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
                        {demoVehicle.fuel} &bull; {demoVehicle.transmission}{" "}
                        &bull; {demoVehicle.trim} &bull;{" "}
                        {demoVehicle.horsepower}
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

      {/* Otomotiv Resmi Yetki Belgeleri */}
      <section className="gapsan-container pb-14">
        <CertificatesGrid
          filterCategory="otomotiv"
          title="Otomotiv Yetki ve Mesleki Yeterlilik Belgelerimiz"
          subtitle="T.C. İstanbul Valiliği İkinci El Motorlu Kara Taşıtı Ticareti Yetki Belgesi (No: 3406225), Seviye 5 Mesleki Yeterlilik ve Oto Alım Satım Eğitimi Sertifikalarımız"
        />
      </section>
    </div>
  );
}
