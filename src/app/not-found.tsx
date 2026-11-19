import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="gapsan-container py-20 text-center max-w-lg mx-auto">
      <p className="font-heading font-extrabold text-[64px] leading-none text-[#D6A948]">
        404
      </p>
      <h1 className="mt-4 font-heading font-bold text-[28px] text-[#111F35]">
        Sayfa Bulunamadı
      </h1>
      <p className="mt-2 text-[15px] text-[#536174]">
        Aradığınız sayfa taşınmış veya yayından kaldırılmış olabilir.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="min-h-[44px] px-6 inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#111F35] hover:bg-[#1b2e4b] text-white font-semibold text-[15px]"
        >
          <span>Ana Sayfaya Dön</span>
          <ChevronRight className="w-4 h-4 text-[#D6A948]" />
        </Link>
      </div>
    </div>
  );
}
