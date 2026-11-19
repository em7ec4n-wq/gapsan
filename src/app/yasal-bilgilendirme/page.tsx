import React from "react";
import type { Metadata } from "next";
import { CONTACT_CONFIG } from "@/lib/gapsan-data";

export const metadata: Metadata = {
  title: "Yasal Bilgilendirme",
  description: "GAPSAN Şirketler Grubu yasal bilgilendirme ve sorumluluk metni.",
  alternates: { canonical: "/yasal-bilgilendirme" },
};

export default function YasalBilgilendirmePage() {
  return (
    <div className="gapsan-container py-10 max-w-3xl">
      <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 md:p-8 space-y-5">
        <h1 className="gapsan-h1 text-[#111F35]">Yasal Bilgilendirme</h1>

        <div className="p-4 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] text-[15px] text-[#182538] leading-relaxed">
          Bu site <strong>{CONTACT_CONFIG.companyLegalName}</strong> tarafından
          işletilmektedir. İlan, hizmet ve fiyat talepleri işletmenin ilgili
          birimine iletilir. İlay Ajans sitenin tasarım ve geliştirme hizmetini
          sağlar. İşletmenin ve İlay Ajans’ın kendi faaliyetlerinden doğan
          yasal yükümlülükleri saklıdır.
        </div>

        <div className="space-y-3 text-[15px] text-[#536174] leading-relaxed">
          <p>
            <strong>Ticari Unvan:</strong> {CONTACT_CONFIG.companyLegalName}
          </p>
          <p>
            <strong>Adres:</strong> {CONTACT_CONFIG.address}
          </p>
          <p>
            <strong>Genel İletişim:</strong>{" "}
            {CONTACT_CONFIG.generalPhoneDisplay} &bull;{" "}
            {CONTACT_CONFIG.generalEmail}
          </p>
          <p>
            Bu sitede yer alan tüm ilan, proje ve sigorta içerikleri işletme
            onayı ve ilgili mevzuat (EİDS ve yetki doğrulaması dahil) kapsamı
            doğrultusunda yayınlanır.
          </p>
        </div>
      </div>
    </div>
  );
}
