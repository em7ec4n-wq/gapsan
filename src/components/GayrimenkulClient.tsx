"use client";

import React from "react";
import Link from "next/link";
import { Building2, ChevronRight, Hammer, Phone } from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";

export default function GayrimenkulClient() {
  const { contact, constructionApprovedScope, projects } = useGapsanStore();
  const approvedProjects = projects.filter((p) => p.status === "Yayında");

  return (
    <div>
      {/* Cover */}
      <section className="relative bg-[#111F35] text-white h-[320px] md:h-[380px] overflow-hidden">
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
              "linear-gradient(90deg, rgba(17,31,53,0.92) 0%, rgba(17,31,53,0.68) 55%, rgba(17,31,53,0.25) 100%)",
          }}
        />
        <div className="relative z-10 h-full gapsan-container flex flex-col justify-center">
          <h1 className="gapsan-h1 text-white max-w-[640px]">
            Gapşan Gayrimenkul
          </h1>
          <p className="mt-3 text-[16px] text-white/85 max-w-[560px]">
            Satılık ve kiralık taşınmaz seçenekleri ile işletme onaylı inşaat
            faaliyetleri tek çatı altında.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
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
              href={contact.units.gayrimenkul.phoneTel}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] border border-white/30 hover:bg-white/10 text-white font-semibold text-[15px]"
            >
              <Phone className="w-4 h-4 text-[#D6A948]" />
              <span>{contact.units.gayrimenkul.phoneDisplay}</span>
            </a>
          </div>
        </div>
        <span className="absolute bottom-3 right-5 z-10 text-[12px] italic text-white/85 bg-[#111F35]/60 px-2.5 py-0.5 rounded">
          Konsept görsel
        </span>
      </section>

      {/* Satılık / Kiralık Cards */}
      <section className="gapsan-container py-10 max-[768px]:py-7">
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
      <section className="gapsan-container pb-14">
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
    </div>
  );
}
