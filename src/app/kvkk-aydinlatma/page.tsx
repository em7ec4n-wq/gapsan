import React from "react";
import type { Metadata } from "next";
import { CONTACT_CONFIG } from "@/lib/gapsan-data";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "GAPSAN EML. İNŞ. OTOMOTİV SAN. VE TİC. LTD. ŞTİ. Kişisel Verilerin Korunması Kanunu (KVKK) aydınlatma metni.",
  alternates: { canonical: "/kvkk-aydinlatma" },
};

export default function KvkkAydinlatmaPage() {
  return (
    <div className="gapsan-container py-10 max-w-3xl">
      <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 md:p-8 space-y-5">
        <h1 className="gapsan-h1 text-[#111F35]">KVKK Aydınlatma Metni</h1>

        <p className="text-[15px] text-[#536174] leading-relaxed">
          6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca,
          veri sorumlusu sıfatıyla{" "}
          <strong className="text-[#111F35]">
            {CONTACT_CONFIG.companyLegalName}
          </strong>{" "}
          olarak kişisel verilerinizin güvenliğine önem veriyoruz.
        </p>

        <div className="space-y-4 text-[15px] text-[#182538] leading-relaxed">
          <div>
            <h2 className="font-heading font-bold text-[18px] text-[#111F35]">
              1. İşlenen Veriler ve Amaç
            </h2>
            <p className="mt-1 text-[#536174]">
              Talep oluşturucu üzerinden paylaştığınız iş kolu, talep türü,
              araç/taşınmaz tercihleri veya sigorta türü bilgileri yalnızca
              talebinizi ilgili birime (Otomotiv, Gayrimenkul veya Sigorta)
              iletmek ve ön bilgilendirme sağlamak amacıyla kullanılır. Ön talep
              aşamasında T.C. kimlik numarası, plaka veya sağlık verisi
              istenmez.
            </p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-[18px] text-[#111F35]">
              2. WhatsApp ve İletişim Geçişi
            </h2>
            <p className="mt-1 text-[#536174]">
              Onaylı birim hatlarında “WhatsApp ile İlet” seçeneğini
              kullandığınızda, hazırlanan talep özeti metni cihazınızda WhatsApp
              uygulamasına aktarılır; mesajı göndermeden önce içeriği
              inceleyip düzenleyebilirsiniz.
            </p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-[18px] text-[#111F35]">
              3. Başvuru Haklarınız
            </h2>
            <p className="mt-1 text-[#536174]">
              KVKK’nın 11. maddesi kapsamındaki taleplerinizi{" "}
              <a
                href={`mailto:${CONTACT_CONFIG.generalEmail}`}
                className="font-semibold text-[#111F35] underline"
              >
                {CONTACT_CONFIG.generalEmail}
              </a>{" "}
              adresine veya {CONTACT_CONFIG.address} adresimize yazılı olarak
              iletebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
