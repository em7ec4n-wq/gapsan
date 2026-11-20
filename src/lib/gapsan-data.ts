export type PublishStatus = "Taslak" | "Onay bekliyor" | "Yayında" | "Arşiv";

export type BusinessArea = "otomotiv" | "gayrimenkul" | "sigorta";

export type ExpertiseStatus = "Orijinal" | "Lokal Boyalı" | "Boyalı" | "Değişen";

export const VEHICLE_PARTS = [
  { key: "kaput", label: "Motor Kaputu" },
  { key: "tavan", label: "Tavan" },
  { key: "bagaj", label: "Bagaj Kapağı" },
  { key: "solOnCamurluk", label: "Sol Ön Çamurluk" },
  { key: "solOnKapi", label: "Sol Ön Kapı" },
  { key: "solArkaKapi", label: "Sol Arka Kapı" },
  { key: "solArkaCamurluk", label: "Sol Arka Çamurluk" },
  { key: "sagOnCamurluk", label: "Sağ Ön Çamurluk" },
  { key: "sagOnKapi", label: "Sağ Ön Kapı" },
  { key: "sagArkaKapi", label: "Sağ Arka Kapı" },
  { key: "sagArkaCamurluk", label: "Sağ Arka Çamurluk" },
  { key: "onTampon", label: "Ön Tampon" },
  { key: "arkaTampon", label: "Arka Tampon" },
] as const;

export const DEFAULT_EXPERTISE_REPORT: Record<string, ExpertiseStatus> = {
  kaput: "Orijinal",
  tavan: "Orijinal",
  bagaj: "Orijinal",
  solOnCamurluk: "Orijinal",
  solOnKapi: "Orijinal",
  solArkaKapi: "Orijinal",
  solArkaCamurluk: "Orijinal",
  sagOnCamurluk: "Orijinal",
  sagOnKapi: "Orijinal",
  sagArkaKapi: "Orijinal",
  sagArkaCamurluk: "Orijinal",
  onTampon: "Orijinal",
  arkaTampon: "Orijinal",
};

export const VEHICLE_FEATURES_LIST = [
  "Senetli Satışa Uygun",
  "Takasa Uygun",
  "Ekspertiz Garantili",
  "Sunroof / Cam Tavan",
  "Geri Görüş Kamerası",
  "Park Sensörü",
  "Hız Sabitleyici",
  "Deri / Yarı Deri Koltuk",
  "CarPlay / Navigasyon",
  "LED / Xenon Far",
  "Çelik Jant",
  "Koltuk Isıtma",
  "Start / Stop",
  "Katlanır Ayna",
] as const;

export const REAL_ESTATE_FEATURES_LIST = [
  "Krediye Uygun",
  "Takasa Uygun",
  "Asansörlü",
  "Kapalı Otopark",
  "Açık Otopark",
  "Güvenlik / Site İçi",
  "Balkonlu / Teraslı",
  "EBEVEYN Banyolu",
  "Metro / Metrobüse Yakın",
  "Cadde Üzeri / Merkezi",
] as const;

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
  color?: string;
  km: number | null;
  price: string | null;
  damageInfo: string | null;
  tramerInfo?: string;
  expertiseReport?: Record<string, ExpertiseStatus>;
  expertiseNotes?: string;
  features?: string[];
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
  floor?: string;
  buildingAge?: string;
  heating?: string;
  deedStatus?: string;
  creditEligible?: boolean;
  features?: string[];
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

export const SITE_URL = "https://gapsangroup.com";

export const CONTACT_CONFIG: ContactConfig = {
  companyLegalName:
    "GAPSAN EMLAK İNŞAAT OTOMOTİV SANAYİ VE TİCARET LİMİTED ŞİRKETİ",
  founderName: "Harun ŞAN",
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
    heading: "Otomotiv, inşaat ve sigorta",
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
    alt: "Gapşan İnşaat konsept görseli",
    heading: "İnşaat ve satılık-kiralık gayrimenkul",
    ctaLabel: "İnşaatı İncele",
    ctaHref: "/insaat",
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

export const INITIAL_VEHICLE_LISTINGS: VehicleListing[] = [
  {
    id: "veh-demo-passat-2021",
    slug: "2021-volkswagen-passat-1-5-tsi-business-dsg",
    title: "2021 Volkswagen Passat 1.5 TSI Business DSG",
    brand: "Volkswagen",
    model: "Passat",
    year: 2021,
    transmission: "Otomatik",
    fuel: "Benzin",
    trim: "1.5 TSI Business",
    horsepower: "150 HP",
    color: "Metalik Gri",
    km: 64000,
    price: "1.685.000 TL",
    damageInfo: "Hatasız • Boyasız • Değişensiz",
    tramerInfo: "Tramer Kaydı Yok (0 TL)",
    expertiseReport: { ...DEFAULT_EXPERTISE_REPORT },
    expertiseNotes:
      "Aracımızın tüm kaporta aksamı orijinaldir. Motor, şanzıman ve yürüyen aksamı TSE belgeli kurumsal ekspertizden tam not almıştır. Yedek anahtarı ve kitapçıkları mevcuttur.",
    features: [
      "Senetli Satışa Uygun",
      "Takasa Uygun",
      "Ekspertiz Garantili",
      "Geri Görüş Kamerası",
      "Park Sensörü",
      "Hız Sabitleyici",
      "CarPlay / Navigasyon",
      "LED / Xenon Far",
      "Çelik Jant",
      "Start / Stop",
      "Katlanır Ayna",
    ],
    stockInfo: "Galeride Müsait",
    description:
      "GAPSAN Otomotiv Senetli Satış Merkezi güvencesiyle; 2021 model Volkswagen Passat 1.5 TSI Business DSG. Yetkili servis bakımlı, iç ve dış kozmetiği sıfır ayarındadır.\n\n%30 peşinatla banka kredisi veya %40 peşinatla kefilsiz, şartsız senetli taksit imkanıyla aynı gün noter devri yapılır. Mevcut aracınızla değerinde takas imkanı mevcuttur.",
    images: [
      "/assets/gapsan/gapsan-otomotiv-konsept.webp",
      "/assets/gapsan/gapsan-otomotiv-kart-konsept.webp",
    ],
    status: "Yayında",
    isAvailable: true,
    isExample: true,
    eidsVerified: true,
    authorizationVerified: true,
    sourceVerified: true,
    createdAt: "2026-11-20",
  },
  {
    id: "veh-demo-megane-2022",
    slug: "2022-renault-megane-1-3-tce-icon-edc",
    title: "2022 Renault Megane 1.3 TCe Icon EDC",
    brand: "Renault",
    model: "Megane",
    year: 2022,
    transmission: "Otomatik",
    fuel: "Benzin",
    trim: "1.3 TCe Icon",
    horsepower: "140 HP",
    color: "İnci Beyaz",
    km: 52000,
    price: "1.245.000 TL",
    damageInfo: "Değişensiz • 1 Parça Lokal Boya",
    tramerInfo: "Tramer Kaydı Yok (0 TL)",
    expertiseReport: {
      ...DEFAULT_EXPERTISE_REPORT,
      sagArkaCamurluk: "Lokal Boyalı",
    },
    expertiseNotes:
      "Sağ arka çamurlukta çizik kaynaklı el kadar lokal boya mevcuttur. Harici hatasız, boyasız ve değişensizdir. Şase, podye, direkler ve airbagler tamamen orijinaldir.",
    features: [
      "Senetli Satışa Uygun",
      "Takasa Uygun",
      "Ekspertiz Garantili",
      "Geri Görüş Kamerası",
      "Park Sensörü",
      "Hız Sabitleyici",
      "Deri / Yarı Deri Koltuk",
      "CarPlay / Navigasyon",
      "LED / Xenon Far",
      "Çelik Jant",
      "Start / Stop",
      "Katlanır Ayna",
    ],
    stockInfo: "Galeride Müsait",
    description:
      "En dolu paket olan Icon donanım. Hayalet ekran, büyük multimedya, yarı deri koltuklar, anahtarsız giriş ve çalıştırma mevcuttur.\n\nSenetli satışta ödemeye 3 ay sonra başlama avantajı ve erken kapamada faiz/vade farkı silinme garantisiyle GAPSAN Otomotiv'de.",
    images: [
      "/assets/gapsan/gapsan-otomotiv-kart-konsept.webp",
      "/assets/gapsan/gapsan-otomotiv-konsept.webp",
    ],
    status: "Yayında",
    isAvailable: true,
    isExample: true,
    eidsVerified: true,
    authorizationVerified: true,
    sourceVerified: true,
    createdAt: "2026-11-20",
  },
];

export const INITIAL_REAL_ESTATE_LISTINGS: RealEstateListing[] = [
  {
    id: "re-demo-satilik-3plus1",
    slug: "esenyurt-ucevler-torium-yakini-satilik-3-1-luks-daire",
    title: "Esenyurt Üçevler Torium Yakını Satılık 3+1 Lüks Daire",
    listingType: "Satılık",
    propertyType: "Daire",
    district: "Esenyurt",
    areaM2: 135,
    price: "3.650.000 TL",
    rooms: "3+1",
    floor: "3. Kat (Ara Kat)",
    buildingAge: "0 (Sıfır Bina)",
    heating: "Kombi (Doğalgaz)",
    deedStatus: "Kat Mülkiyetli (İskanlı)",
    creditEligible: true,
    features: [
      "Krediye Uygun",
      "Takasa Uygun",
      "Asansörlü",
      "Kapalı Otopark",
      "Balkonlu / Teraslı",
      "EBEVEYN Banyolu",
      "Metro / Metrobüse Yakın",
      "Cadde Üzeri / Merkezi",
    ],
    description:
      "GAPSAN İnşaat & Gayrimenkul güvencesiyle; Esenyurt Üçevler Mahallesi'nde, Torium AVM ve E-5 / Metrobüs hattına yürüme mesafesinde sıfır 3+1 geniş aile dairesi.\n\nİskanı alınmış, kat mülkiyetli tapusu hazır ve konut kredisine tam uygundur. Araç veya gayrimenkul takası değerlendirilir.",
    images: [
      "/assets/gapsan/gapsan-gayrimenkul-konsept.webp",
      "/assets/gapsan/gapsan-og-gayrimenkul.webp",
    ],
    status: "Yayında",
    isAvailable: true,
    isExample: true,
    eidsVerified: true,
    authorizationVerified: true,
    sourceVerified: true,
    createdAt: "2026-11-20",
  },
  {
    id: "re-demo-satilik-isyeri",
    slug: "esenyurt-pazaryolu-caddesi-satilik-kurumsal-kose-dukkan",
    title: "Esenyurt Pazaryolu Caddesi Satılık Yüksek Kira Getirili Köşe Dükkan",
    listingType: "Satılık",
    propertyType: "İş Yeri",
    district: "Esenyurt",
    areaM2: 180,
    price: "7.850.000 TL",
    rooms: "Düz Giriş + Asma Kat",
    floor: "Zemin / Cadde Giriş",
    buildingAge: "2",
    heating: "Klima / Doğalgaz",
    deedStatus: "Kat Mülkiyetli",
    creditEligible: true,
    features: [
      "Krediye Uygun",
      "Takasa Uygun",
      "Açık Otopark",
      "Metro / Metrobüse Yakın",
      "Cadde Üzeri / Merkezi",
    ],
    description:
      "Yaya ve araç trafiğinin en yoğun olduğu Pazaryolu Caddesi aksında, geniş vitrin cepheli, kurumsal kiracıya uygun 180 m² satılık ticari mağaza / dükkan.\n\nDeğerinde araç takası ve esnek ödeme kolaylığı ile GAPSAN İnşaat & Gayrimenkul portföyündedir.",
    images: [
      "/assets/gapsan/gapsan-og-gayrimenkul.webp",
      "/assets/gapsan/gapsan-gayrimenkul-konsept.webp",
    ],
    status: "Yayında",
    isAvailable: true,
    isExample: true,
    eidsVerified: true,
    authorizationVerified: true,
    sourceVerified: true,
    createdAt: "2026-11-20",
  },
  {
    id: "re-demo-kiralik-2plus1",
    slug: "esenyurt-merkez-metrobus-yakini-kiralik-2-1-arakat-daire",
    title: "Esenyurt Merkez Metrobüs Yakını Yeni Binada Kiralık 2+1 Daire",
    listingType: "Kiralık",
    propertyType: "Daire",
    district: "Esenyurt",
    areaM2: 105,
    price: "22.000 TL / Ay",
    rooms: "2+1",
    floor: "4. Kat",
    buildingAge: "3",
    heating: "Kombi (Doğalgaz)",
    deedStatus: "Kat Mülkiyetli",
    creditEligible: false,
    features: [
      "Asansörlü",
      "Kapalı Otopark",
      "Güvenlik / Site İçi",
      "Balkonlu / Teraslı",
      "Metro / Metrobüse Yakın",
    ],
    description:
      "Esenyurt merkezde, ulaşım araçlarına, okullara ve alışveriş merkezlerine yürüme mesafesinde, asansörlü ve kapalı otoparklı yeni binada ferah 2+1 kiralık daire.\n\nDairemiz boyalı, bakımlı ve hemen taşınmaya hazırdır.",
    images: ["/assets/gapsan/gapsan-gayrimenkul-konsept.webp"],
    status: "Yayında",
    isAvailable: true,
    isExample: true,
    eidsVerified: true,
    authorizationVerified: true,
    sourceVerified: true,
    createdAt: "2026-11-20",
  },
  {
    id: "re-demo-kiralik-isyeri",
    slug: "esenyurt-ucevler-caddede-kiralik-kurumsal-magaza-ofis",
    title: "Esenyurt Üçevler Ana Cadde Üzeri Kiralık Mağaza & Kurumsal Ofis",
    listingType: "Kiralık",
    propertyType: "İş Yeri",
    district: "Esenyurt",
    areaM2: 140,
    price: "48.000 TL / Ay",
    rooms: "3 Bölüm + WC/Mutfak",
    floor: "Zemin Giriş",
    buildingAge: "4",
    heating: "Kombi / Klima",
    deedStatus: "Kat Mülkiyetli",
    creditEligible: false,
    features: [
      "Açık Otopark",
      "Metro / Metrobüse Yakın",
      "Cadde Üzeri / Merkezi",
    ],
    description:
      "Üçevler Mahallesi ana cadde cepheli, tabela değeri yüksek, her türlü kurumsal mağaza, klinik, acente veya showroom kullanımına uygun 140 m² kiralık iş yeri.",
    images: ["/assets/gapsan/gapsan-og-gayrimenkul.webp"],
    status: "Yayında",
    isAvailable: true,
    isExample: true,
    eidsVerified: true,
    authorizationVerified: true,
    sourceVerified: true,
    createdAt: "2026-11-20",
  },
];

export const INITIAL_CONSTRUCTION_PROJECTS: ConstructionProject[] = [
  {
    id: "proj-demo-ucevler",
    slug: "gapsan-ucevler-konut-ve-ticari-yasam-projesi",
    title: "GAPSAN Üçevler Konut & Ticari Yaşam Projesi",
    district: "Esenyurt / İstanbul",
    scope: "Modern Konut & Cadde Mağaza Geliştirme",
    summary:
      "Deprem yönetmeliğine tam uyumlu, C35 beton ve radye temel sistemiyle inşa edilen; kapalı otoparklı, asansörlü 2+1 ve 3+1 aile daireleri ile zemin kat ticari mağazalardan oluşan prestijli yaşam projesi.",
    images: ["/assets/gapsan/gapsan-gayrimenkul-konsept.webp"],
    status: "Yayında",
  },
];

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
