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

export interface ContactConfig {
  companyLegalName: string;
  address: string;
  mapsDirectionsUrl: string;
  generalPhoneDisplay: string;
  generalPhoneTel: string;
  generalEmail: string;
  insuranceEmail: string;
  units: {
    otomotiv: {
      phoneDisplay: string;
      phoneTel: string;
      whatsappNumber: string;
      whatsappApproved: boolean;
    };
    gayrimenkul: {
      phoneDisplay: string;
      phoneTel: string;
      whatsappNumber: string;
      whatsappApproved: boolean;
    };
    sigorta: {
      phoneDisplay: string;
      phoneTel: string;
      whatsappNumber: string;
      whatsappApproved: boolean;
    };
  };
}

export const SITE_URL = "https://gapsansirketlergrubu.com";

export const CONTACT_CONFIG: ContactConfig = {
  companyLegalName: "GAPSAN EML. İNŞ. OTOMOTİV SAN. VE TİC. LTD. ŞTİ.",
  address: "Üçevler, 906. Sk. No:1/A, Esenyurt/İstanbul",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=%C3%9C%C3%A7evler%2C%20906.%20Sk.%20No%3A1%2FA%2C%20Esenyurt%2F%C4%B0stanbul",
  generalPhoneDisplay: "0212 596 60 00",
  generalPhoneTel: "tel:+902125966000",
  generalEmail: "info@gapsansirketlergrubu.com",
  insuranceEmail: "gapsan@outlook.com",
  units: {
    otomotiv: {
      phoneDisplay: "0532 428 43 32",
      phoneTel: "tel:+905324284332",
      whatsappNumber: "905324284332",
      whatsappApproved: false,
    },
    gayrimenkul: {
      phoneDisplay: "0535 053 88 04",
      phoneTel: "tel:+905350538804",
      whatsappNumber: "905350538804",
      whatsappApproved: false,
    },
    sigorta: {
      phoneDisplay: "0533 059 88 04",
      phoneTel: "tel:+905330598804",
      whatsappNumber: "905330598804",
      whatsappApproved: true,
    },
  },
};

export const INITIAL_HERO_SLIDES: HeroSlideConfig[] = [
  {
    id: "slide-1",
    image: "/assets/gapsan/gapsan-otomotiv-konsept.webp",
    alt: "Gapşan Otomotiv galeri konsept görseli",
    heading: "Otomotiv, gayrimenkul ve sigorta",
    location: "Esenyurt, İstanbul",
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

/**
 * Separate demo dataset for the featured Passat record.
 * Price, km, damage, and stock details remain locked until publication approval.
 */
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

export const APPROVED_INSURANCE_TYPES = ["Trafik", "Kasko", "Sağlık"] as const;
export type InsuranceType = (typeof APPROVED_INSURANCE_TYPES)[number];

export const VEHICLE_REQUEST_TYPES = [
  "Araç alımı",
  "Araç satışı",
  "Takas",
] as const;
export type VehicleRequestType = (typeof VEHICLE_REQUEST_TYPES)[number];

export const REAL_ESTATE_REQUEST_TYPES = ["Satılık", "Kiralık"] as const;
export type RealEstateRequestType = (typeof REAL_ESTATE_REQUEST_TYPES)[number];
