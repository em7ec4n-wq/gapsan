import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Phone, Mail, ChevronRight } from "lucide-react";
import RequestBuilder from "@/components/RequestBuilder";
import { CONTACT_CONFIG } from "@/lib/gapsan-data";

export const metadata: Metadata = {
  title: "Sigorta | Trafik, Kasko ve Sağlık Sigortası",
  description:
    "GAPSAN Sigorta üzerinden Trafik, Kasko ve Sağlık sigortası teklif süreciniz için talep oluşturun.",
  alternates: {
    canonical: "/sigorta",
  },
  openGraph: {
    images: ["/assets/gapsan/gapsan-og-sigorta.webp"],
  },
};

export default function SigortaPage() {
  return (
    <div>
      {/* Cover */}
      <section className="relative bg-[#111F35] text-white h-[320px] md:h-[380px] overflow-hidden">
        <img
          src="/assets/gapsan/gapsan-sigorta-konsept.webp"
          alt="Gapşan Sigorta evrak kapağı"
          style={{ objectPosition: "65% 65%" }}
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
          <h1 className="gapsan-h1 text-white max-w-[600px]">Gapşan Sigorta</h1>
          <p className="mt-3 text-[16px] text-white/85 max-w-[540px]">
            Trafik, Kasko ve Sağlık sigortası talepleriniz doğrudan sigorta
            birim hattımıza iletilir.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="#sigorta-talep"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-semibold text-[15px]"
            >
              <span>Sigorta Talebi Oluştur</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href={CONTACT_CONFIG.units.sigorta.phoneTel}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] border border-white/30 hover:bg-white/10 text-white font-semibold text-[15px]"
            >
              <Phone className="w-4 h-4 text-[#D6A948]" />
              <span>{CONTACT_CONFIG.units.sigorta.phoneDisplay}</span>
            </a>
          </div>
        </div>
        <span className="absolute bottom-3 right-5 z-10 text-[12px] italic text-white/85 bg-[#111F35]/60 px-2.5 py-0.5 rounded">
          Konsept görsel
        </span>
      </section>

      {/* Approved Scope */}
      <section className="gapsan-container pt-10 pb-2">
        <h2 className="gapsan-h2 text-[#111F35] mb-6">
          Onaylı Sigorta Kapsamımız
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Trafik Sigortası",
              desc: "Zorunlu trafik sigortası teklif süreciniz için hızlı ön talep oluşturun.",
            },
            {
              title: "Kasko",
              desc: "Aracınıza uygun kasko seçenekleri için birimimizden bilgi alın.",
            },
            {
              title: "Sağlık Sigortası",
              desc: "Bireysel veya aile sağlık sigortası teklif sürecini başlatın.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white border border-[#E0E4EA] rounded-[10px] p-5 space-y-2"
            >
              <ShieldCheck className="w-6 h-6 text-[#D6A948]" aria-hidden="true" />
              <h3 className="font-heading font-bold text-[19px] text-[#111F35]">
                {item.title}
              </h3>
              <p className="text-[14px] text-[#536174] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white border border-[#E0E4EA] rounded-[10px] p-5 flex flex-wrap items-center justify-between gap-4 text-[14px] text-[#536174]">
          <span>
            Sigorta birimi e-posta:{" "}
            <a
              href={`mailto:${CONTACT_CONFIG.insuranceEmail}`}
              className="font-semibold text-[#111F35] hover:underline inline-flex items-center gap-1"
            >
              <Mail className="w-4 h-4 text-[#D6A948]" />
              {CONTACT_CONFIG.insuranceEmail}
            </a>
          </span>
          <span>
            Sigorta WhatsApp ve Telefon Hattı:{" "}
            <a
              href={CONTACT_CONFIG.units.sigorta.phoneTel}
              className="font-semibold text-[#111F35] hover:underline"
            >
              {CONTACT_CONFIG.units.sigorta.phoneDisplay}
            </a>
          </span>
        </div>
      </section>

      {/* Embedded RequestBuilder locked to Sigorta */}
      <Suspense
        fallback={
          <div className="gapsan-container py-10">
            <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-8 h-[240px]" />
          </div>
        }
      >
        <RequestBuilder
          initialArea="sigorta"
          lockedArea="sigorta"
          sectionId="sigorta-talep"
        />
      </Suspense>
    </div>
  );
}
