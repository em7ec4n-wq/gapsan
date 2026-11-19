export type PublishStatus = "Taslak" | "Onay bekliyor" | "Yayında" | "Arşiv";

export type BusinessArea = "otomotiv" | "gayrimenkul" | "sigorta";

export interface VehicleListing {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  year: number | null;
  transmission: "Otomatik" | "Manuel" | "Yarı Otomatik" | "";
  fuel: string;
  trim: string;
  horsepower: string;
  km: number | null;
  price: string | null;
  damageInfo: string | null;
  stockInfo: string | null;
  description: string;
  images: string[];
  status: PublishStatus;
  isAvailable: boolean;
  isExample?: boolean;
  eidsVerified: boolean;
  authorizationVerified: boolean;
  sourceVerified: boolean;
  createdAt: string;
}

export interface RealEstateListing {
  id: string;
  slug: string;
  title: string;
  listingType: "Satılık" | "Kiralık";
  propertyType: "Daire" | "İş Yeri" | "Arsa" | "Villa" | "Bina";
  district: string;
  areaM2: number | null;
  price: string | null;
  rooms: string;
  description: string;
  images: string[];
  status: PublishStatus;
  isAvailable: boolean;
  isExample?: boolean;
  eidsVerified: boolean;
  authorizationVerified: boolean;
  sourceVerified: boolean;
  createdAt: string;
}

export interface ConstructionProject {
  id: string;
  slug: string;
  title: string;
  district: string;
  scope: string;
  summary: string;
  images: string[];
  status: PublishStatus;
}

export interface CustomerReview {
  id: string;
  author: string;
  area: "Otomotiv" | "Gayrimenkul" | "Sigorta";
  comment: string;
  verifiedMatch: boolean;
  publishPermission: boolean;
  status: PublishStatus;
  /** Private verification record — never exposed on public pages */
  privateVerificationRef: string;
}

export interface HeroSlideConfig {
  id: string;
  image: string;
  alt: string;
  heading: string;
  location?: string;
  ctaLabel: string;
  ctaHref: string;
  desktopFocus: string;
  mobileFocus: string;
  conceptLabel: string;
}

export interface OfficialCertificate {
  id: string;
  title: string;
  subtitle: string;
  documentNo: string;
  dateInfo: string;
  category: "otomotiv" | "gayrimenkul" | "kurumsal";
  previewImage: string;
  fileUrl: string;
  isPdf: boolean;
}

export interface ContactConfig {
  companyLegalName: string;
  founderName: string;
  officialWebsiteUrl: string;
  mersisNo: string;
  otomotivYetkiBelgeNo: string;
  tasinmazYetkiBelgeNo: string;
  address: string;
  mapsDirectionsUrl: string;
  generalPhoneDisplay: string;
  generalPhoneTel: string;
  generalEmail: string;
  insuranceEmail: string;
  otomotivEmail: string;
  gayrimenkulEmail: string;
  emails: {
    general: string;
    sigorta: string;
    otomotiv: string;
    gayrimenkul: string;
  };
  socialMedia: {
    facebook: string;
    instagramOtomotiv: string;
    instagramGayrimenkul: string;
    tiktokOtomotiv: string;
    tiktokGayrimenkul: string;
    whatsappChannel: string;
  };
  units: {
    otomotiv: {
      phoneDisplay: string;
      phoneTel: string;
      whatsappNumber: string;
      whatsappApproved: boolean;
      email: string;
    };
    gayrimenkul: {
      phoneDisplay: string;
      phoneTel: string;
      whatsappNumber: string;
      whatsappApproved: boolean;
      email: string;
    };
    sigorta: {
      phoneDisplay: string;
      phoneTel: string;
      whatsappNumber: string;
      whatsappApproved: boolean;
      email: string;
    };
  };
}

export const SITE_URL = "https://gapsansirketlergrubu.com";

export const CONTACT_CONFIG: ContactConfig = {
  companyLegalName:
    "GAPSAN EMLAK İNŞAAT OTOMOTİV SANAYİ VE TİCARET LİMİTED ŞİRKETİ",
  founderName: "Harun ŞAN",
  officialWebsiteUrl: "https://www.gapsanticaret.com.tr/",
  mersisNo: "0389188848300001",
  otomotivYetkiBelgeNo: "3406225",
  tasinmazYetkiBelgeNo: "3410913",
  address: "Üçevler Mah. 906. Sk. No:1/A, Esenyurt/İstanbul",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=%C3%9C%C3%A7evler%20Mah.%20906.%20Sk.%20No%3A1%2FA%2C%20Esenyurt%2F%C4%B0stanbul",
  generalPhoneDisplay: "0212 596 60 00",
  generalPhoneTel: "tel:+902125966000",
  generalEmail: "gapsan@outlook.com.tr",
  insuranceEmail: "gapsansigorta@hotmail.com",
  otomotivEmail: "gapsanotomotiv@hotmail.com",
  gayrimenkulEmail: "gapsangayrimenkul@hotmail.com",
  emails: {
    general: "gapsan@outlook.com.tr",
    sigorta: "gapsansigorta@hotmail.com",
    otomotiv: "gapsanotomotiv@hotmail.com",
    gayrimenkul: "gapsangayrimenkul@hotmail.com",
  },
  socialMedia: {
    facebook: "https://www.facebook.com/share/1EJ9CaU444/?mibextid=wwXlfr",
    instagramOtomotiv:
      "https://www.instagram.com/gapsanotomotiv?avpt=MWhvM2k0cnBrODlzaA%3D%3D&utm_source=qr",
    instagramGayrimenkul:
      "https://www.instagram.com/gapsangayrimenkul?knvt=NzhtY3dvbGYwdDY0&utm_source=qr",
    tiktokOtomotiv:
      "https://www.tiktok.com/@gapsanotomotiv?_r=1&_t=ZS-9BWvcauVHiW",
    tiktokGayrimenkul:
      "https://www.tiktok.com/@gapsangayrimenkul?_r=1&_t=ZS-9BWvfjFnFgb",
    whatsappChannel:
      "https://whatsapp.com/channel/0029VbDGBEN0AgWJEM4whn1Q",
  },
  units: {
    otomotiv: {
      phoneDisplay: "0532 428 43 32",
      phoneTel: "tel:+905324284332",
      whatsappNumber: "905324284332",
      whatsappApproved: true,
      email: "gapsanotomotiv@hotmail.com",
    },
    gayrimenkul: {
      phoneDisplay: "0535 053 88 04",
      phoneTel: "tel:+905350538804",
      whatsappNumber: "905350538804",
      whatsappApproved: true,
      email: "gapsangayrimenkul@hotmail.com",
    },
    sigorta: {
      phoneDisplay: "0533 059 88 04",
      phoneTel: "tel:+905330598804",
      whatsappNumber: "905330598804",
      whatsappApproved: true,
      email: "gapsansigorta@hotmail.com",
    },
  },
};

export const OFFICIAL_CERTIFICATES: OfficialCertificate[] = [
  {
    id: "cert-otomotiv-yetki",
    title: "İkinci El Motorlu Kara Taşıtı Ticareti Yetki Belgesi",
    subtitle: "T.C. İstanbul Valiliği Ticaret İl Müdürlüğü",
    documentNo: "Yetki Belge No: 3406225 • MERSİS: 0389188848300001",
    dateInfo: "Düzenlenme Tarihi: 29.08.2024",
    category: "otomotiv",
    previewImage: "/assets/gapsan/belgeler/otomotiv-yetki-belgesi.pdf.png",
    fileUrl: "/assets/gapsan/belgeler/otomotiv-yetki-belgesi.pdf",
    isPdf: true,
  },
  {
    id: "cert-tasinmaz-yetki",
    title: "Taşınmaz Ticareti Yetki Belgesi",
    subtitle: "T.C. İstanbul Valiliği Ticaret İl Müdürlüğü",
    documentNo: "Yetki Belge No: 3410913 • MERSİS: 0389188848300001",
    dateInfo: "Düzenlenme Tarihi: 15.05.2024",
    category: "gayrimenkul",
    previewImage: "/assets/gapsan/belgeler/tasinmaz-yetki-belgesi.pdf.png",
    fileUrl: "/assets/gapsan/belgeler/tasinmaz-yetki-belgesi.pdf",
    isPdf: true,
  },
  {
    id: "cert-otomotiv-seviye5",
    title: "Motorlu Kara Taşıtları Alım Satım Sorumlusu (Seviye 5)",
    subtitle: "MASFED MYM Mesleki Yeterlilik Belgesi — Harun ŞAN",
    documentNo: "Belge No: YB0108/17UY0299-5/00/13886",
    dateInfo: "TÜRKAK & MYK Akrediteli",
    category: "otomotiv",
    previewImage: "/assets/gapsan/belgeler/otomotiv-seviye-5.jpg",
    fileUrl: "/assets/gapsan/belgeler/otomotiv-seviye-5.jpg",
    isPdf: false,
  },
  {
    id: "cert-emlak-seviye5",
    title: "Sorumlu Emlak Danışmanı (Seviye 5)",
    subtitle: "FSM Belgelendirme Mesleki Yeterlilik Belgesi — Harun ŞAN",
    documentNo: "Belge No: YB0157/17UY0333-5/00/8308",
    dateInfo: "Geçerlilik: 03.03.2023 – 02.03.2028",
    category: "gayrimenkul",
    previewImage: "/assets/gapsan/belgeler/emlak-seviye-5.jpg",
    fileUrl: "/assets/gapsan/belgeler/emlak-seviye-5.jpg",
    isPdf: false,
  },
  {
    id: "cert-otomotiv-egitim",
    title: "Oto Alım Satım Eğitimi Kurs Bitirme Belgesi (120 Saat)",
    subtitle: "Fatih Sultan Mehmet Vakıf Üniversitesi Sürekli Eğitim Merkezi",
    documentNo: "Barkod No: UN_041054206652741583175 — Harun ŞAN",
    dateInfo: "Tanzim Tarihi: 15.02.2023",
    category: "otomotiv",
    previewImage: "/assets/gapsan/belgeler/otomotiv-egitim-belgesi.pdf.png",
    fileUrl: "/assets/gapsan/belgeler/otomotiv-egitim-belgesi.pdf",
    isPdf: true,
  },
  {
    id: "cert-emlak-egitim",
    title: "Emlak Danışmanlığı Eğitimi Kurs Bitirme Belgesi (120 Saat)",
    subtitle: "Fatih Sultan Mehmet Vakıf Üniversitesi Sürekli Eğitim Merkezi",
    documentNo: "Barkod No: UN_041054206652741581677 — Harun ŞAN",
    dateInfo: "Tanzim Tarihi: 15.02.2023",
    category: "gayrimenkul",
    previewImage: "/assets/gapsan/belgeler/emlak-egitim-belgesi.pdf.png",
    fileUrl: "/assets/gapsan/belgeler/emlak-egitim-belgesi.pdf",
    isPdf: true,
  },
];

export const FINANCE_PARTNERS = [
  "ALJ Finans",
  "Koç Finans",
  "Aktif Bank",
  "TEB Cetelem",
  "Burgan Bank",
  "Türkiye Finans",
  "Yapı Kredi",
] as const;

export const SAVINGS_FINANCE_PARTNERS = [
  "Birevim",
  "Katılımevim",
  "FuzulEv",
  "Birikimevim",
] as const;

export const INSURANCE_PARTNERS = [
  "AXA Sigorta",
  "Anadolu Sigorta",
  "AKSigorta",
  "Allianz",
  "Quick Sigorta",
  "Zurich Sigorta",
  "Türkiye Sigorta",
  "Sompo Sigorta",
  "Prive Sigorta",
  "Ray Sigorta",
  "AcnTURK Sigorta",
  "Unico Sigorta",
  "Türk Nippon Sigorta",
  "Acıbadem Sigorta",
  "Arex Sigorta",
  "Aveon Sigorta",
  "Demir Sigorta",
  "Corpus Sigorta",
  "Generali Sigorta",
  "Hepiyi Sigorta",
  "Neova Sigorta",
  "Orient Sigorta",
  "Magdeburger Sigorta",
  "HDI Sigorta",
  "Atlas Mutuel Sigorta",
  "Koru Sigorta",
  "Ankara Sigorta",
] as const;

export const INITIAL_HERO_SLIDES: HeroSlideConfig[] = [
  {
    id: "slide-1",
    image: "/assets/gapsan/gapsan-otomotiv-konsept.webp",
    alt: "Gapşan Otomotiv galeri konsept görseli",
    heading: "Otomotiv, gayrimenkul ve sigorta",
    location: "Esenyurt, İstanbul • 2010'dan Bu Yana Güvenle",
    ctaLabel: "Talep Oluştur",
    ctaHref: "/#talep",
    desktopFocus: "72% 55%",
    mobileFocus: "68% 65%",
    conceptLabel: "Konsept görsel",
  },
  {
    id: "slide-2",
    image: "/assets/gapsan/gapsan-gayrimenkul-konsept.webp",
    alt: "Gapşan Gayrimenkul apartman cephesi konsept görseli",
    heading: "Satılık ve kiralık gayrimenkul",
    ctaLabel: "Gayrimenkulü İncele",
    ctaHref: "/gayrimenkul",
    desktopFocus: "65% 50%",
    mobileFocus: "68% 62%",
    conceptLabel: "Konsept görsel",
  },
  {
    id: "slide-3",
    image: "/assets/gapsan/gapsan-sigorta-konsept.webp",
    alt: "Gapşan Sigorta evrakları konsept görseli",
    heading: "Sigorta talebinizi iletin",
    ctaLabel: "Sigorta Talebi Oluştur",
    ctaHref: "/sigorta#sigorta-talep",
    desktopFocus: "65% 50%",
    mobileFocus: "65% 65%",
    conceptLabel: "Konsept görsel",
  },
];

export const DEMO_VEHICLE_LISTING: VehicleListing = {
  id: "demo-passat-1347951505",
  slug: "2017-volkswagen-passat-1347951505",
  title: "2017 Volkswagen Passat",
  brand: "Volkswagen",
  model: "Passat",
  year: 2017,
  transmission: "Otomatik",
  fuel: "1.6 Dizel",
  trim: "Trendline",
  horsepower: "120 hp",
  km: null,
  price: null,
  damageInfo: null,
  stockInfo: null,
  description:
    "1.6 dizel, otomatik, Trendline donanım ve 120 hp motor özellikleriyle öne çıkan örnek araç kaydı. Fiyat, kilometre, hasar ve stok bilgileri işletme onayı sonrası yayınlanır.",
  images: ["/assets/gapsan/gapsan-ilan-siluet.png"],
  status: "Onay bekliyor",
  isAvailable: true,
  isExample: true,
  eidsVerified: false,
  authorizationVerified: false,
  sourceVerified: false,
  createdAt: "2026-11-18",
};

export const INITIAL_VEHICLE_LISTINGS: VehicleListing[] = [];
export const INITIAL_REAL_ESTATE_LISTINGS: RealEstateListing[] = [];
export const INITIAL_CONSTRUCTION_PROJECTS: ConstructionProject[] = [];
export const INITIAL_REVIEWS: CustomerReview[] = [];

export const APPROVED_INSURANCE_TYPES = [
  "Trafik",
  "Kasko",
  "DASK (DSK)",
  "Sağlık",
] as const;
export type InsuranceType = (typeof APPROVED_INSURANCE_TYPES)[number];

export const VEHICLE_REQUEST_TYPES = [
  "Araç alımı",
  "Araç satışı",
  "Takas",
  "Senetli / Kredili Araç Başvurusu",
] as const;
export type VehicleRequestType = (typeof VEHICLE_REQUEST_TYPES)[number];

export const REAL_ESTATE_REQUEST_TYPES = ["Satılık", "Kiralık"] as const;
export type RealEstateRequestType = (typeof REAL_ESTATE_REQUEST_TYPES)[number];
