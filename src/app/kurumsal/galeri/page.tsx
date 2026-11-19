import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import CertificatesGrid from "@/components/CertificatesGrid";
import {
  CONTACT_CONFIG,
  FINANCE_PARTNERS,
  INSURANCE_PARTNERS,
  SAVINGS_FINANCE_PARTNERS,
} from "@/lib/gapsan-data";

export const metadata: Metadata = {
  title: "Kurumsal Galeri & Senetli Satış Merkezi Tanıtımı",
  description:
    "GAPSAN Otomotiv Senetli Satış Merkezi, İnşaat & Gayrimenkul, Sigorta tanıtım rehberi ve resmi yetki belgeleri galerisi.",
  alternates: { canonical: "/kurumsal/galeri" },
  openGraph: {
    images: ["/assets/gapsan/gapsan-og-genel.webp"],
  },
};

export default function KurumsalGaleriPage() {
  return (
    <div className="gapsan-container py-10 space-y-10">
      <div>
        <Link
          href="/kurumsal"
          className="inline-flex items-center gap-1 text-[14px] font-medium text-[#536174] hover:text-[#111F35] mb-3"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kurumsal Sayfasına Dön</span>
        </Link>
        <h1 className="gapsan-h1 text-[#111F35]">
          Kurumsal Galeri &amp; Hizmet Rehberi
        </h1>
        <p className="mt-2 text-[16px] text-[#536174]">
          0’ Kilometre ve 2. Elde Güvenilir Adres &bull; 2010 Yılından Bu Yana
          Güvenle...
        </p>
      </div>

      {/* Kurumsal Tabela ve Afiş Görselleri */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 bg-white border border-[#E0E4EA] rounded-[10px] p-5 flex flex-col items-center text-center space-y-3">
          <img
            src="/assets/gapsan/belgeler/gapsan-kurumsal-afis.jpg"
            alt="GAPSAN İnşaat Otomotiv Sigorta Kurumsal Afişi"
            className="w-full max-w-[520px] h-auto rounded-[10px] object-contain mx-auto border border-[#E0E4EA]"
          />
          <p className="text-[15px] font-bold text-[#111F35]">
            GAPSAN Şirketler Grubu Faaliyet Alanları ve Anlaşmalı Sigorta
            Şirketleri
          </p>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-5 flex flex-col items-center text-center">
            <img
              src="/assets/gapsan/gapsan-kurumsal-tabela.webp"
              alt="GAPSAN kurumsal tabela detayı"
              className="w-full max-w-[480px] h-auto rounded-[10px] object-contain mx-auto"
            />
            <p className="mt-3 text-[14px] font-semibold text-[#111F35]">
              GAPSAN Kurumsal Tabela Detayı
            </p>
            <p className="text-[13px] text-[#536174]">
              {CONTACT_CONFIG.address}
            </p>
          </div>

          {/* İnş. Gayrimenkul ve Sigorta Özet Блок */}
          <div className="bg-[#111F35] text-white rounded-[10px] p-6 space-y-4">
            <div>
              <span className="text-[12px] font-extrabold text-[#D6A948] uppercase">
                İNŞ. GAYRİMENKUL (Yetki Belge No: 3410913)
              </span>
              <h2 className="font-heading font-bold text-[20px] text-white mt-1">
                Evinizi GAPSAN ile Alın &bull; Kolay ve Hızlı Konut Sahibi Olun
              </h2>
              <p className="mt-1.5 text-[14px] text-white/85 leading-relaxed">
                Sizin ev ihtiyacınızı biz tamamlamak için buradayız. Her bütçeye
                uygun konutlarımızla sizleri ev sahibi yapıyoruz. Satmak
                istediğiniz konutunuzu profesyonel satış ekibimiz ile değerinde
                ve hızlı satalım.
              </p>
            </div>

            <div className="pt-4 border-t border-white/15">
              <span className="text-[12px] font-extrabold text-[#D6A948] uppercase">
                GAPSAN SİGORTA ({INSURANCE_PARTNERS.length} Anlaşmalı Sigorta
                Şirketi)
              </span>
              <h2 className="font-heading font-bold text-[20px] text-white mt-1">
                İçiniz Rahat Olsun, Her Alanda Güvence Altındasınız
              </h2>
              <p className="mt-1.5 text-[14px] text-white/85 leading-relaxed">
                Kasko, Trafik, DASK (DSK) ve Sağlık Sigortalarınızı tek bir
                adresten, iyi fiyat garantisiyle alın. 7/24 müşteri hizmetleri
                hizmetinizde. Bize sormadan teklif almayın!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* GAPSAN OTOMOTİV SENETLİ SATIŞ MERKEZİ TAM METİN */}
      <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 md:p-8 space-y-6">
        <div className="border-b border-[#E0E4EA] pb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded bg-[#111F35] text-[#D6A948] text-[12px] font-bold mb-2">
              0’ KİLOMETRE VE 2. ELDE GÜVENİLİR ADRES
            </span>
            <h2 className="gapsan-h2 text-[#111F35]">
              GAPSAN OTOMOTİV SENETLİ SATIŞ MERKEZİ
            </h2>
            <p className="mt-1 text-[15px] font-semibold text-[#536174]">
              2010 Yılından Bu Yana Güvenle... &bull; İkinci El Motorlu Kara
              Taşıtı Yetki Belge No: 340 6225
            </p>
          </div>
          <a
            href={`https://wa.me/905324284332?text=${encodeURIComponent(
              "Merhaba Gapşan Otomotiv, senetli satış ve kredi koşullarınız hakkında bilgi almak istiyorum."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-5 inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#D6A948] text-[#111F35] font-semibold text-[14px]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Kredi Hattı: 0532 428 43 32</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[14px] text-[#182538] leading-relaxed">
          <div className="p-5 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] space-y-2">
            <h3 className="font-heading font-bold text-[17px] text-[#111F35] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D6A948]" />
              GAPSAN OTOMOTİV GÜVENCESİ
            </h3>
            <p className="text-[#536174]">
              Müşteri Memnuniyeti ve Güvenilir Ticaret Anlayışımız gereği;{" "}
              <strong>
                Ağır hasar kayıtlı, şase işlemli, podye işlemli, airbag açmış
                veya işlem görmüş ve kilometresi ile oynanmış araçların alım ve
                satımını kesinlikle yapmıyoruz.
              </strong>
            </p>
          </div>

          <div className="p-5 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] space-y-2">
            <h3 className="font-heading font-bold text-[17px] text-[#111F35]">
              ÇALIŞMA SAATLERİ VE NOTER &bull; 30 DAKİKADA KREDİNİZ HAZIR
            </h3>
            <p className="text-[#536174]">
              <strong>Hafta sonu noter hizmeti:</strong> Cumartesi ve Pazar
              günleri noter satışı yapılmaktadır. Pazar günleri{" "}
              <strong>11:00 - 17:00</strong> saatleri arasında hizmet
              vermekteyiz. Kimlik bilgilerinizle anında 30 dakikada krediniz
              hazır; kredi işlemlerinizi kendi satış ofisimizde hızlı ve kolay
              bir şekilde gerçekleştiriyoruz.
            </p>
          </div>

          <div className="p-5 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] space-y-2">
            <h3 className="font-heading font-bold text-[17px] text-[#111F35]">
              KEFİLSİZ VE ŞARTSIZ ALIM FIRSATI &bull; KREDİ KARTI İLE ÖDEME
            </h3>
            <p className="text-[#536174]">
              Kredi skoru ne olursa olsun, kefilsiz ve şartsız olarak{" "}
              <strong>%30 peşinatla</strong>, <strong>2.69’dan başlayan</strong>{" "}
              avantajlı oranlar ve <strong>36 aya varan vade</strong>{" "}
              seçenekleri sunuyoruz. Tüm kredi kartlarına{" "}
              <strong>12 aya varan taksit</strong> mevcuttur; araç peşinatınızı
              veya aylık senet taksitlerinizi kredi kartıyla ödeyebilirsiniz.
            </p>
          </div>

          <div className="p-5 rounded-[10px] bg-[#111F35] text-white space-y-2">
            <h3 className="font-heading font-bold text-[17px] text-[#D6A948]">
              ÖNE ÇIKAN KAMPANYAMIZ: ŞİMDİ AL, 3 AY SONRA ÖDE!
            </h3>
            <p className="text-white/90">
              Senetli taksitli satışlarımızda geçerli olan bu özel kampanya ile
              aracınızı bugün teslim alın, ödemelerinize tam{" "}
              <strong>3 ay sonra</strong> başlayın. Peşinat ödemenizi takiben,
              ilk taksitiniz için 3 aylık bir erteleme fırsatından yararlanın.
            </p>
          </div>

          <div className="p-5 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] space-y-2">
            <h3 className="font-heading font-bold text-[17px] text-[#111F35]">
              KKB PUANINIZA GÖRE AVANTAJLI TEKLİFLER &amp; TİCARİ KREDİ
            </h3>
            <ul className="text-[#536174] space-y-1">
              <li>
                &bull; <strong>1500 ve Üzeri KKB Puanı:</strong> Müşterilerimize
                özel <strong>PEŞİNATSIZ</strong> ve 24 aya varan vade imkanı.
              </li>
              <li>
                &bull; <strong>1250 ve Üzeri KKB Puanı:</strong> Sadece{" "}
                <strong>%20 peşinatla</strong> aracınıza sahip olma fırsatı.
              </li>
              <li>
                &bull; <strong>Ticari Müşterilerimize Özel Kredi:</strong> Vergi
                levhalı müşterilerimiz ve şirketler için aracın kasko değerinin{" "}
                <strong>%90’ına kadar</strong> ticari taşıt kredisi (Maksimum 36
                ay vade ile).{" "}
                <strong>Firmamızın Kısa Vadeli Çek ile araç satışı vardır.</strong>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-[10px] bg-[#F7F5EF] border border-[#E0E4EA] space-y-2">
            <h3 className="font-heading font-bold text-[17px] text-[#111F35]">
              ESNEK ÖDEME VE TAKAS KOLAYLIĞI
            </h3>
            <p className="text-[#536174]">
              <strong>Erken Kapama Avantajı:</strong> Borcunuzu dilediğiniz
              zaman erken ödeyebilir veya tamamen kapatabilirsiniz. Bu durumda,
              geriye kalan ayların tüm vade farkı silinir.{" "}
              <strong>Değişim ve Takas:</strong> Borcunuz devam ederken mevcut
              aracınızı bize geri satabilir veya takas yoluyla model
              yükseltebilir ya da düşürebilirsiniz.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-[10px] bg-white border border-[#E0E4EA] space-y-3">
          <h3 className="font-heading font-bold text-[18px] text-[#111F35]">
            NEDEN GAPSAN OTOMOTİV? (Kurumsal Hizmet ve Güvence)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[14px] text-[#536174]">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D6A948] shrink-0 mt-1" />
              <span>
                <strong className="text-[#111F35]">Banka Güvencesi:</strong> Tüm
                senetli satışlarımız kurumsal bir altyapı ve banka tasdiki ile
                yapılır. Yaptığınız peşinat ödemesi ve tüm taksitleriniz banka
                güvencesi altındadır.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D6A948] shrink-0 mt-1" />
              <span>
                <strong className="text-[#111F35]">
                  Kredi Limitleriniz Etkilenmez:
                </strong>{" "}
                Yaptığınız taksitli alım, mevcut banka kredi limitlerinizi
                etkilemez ve kredi sicilinizde (Findeks) görünmez.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D6A948] shrink-0 mt-1" />
              <span>
                <strong className="text-[#111F35]">Hızlı Teslimat:</strong>{" "}
                Başvurunuzun onaylandığı aynı gün içerisinde noter devir
                işlemleriniz tamamlanır ve aracınız size teslim edilir.
              </span>
            </p>
          </div>

          <div className="pt-3 border-t border-[#E0E4EA] flex flex-wrap items-center justify-between gap-4 text-[13px] text-[#536174]">
            <div>
              <strong className="text-[#111F35]">
                Güçlü Finans Ortaklarımız:
              </strong>{" "}
              {FINANCE_PARTNERS.join(", ")}
            </div>
            <div>
              <strong className="text-[#111F35]">
                Faizsiz Tasarruf Finansmanı:
              </strong>{" "}
              {SAVINGS_FINANCE_PARTNERS.join(", ")}
            </div>
          </div>
        </div>
      </div>

      {/* Resmi Yetki Belgeleri ve Sertifikalarımız */}
      <CertificatesGrid />
    </div>
  );
}
