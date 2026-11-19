"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  ChevronRight,
  Hammer,
  Phone,
  Home,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";
import CertificatesGrid from "./CertificatesGrid";

export default function GayrimenkulClient() {
  const { contact, constructionApprovedScope, projects } = useGapsanStore();
  const approvedProjects = projects.filter((p) => p.status === "Yayında");

  return (
    <div>
      {/* Cover */}
      <section className="relative bg-[#111F35] text-white min-h-[360px] md:min-h-[420px] py-12 overflow-hidden flex items-center">
        <img
          src="/assets/gapsan/gapsan-gayrimenkul-konsept.webp"
          alt="Gapşan Gayrimenkul cephe kapağı"
          style={{ objectPosition: "68% 62%" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(17,31,53,0.94) 0%, rgba(17,31,53,0.72) 58%, rgba(17,31,53,0.28) 100%)",
          }}
        />
        <div className="relative z-10 w-full gapsan-container">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded bg-[#D6A948] text-[#111F35] text-[12px] font-extrabold uppercase tracking-wide">
              Taşınmaz Ticareti Yetki Belge No: 3410913
            </span>
            <span className="px-3 py-1 rounded bg-white/15 border border-white/25 text-white text-[12px] font-semibold">
              Sorumlu Emlak Danışmanı (Seviye 5)
            </span>
          </div>
          <h1 className="gapsan-h1 text-white max-w-[680px]">
            GAPSAN İnşaat &amp; Gayrimenkul
          </h1>
          <p className="mt-3 text-[18px] text-[#D6A948] font-semibold">
            Evinizi GAPSAN ile Alın &bull; Kolay ve Hızlı Konut Sahibi Olun
          </p>
          <p className="mt-2 text-[16px] text-white/85 max-w-[580px]">
            Her bütçeye uygun konutlarımızla sizleri ev sahibi yapıyoruz.
            Satmak istediğiniz konutunuzu profesyonel satış ekibimiz ile
            değerinde ve hızlı satalım.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/gayrimenkul/satilik"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-semibold text-[15px]"
            >
              <span>Satılık İlanlar</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/gayrimenkul/kiralik"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] bg-white hover:bg-[#F7F5EF] text-[#111F35] font-semibold text-[15px]"
            >
              <span>Kiralık İlanlar</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/905350538804?text=${encodeURIComponent(
                "Merhaba Gapşan Gayrimenkul, satılık/kiralık konut seçenekleriniz hakkında bilgi almak istiyorum."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] border border-white/30 hover:bg-white/10 text-white font-semibold text-[15px]"
            >
              <MessageCircle className="w-4 h-4 text-[#D6A948]" />
              <span>WhatsApp: {contact.units.gayrimenkul.phoneDisplay}</span>
            </a>
          </div>
        </div>
        <span className="absolute bottom-3 right-5 z-10 text-[12px] italic text-white/85 bg-[#111F35]/60 px-2.5 py-0.5 rounded">
          Konsept görsel
        </span>
      </section>

      {/* İNŞ. GAYRİMENKUL HİZMET İLKELERİMİZ */}
      <section className="gapsan-container pt-10 pb-4">
        <h2 className="gapsan-h2 text-[#111F35] mb-6">
          Neden GAPSAN İnşaat &amp; Gayrimenkul?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Evinizi GAPSAN ile Alın",
              desc: "Sizin ev ihtiyacınızı biz tamamlamak için buradayız. Güvenilir ve yetki belgeli danışmanlıkla yanınızdayız.",
            },
            {
              title: "Kolay ve Hızlı Konut Sahibi Olun",
              desc: "Her bütçeye uygun konutlarımızla sizleri hızlı ve şeffaf süreçlerle ev sahibi yapıyoruz.",
            },
            {
              title: "Aradığınız Ev GAPSAN’da",
              desc: "Hayallerinizdeki ev için Esenyurt merkez ofisimize mutlaka uğrayın, size en uygun portföyü sunalım.",
            },
            {
              title: "Konutunuzu Değerinde Satalım",
              desc: "Satmak istediğiniz konutunuzu biz satalım. Profesyonel satış ekibimiz ile konutunuzu değerinde ve hızlı satalım.",
            },
          ].map((box) => (
            <div
              key={box.title}
              className="bg-white border border-[#E0E4EA] rounded-[10px] p-5 space-y-2.5"
            >
              <Home className="w-6 h-6 text-[#D6A948]" />
              <h3 className="font-heading font-bold text-[18px] text-[#111F35]">
                {box.title}
              </h3>
              <p className="text-[14px] text-[#536174] leading-relaxed">
                {box.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Satılık / Kiralık Cards */}
      <section className="gapsan-container py-8 max-[768px]:py-6">
        <h2 className="gapsan-h2 text-[#111F35] mb-6">
          Satılık ve Kiralık Portföy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/gayrimenkul/satilik"
            className="group bg-white border border-[#E0E4EA] hover:border-[#D6A948] rounded-[10px] p-6 flex items-start justify-between gap-4 transition-colors"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-[#111F35] font-heading font-bold text-[22px]">
                <Building2 className="w-5 h-5 text-[#D6A948]" />
                Satılık İlanlar
              </span>
              <p className="mt-2 text-[14px] text-[#536174]">
                Daire, iş yeri, arsa ve bina kategorilerinde onaylı satılık
                portföyü inceleyin.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#D6A948] shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/gayrimenkul/kiralik"
            className="group bg-white border border-[#E0E4EA] hover:border-[#D6A948] rounded-[10px] p-6 flex items-start justify-between gap-4 transition-colors"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-[#111F35] font-heading font-bold text-[22px]">
                <Building2 className="w-5 h-5 text-[#D6A948]" />
                Kiralık İlanlar
              </span>
              <p className="mt-2 text-[14px] text-[#536174]">
                Konut ve ticari kiralık seçenekleri ilçe ve metrekareye göre
                filtreleyin.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#D6A948] shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* İnşaat Scope under Gayrimenkul */}
      <section className="gapsan-container pb-10">
        <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-[680px]">
            <div className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#111F35] bg-[#F7F5EF] px-3 py-1 rounded">
              <Hammer className="w-4 h-4 text-[#D6A948]" />
              <span>İnşaat Faaliyet Kapsamı</span>
            </div>
            <h2 className="font-heading font-bold text-[24px] text-[#111F35]">
              Gayrimenkul ve İnşaat Çalışmaları
            </h2>
            <p className="text-[15px] text-[#536174] leading-relaxed">
              {constructionApprovedScope}
            </p>
            <p className="text-[13px] font-semibold text-[#111F35] flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-4 h-4 text-[#D6A948]" />
              Taşınmaz Ticareti Yetki Belgesi No: 3410913 &bull; İletişim:{" "}
              {contact.units.gayrimenkul.phoneDisplay}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/gayrimenkul/projeler"
              className="min-h-[44px] px-5 inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#111F35] text-white font-semibold text-[14px]"
            >
              <span>
                Projeler{" "}
                {approvedProjects.length > 0
                  ? `(${approvedProjects.length})`
                  : ""}
              </span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/?alan=gayrimenkul#talep"
              className="min-h-[44px] px-5 inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#D6A948] text-[#111F35] font-semibold text-[14px]"
            >
              <span>Talep Oluştur</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Gayrimenkul Resmi Yetki Belgeleri */}
      <section className="gapsan-container pb-14">
        <CertificatesGrid
          filterCategory="gayrimenkul"
          title="Gayrimenkul Yetki ve Mesleki Yeterlilik Belgelerimiz"
          subtitle="T.C. İstanbul Valiliği Taşınmaz Ticareti Yetki Belgesi (No: 3410913), Seviye 5 Sorumlu Emlak Danışmanı ve Emlak Danışmanlığı Eğitimi Sertifikalarımız"
        />
      </section>
    </div>
  );
}
