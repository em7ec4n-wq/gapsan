"use client";

import React from "react";
import Link from "next/link";
import { Hammer, ChevronLeft, ChevronRight } from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";

export default function ProjelerClient() {
  const { projects, constructionApprovedScope } = useGapsanStore();
  const approved = projects.filter((p) => p.status === "Yayında");

  return (
    <div className="gapsan-container py-10">
      <Link
        href="/gayrimenkul"
        className="inline-flex items-center gap-1 text-[14px] font-medium text-[#536174] hover:text-[#111F35] mb-3"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Gayrimenkul Sayfasına Dön</span>
      </Link>

      <h1 className="gapsan-h1 text-[#111F35]">İnşaat ve Projeler</h1>
      <p className="mt-3 text-[16px] text-[#536174] max-w-[700px]">
        {constructionApprovedScope}
      </p>

      <div className="mt-8">
        {approved.length === 0 ? (
          <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-8 text-center space-y-3">
            <Hammer className="w-10 h-10 text-[#D6A948] mx-auto" />
            <p className="font-semibold text-[16px] text-[#111F35]">
              Henüz yayında proje kaydı bulunmuyor.
            </p>
            <p className="text-[14px] text-[#536174]">
              Onaylanan inşaat projeleri bu sayfada yayınlanacaktır.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approved.map((p) => (
              <Link
                key={p.id}
                href={`/gayrimenkul/projeler/${p.slug}`}
                className="bg-white border border-[#E0E4EA] rounded-[10px] overflow-hidden hover:border-[#D6A948] transition-colors"
              >
                <div className="aspect-[4/3] bg-[#111F35]">
                  <img
                    src={
                      p.images[0] ||
                      "/assets/gapsan/gapsan-gayrimenkul-konsept.webp"
                    }
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-heading font-bold text-[18px] text-[#111F35]">
                    {p.title}
                  </h2>
                  <p className="mt-1 text-[13px] text-[#536174]">
                    {p.district} &bull; {p.scope}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[14px] font-semibold text-[#111F35]">
                    Projeyi İncele <ChevronRight className="w-4 h-4 text-[#D6A948]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
