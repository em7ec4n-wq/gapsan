"use client";

import React from "react";
import { Award, ExternalLink, FileText } from "lucide-react";
import { OFFICIAL_CERTIFICATES } from "@/lib/gapsan-data";

export default function CertificatesGrid({
  filterCategory,
  title = "Resmi Yetki Belgelerimiz ve Mesleki Sertifikalarımız",
  subtitle = "T.C. İstanbul Valiliği Ticaret İl Müdürlüğü Yetki Belgeleri, MYK Seviye 5 Mesleki Yeterlilik ve Üniversite Onaylı Eğitim Sertifikaları",
}: {
  filterCategory?: "otomotiv" | "gayrimenkul";
  title?: string;
  subtitle?: string;
}) {
  const items = filterCategory
    ? OFFICIAL_CERTIFICATES.filter((c) => c.category === filterCategory)
    : OFFICIAL_CERTIFICATES;

  return (
    <section className="space-y-6" aria-label={title}>
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#111F35] text-[#D6A948] text-[12px] font-bold">
          <Award className="w-4 h-4" />
          <span>Resmi Yetki &amp; Yeterlilik Belgeleri</span>
        </div>
        <h2 className="gapsan-h2 text-[#111F35]">{title}</h2>
        <p className="text-[15px] text-[#536174] max-w-[780px]">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((cert) => (
          <article
            key={cert.id}
            className="bg-white border border-[#E0E4EA] rounded-[10px] overflow-hidden flex flex-col justify-between shadow-sm hover:border-[#D6A948] transition-colors"
          >
            <div>
              <a
                href={cert.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[4/3] bg-[#F7F5EF] border-b border-[#E0E4EA] p-3 overflow-hidden group"
              >
                <img
                  src={cert.previewImage}
                  alt={cert.title}
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded bg-[#111F35]/90 text-[#D6A948] text-[11px] font-semibold">
                  {cert.isPdf ? "Resmi PDF Belge" : "Onaylı Sertifika"}
                </span>
              </a>

              <div className="p-5 space-y-1.5">
                <p className="text-[12px] font-semibold text-[#D6A948] uppercase tracking-wide">
                  {cert.subtitle}
                </p>
                <h3 className="font-heading font-bold text-[17px] text-[#111F35] leading-snug">
                  {cert.title}
                </h3>
                <p className="text-[13px] font-medium text-[#182538]">
                  {cert.documentNo}
                </p>
                <p className="text-[12px] text-[#536174]">{cert.dateInfo}</p>
              </div>
            </div>

            <div className="px-5 pb-5">
              <a
                href={cert.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 rounded-[10px] bg-[#111F35] hover:bg-[#1b2e4b] text-white font-semibold text-[13px] transition-colors"
              >
                <FileText className="w-4 h-4 text-[#D6A948]" />
                <span>
                  {cert.isPdf
                    ? "PDF Belgeyi Görüntüle / İndir"
                    : "Sertifikayı Tam Boyut Aç"}
                </span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
