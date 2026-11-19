"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Hammer } from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";

export default function ProjeDetailClient({ slug }: { slug: string }) {
  const { projects } = useGapsanStore();
  const project = projects.find(
    (p) => p.slug === slug && p.status === "Yayında"
  );

  if (!project) {
    return (
      <div className="gapsan-container py-16 text-center max-w-xl mx-auto">
        <Hammer className="w-12 h-12 text-[#D6A948] mx-auto mb-4" />
        <h1 className="font-heading font-bold text-[26px] text-[#111F35]">
          Proje Bulunamadı
        </h1>
        <p className="mt-2 text-[#536174]">
          Aradığınız proje yayında değil veya kaldırılmış olabilir.
        </p>
        <Link
          href="/gayrimenkul/projeler"
          className="mt-6 min-h-[44px] px-5 inline-flex items-center justify-center rounded-[10px] bg-[#111F35] text-white font-semibold text-[14px]"
        >
          Projelere Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="gapsan-container py-10">
      <Link
        href="/gayrimenkul/projeler"
        className="inline-flex items-center gap-1 text-[14px] font-medium text-[#536174] hover:text-[#111F35] mb-4"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Projelere Dön</span>
      </Link>
      <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 md:p-8 space-y-4">
        <h1 className="gapsan-h1 text-[#111F35]">{project.title}</h1>
        <p className="text-[14px] text-[#536174]">
          {project.district} &bull; {project.scope}
        </p>
        <p className="text-[16px] text-[#182538] leading-relaxed">
          {project.summary}
        </p>
      </div>
    </div>
  );
}
