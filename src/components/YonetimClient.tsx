"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Lock,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  RotateCcw,
  Trash2,
  Shield,
  Edit2,
  ExternalLink,
  Download,
  Upload,
  LogOut,
  Phone,
  Mail,
  MapPin,
  Building2,
  Car,
  ShieldCheck,
  Save,
  X,
} from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";
import {
  PublishStatus,
  RealEstateListing,
  VehicleListing,
  HeroSlideConfig,
  ContactConfig,
} from "@/lib/gapsan-data";

type AdminRole = "Düzenleyici" | "Yayıncı";
type AdminTab = "arac" | "gayrimenkul" | "slayt" | "yorum" | "ayarlar";

const DEMO_PINS = ["1998", "gapsan1998", "gapsan"];

export default function YonetimClient() {
  const {
    previewMode,
    setPreviewMode,
    slides,
    setSlides,
    vehicles,
    setVehicles,
    realEstates,
    setRealEstates,
    reviews,
    setReviews,
    contact,
    setContact,
    constructionApprovedScope,
    setConstructionApprovedScope,
    resetStore,
  } = useGapsanStore();

  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<AdminRole>("Yayıncı");
  const [pinInput, setPinInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("arac");
  const [notice, setNotice] = useState("");

  // Edit Modals State
  const [editingVehicle, setEditingVehicle] = useState<VehicleListing | null>(null);
  const [editingRealEstate, setEditingRealEstate] = useState<RealEstateListing | null>(null);

  // New Vehicle Form
  const [vTitle, setVTitle] = useState("");
  const [vBrand, setVBrand] = useState("");
  const [vModel, setVModel] = useState("");
  const [vYear, setVYear] = useState("");
  const [vTrans, setVTrans] = useState<VehicleListing["transmission"]>("Otomatik");
  const [vKm, setVKm] = useState("");
  const [vPrice, setVPrice] = useState("");
  const [vFuel, setVFuel] = useState("Dizel");
  const [vDamage, setVDamage] = useState("Onaylı ekspertiz kaydı");
  const [vImage, setVImage] = useState("/assets/gapsan/gapsan-otomotiv-kart-konsept.webp");
  const [vEids, setVEids] = useState(true);
  const [vAuth, setVAuth] = useState(true);
  const [vSource, setVSource] = useState(true);

  // New Real Estate Form
  const [rTitle, setRTitle] = useState("");
  const [rType, setRType] = useState<"Satılık" | "Kiralık">("Satılık");
  const [rPropType, setRPropType] = useState<RealEstateListing["propertyType"]>("Daire");
  const [rDistrict, setRDistrict] = useState("Esenyurt");
  const [rM2, setRM2] = useState("");
  const [rPrice, setRPrice] = useState("");
  const [rRooms, setRRooms] = useState("3+1");
  const [rDesc, setRDesc] = useState("");
  const [rImage, setRImage] = useState("/assets/gapsan/gapsan-gayrimenkul-konsept.webp");
  const [rEids, setREids] = useState(true);
  const [rAuth, setRAUTH] = useState(true);
  const [rSource, setRSource] = useState(true);

  // New Review Form
  const [revAuthor, setRevAuthor] = useState("");
  const [revArea, setRevArea] = useState<"Otomotiv" | "Gayrimenkul" | "Sigorta">("Otomotiv");
  const [revComment, setRevComment] = useState("");
  const [revRef, setRevRef] = useState("");
  const [revMatched, setRevMatched] = useState(true);
  const [revPerm, setRevPerm] = useState(true);

  // Settings Temp Form
  const [settingsForm, setSettingsForm] = useState<ContactConfig>(contact);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Session check on load
  useEffect(() => {
    try {
      const isAuth = sessionStorage.getItem("gapsan_admin_auth");
      const savedRole = sessionStorage.getItem("gapsan_admin_role");
      if (isAuth === "true") {
        setAuthenticated(true);
        if (savedRole === "Düzenleyici" || savedRole === "Yayıncı") {
          setRole(savedRole);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync settings form when contact changes
  useEffect(() => {
    setSettingsForm(contact);
  }, [contact]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pinInput.trim().toLowerCase();
    if (!DEMO_PINS.includes(cleanPin)) {
      setAuthError("Geçersiz yönetim erişim kodu. Şifre: 1998");
      return;
    }
    setAuthError("");
    setAuthenticated(true);
    try {
      sessionStorage.setItem("gapsan_admin_auth", "true");
      sessionStorage.setItem("gapsan_admin_role", role);
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPinInput("");
    try {
      sessionStorage.removeItem("gapsan_admin_auth");
      sessionStorage.removeItem("gapsan_admin_role");
    } catch {
      // ignore
    }
  };

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vTitle.trim() || !vBrand.trim()) {
      setNotice("Araç başlığı ve marka alanı zorunludur.");
      return;
    }
    const id = `veh-${Date.now()}`;
    const newItem: VehicleListing = {
      id,
      slug: `${slugify(vTitle)}-${Date.now().toString().slice(-4)}`,
      title: vTitle.trim(),
      brand: vBrand.trim(),
      model: vModel.trim() || vTitle.trim(),
      year: vYear ? Number(vYear) : null,
      transmission: vTrans,
      fuel: vFuel,
      trim: "",
      horsepower: "",
      km: vKm ? Number(vKm) : null,
      price: vPrice.trim() || null,
      damageInfo: vDamage.trim() || "Onaylı ekspertiz kaydı",
      stockInfo: "Müsait",
      description: `${vTitle.trim()} - GAPSAN Otomotiv onaylı portföy ilanı.`,
      images: [vImage || "/assets/gapsan/gapsan-otomotiv-kart-konsept.webp"],
      status: role === "Yayıncı" ? "Yayında" : "Taslak",
      isAvailable: true,
      eidsVerified: vEids,
      authorizationVerified: vAuth,
      sourceVerified: vSource,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setVehicles((prev) => [newItem, ...prev]);
    setVTitle("");
    setVBrand("");
    setVModel("");
    setVYear("");
    setVKm("");
    setVPrice("");
    setNotice(
      role === "Yayıncı"
        ? "Araç ilanı doğrudan 'Yayında' olarak siteye eklendi."
        : "Araç ilanı 'Taslak' olarak eklendi."
    );
  };

  const handleSaveEditVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;
    setVehicles((prev) =>
      prev.map((v) => (v.id === editingVehicle.id ? editingVehicle : v))
    );
    setEditingVehicle(null);
    setNotice("Araç bilgileri başarıyla güncellendi.");
  };

  const updateVehicleStatus = (id: string, nextStatus: PublishStatus) => {
    if (nextStatus === "Yayında" && role !== "Yayıncı") {
      setNotice("Yalnızca Yayıncı rolü canlı yayın açabilir.");
      return;
    }
    const target = vehicles.find((v) => v.id === id);
    if (!target) return;

    if (
      nextStatus === "Yayında" &&
      (!target.eidsVerified ||
        !target.authorizationVerified ||
        !target.sourceVerified ||
        !target.isAvailable)
    ) {
      setNotice(
        "İlan yetkisi, EİDS kapsamı, kaynak ve aktiflik onayları olmadan canlı yayın açılamaz."
      );
      return;
    }
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: nextStatus } : v))
    );
    setNotice(`Araç ilanı durumu '${nextStatus}' olarak güncellendi.`);
  };

  const handleAddRealEstate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rTitle.trim() || !rDistrict.trim()) {
      setNotice("Taşınmaz başlığı ve ilçe zorunludur.");
      return;
    }
    const id = `re-${Date.now()}`;
    const newItem: RealEstateListing = {
      id,
      slug: `${slugify(rTitle)}-${Date.now().toString().slice(-4)}`,
      title: rTitle.trim(),
      listingType: rType,
      propertyType: rPropType,
      district: rDistrict.trim(),
      areaM2: rM2 ? Number(rM2) : null,
      price: rPrice.trim() || null,
      rooms: rRooms.trim(),
      description:
        rDesc.trim() ||
        `${rDistrict.trim()} bölgesinde GAPSAN güvencesiyle ${rType.toLowerCase()} ${rPropType.toLowerCase()}.`,
      images: [rImage || "/assets/gapsan/gapsan-gayrimenkul-konsept.webp"],
      status: role === "Yayıncı" ? "Yayında" : "Taslak",
      isAvailable: true,
      eidsVerified: rEids,
      authorizationVerified: rAuth,
      sourceVerified: rSource,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setRealEstates((prev) => [newItem, ...prev]);
    setRTitle("");
    setRM2("");
    setRPrice("");
    setRDesc("");
    setNotice(
      role === "Yayıncı"
        ? "Gayrimenkul ilanı doğrudan 'Yayında' olarak eklendi."
        : "Gayrimenkul ilanı 'Taslak' olarak eklendi."
    );
  };

  const handleSaveEditRealEstate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRealEstate) return;
    setRealEstates((prev) =>
      prev.map((r) => (r.id === editingRealEstate.id ? editingRealEstate : r))
    );
    setEditingRealEstate(null);
    setNotice("Taşınmaz bilgileri başarıyla güncellendi.");
  };

  const updateRealEstateStatus = (id: string, nextStatus: PublishStatus) => {
    if (nextStatus === "Yayında" && role !== "Yayıncı") {
      setNotice("Yalnızca Yayıncı rolü canlı yayın açabilir.");
      return;
    }
    const target = realEstates.find((r) => r.id === id);
    if (!target) return;

    if (
      nextStatus === "Yayında" &&
      (!target.eidsVerified ||
        !target.authorizationVerified ||
        !target.sourceVerified ||
        !target.isAvailable)
    ) {
      setNotice(
        "İlan yetkisi, EİDS kapsamı, kaynak ve aktiflik onayları olmadan canlı yayın açılamaz."
      );
      return;
    }
    setRealEstates((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: nextStatus } : r))
    );
    setNotice(`Gayrimenkul ilanı durumu '${nextStatus}' olarak güncellendi.`);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revAuthor.trim() || !revComment.trim() || !revRef.trim()) {
      setNotice("Yorum yazarı, metni ve dahili doğrulama referansı zorunludur.");
      return;
    }
    setReviews((prev) => [
      {
        id: `rev-${Date.now()}`,
        author: revAuthor.trim(),
        area: revArea,
        comment: revComment.trim(),
        verifiedMatch: revMatched,
        publishPermission: revPerm,
        status:
          role === "Yayıncı" && revMatched && revPerm ? "Yayında" : "Onay bekliyor",
        privateVerificationRef: revRef.trim(),
      },
      ...prev,
    ]);
    setRevAuthor("");
    setRevComment("");
    setRevRef("");
    setNotice("Müşteri yorumu ve gizli doğrulama kaydı eklendi.");
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setContact(settingsForm);
    setNotice("Kurumsal iletişim ve birim hatları başarıyla kaydedildi.");
  };

  // Export all CMS state to JSON
  const handleExportBackup = () => {
    const backupData = {
      version: 4,
      exportDate: new Date().toISOString(),
      vehicles,
      realEstates,
      slides,
      reviews,
      contact,
      constructionApprovedScope,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gapsan-cms-yedek-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setNotice("Site verilerinin yedeği başarıyla indirildi.");
  };

  // Import CMS state from JSON
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target?.result as string);
        if (Array.isArray(data.vehicles)) setVehicles(data.vehicles);
        if (Array.isArray(data.realEstates)) setRealEstates(data.realEstates);
        if (Array.isArray(data.slides)) setSlides(data.slides);
        if (Array.isArray(data.reviews)) setReviews(data.reviews);
        if (data.contact) setContact(data.contact);
        if (typeof data.constructionApprovedScope === "string") {
          setConstructionApprovedScope(data.constructionApprovedScope);
        }
        setNotice("Yedek dosyası başarıyla yüklendi ve uygulandı.");
      } catch {
        setNotice("Hata: Geçersiz yedek dosyası formatı.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (!authenticated) {
    return (
      <div className="gapsan-container py-16 max-w-md mx-auto">
        <div className="bg-white border border-[#E0E4EA] rounded-[12px] p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 text-[#111F35]">
            <div className="w-10 h-10 rounded-full bg-[#111F35] flex items-center justify-center text-[#D6A948]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-[22px] leading-tight">
                GAPSAN Yönetim Paneli
              </h1>
              <p className="text-[12px] text-[#536174]">
                İçerik, İlan ve Yayın Kontrol Merkezi
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-role"
                className="block text-[13px] font-semibold text-[#182538] mb-1"
              >
                Giriş Yetki Rolü
              </label>
              <select
                id="admin-role"
                value={role}
                onChange={(e) => setRole(e.target.value as AdminRole)}
                className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] bg-white text-[14px]"
              >
                <option value="Yayıncı">Yayıncı (Tam Yetki / Canlı Yayın &amp; Düzenleme)</option>
                <option value="Düzenleyici">Düzenleyici (Taslak Hazırlama / Onaya Gönderme)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="admin-pin"
                className="block text-[13px] font-semibold text-[#182538] mb-1"
              >
                Erişim Şifresi / Kodu
              </label>
              <div className="relative">
                <input
                  id="admin-pin"
                  type={showPassword ? "text" : "password"}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Şifreyi girin (Örn: 1998)"
                  className="w-full min-h-[44px] pl-3 pr-10 rounded-[10px] border border-[#E0E4EA] bg-white text-[14px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#536174] hover:text-[#111F35]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="mt-1 text-[12px] text-[#536174]">
                Yetkili erişim şifresi: <code className="bg-[#F7F5EF] px-1.5 py-0.5 rounded font-mono text-[#111F35]">1998</code>
              </p>
            </div>

            {authError && (
              <p role="alert" className="text-[13px] text-red-600 bg-red-50 p-2.5 rounded-[8px]">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full min-h-[44px] rounded-[10px] bg-[#111F35] hover:bg-[#1b2e4b] text-white font-semibold text-[15px] cursor-pointer transition-colors"
            >
              Yönetim Paneline Giriş Yap
            </button>
          </form>

          <div className="pt-2 border-t border-[#E0E4EA] text-center">
            <Link
              href="/"
              className="text-[13px] text-[#536174] hover:text-[#111F35] hover:underline"
            >
              &larr; Web Sitesine Geri Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gapsan-container py-8 space-y-6">
      {/* Top Header Bar */}
      <div className="bg-[#111F35] text-white rounded-[12px] p-5 md:p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#D6A948] text-[13px] font-bold">
            <Shield className="w-4 h-4" />
            <span>Aktif Yetki: {role}</span>
          </div>
          <h1 className="font-heading font-bold text-[22px] md:text-[26px] mt-1 text-white">
            GAPSAN Yayın ve İçerik Kontrol Paneli
          </h1>
          <p className="text-[13px] text-white/75 mt-0.5">
            Otomotiv, İnşaat, Sigorta ve kurumsal iletişim ayarlarını anlık yönetin.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="min-h-[40px] px-3 rounded-[8px] bg-white/10 hover:bg-white/15 border border-white/20 text-white text-[12px] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            title="Önizleme / Demo Modunu Aç / Kapat"
          >
            <Eye className="w-3.5 h-3.5 text-[#D6A948]" />
            <span>Mod: {previewMode ? "Önizleme (Demo Açık)" : "Canlı Mod"}</span>
          </button>

          <button
            type="button"
            onClick={handleExportBackup}
            className="min-h-[40px] px-3 rounded-[8px] bg-white/10 hover:bg-white/15 border border-white/20 text-white text-[12px] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            title="Tüm verilerin yedeğini bilgisayara JSON olarak indir"
          >
            <Download className="w-3.5 h-3.5 text-[#25D366]" />
            <span className="hidden sm:inline">Yedek İndir</span>
          </button>

          <label
            className="min-h-[40px] px-3 rounded-[8px] bg-white/10 hover:bg-white/15 border border-white/20 text-white text-[12px] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            title="JSON yedeği geri yükle"
          >
            <Upload className="w-3.5 h-3.5 text-[#D6A948]" />
            <span className="hidden sm:inline">Yedek Yükle</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={() => {
              if (confirm("Tüm veriler varsayılan orijinal değerlere sıfırlansın mı?")) {
                resetStore();
                setNotice("Tüm panel verileri orijinal durumuna sıfırlandı.");
              }
            }}
            className="min-h-[40px] px-3 rounded-[8px] bg-white/10 hover:bg-white/15 border border-white/20 text-white text-[12px] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            title="Orijinal ayarlara sıfırla"
          >
            <RotateCcw className="w-3.5 h-3.5 text-orange-300" />
            <span className="hidden sm:inline">Sıfırla</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="min-h-[40px] px-3 rounded-[8px] bg-red-600/80 hover:bg-red-600 text-white text-[12px] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            title="Güvenli Çıkış Yap"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Çıkış</span>
          </button>
        </div>
      </div>

      {/* Notice Banner */}
      {notice && (
        <div
          role="status"
          className="p-3.5 rounded-[10px] bg-white border border-[#D6A948] text-[#111F35] text-[14px] flex items-center justify-between gap-3 shadow-xs"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D6A948] shrink-0" />
            <span className="font-medium">{notice}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotice("")}
            className="text-[#536174] hover:text-[#111F35] text-[13px] font-semibold"
          >
            Kapat
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#E0E4EA] pb-3">
        {[
          { id: "arac", label: "Otomotiv İlanları", icon: Car },
          { id: "gayrimenkul", label: "İnşaat & Gayrimenkul İlanları", icon: Building2 },
          { id: "slayt", label: "Manşet / Slayt Yönetimi", icon: Eye },
          { id: "yorum", label: "Müşteri Yorumları & Doğrulama", icon: ShieldCheck },
          { id: "ayarlar", label: "Kurumsal & İletişim Ayarları", icon: Phone },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id as AdminTab)}
              className={`min-h-[42px] px-4 rounded-[8px] text-[13px] font-semibold border flex items-center gap-2 cursor-pointer transition-colors ${
                activeTab === t.id
                  ? "bg-[#111F35] text-white border-[#111F35]"
                  : "bg-white text-[#182538] border-[#E0E4EA] hover:bg-[#F7F5EF]"
              }`}
            >
              <Icon className="w-4 h-4 text-[#D6A948]" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OTOMOTİV İLANLARI */}
      {activeTab === "arac" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Add Vehicle Form */}
          <form
            onSubmit={handleAddVehicle}
            className="lg:col-span-5 bg-white border border-[#E0E4EA] rounded-[10px] p-5 space-y-3.5 shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-[#E0E4EA] pb-3">
              <h2 className="font-heading font-bold text-[17px] text-[#111F35] flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#D6A948]" />
                Yeni Araç İlanı Ekle
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#F7F5EF] text-[#111F35]">
                {role === "Yayıncı" ? "Doğrudan Yayında" : "Taslak"}
              </span>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                İlan Başlığı *
              </label>
              <input
                type="text"
                placeholder="Örn: 2021 Renault Megane 1.5 dCi Joy"
                value={vTitle}
                onChange={(e) => setVTitle(e.target.value)}
                required
                className="w-full min-h-[42px] px-3 rounded-[8px] border border-[#E0E4EA] text-[14px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  Marka *
                </label>
                <input
                  type="text"
                  placeholder="Örn: Renault"
                  value={vBrand}
                  onChange={(e) => setVBrand(e.target.value)}
                  required
                  className="w-full min-h-[42px] px-3 rounded-[8px] border border-[#E0E4EA] text-[14px]"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  Model
                </label>
                <input
                  type="text"
                  placeholder="Örn: Megane"
                  value={vModel}
                  onChange={(e) => setVModel(e.target.value)}
                  className="w-full min-h-[42px] px-3 rounded-[8px] border border-[#E0E4EA] text-[14px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  Yıl
                </label>
                <input
                  type="number"
                  placeholder="2021"
                  value={vYear}
                  onChange={(e) => setVYear(e.target.value)}
                  className="w-full min-h-[42px] px-2.5 rounded-[8px] border border-[#E0E4EA] text-[14px]"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  Vites
                </label>
                <select
                  value={vTrans}
                  onChange={(e) =>
                    setVTrans(e.target.value as VehicleListing["transmission"])
                  }
                  className="w-full min-h-[42px] px-2 rounded-[8px] border border-[#E0E4EA] text-[13px]"
                >
                  <option value="Otomatik">Otomatik</option>
                  <option value="Manuel">Manuel</option>
                  <option value="Yarı Otomatik">Yarı Otomatik</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  Kilometre
                </label>
                <input
                  type="number"
                  placeholder="85000"
                  value={vKm}
                  onChange={(e) => setVKm(e.target.value)}
                  className="w-full min-h-[42px] px-2.5 rounded-[8px] border border-[#E0E4EA] text-[14px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  Yakıt Türü
                </label>
                <select
                  value={vFuel}
                  onChange={(e) => setVFuel(e.target.value)}
                  className="w-full min-h-[42px] px-2.5 rounded-[8px] border border-[#E0E4EA] text-[14px]"
                >
                  <option value="Dizel">Dizel</option>
                  <option value="Benzin">Benzin</option>
                  <option value="Benzin & LPG">Benzin &amp; LPG</option>
                  <option value="Hibrit">Hibrit</option>
                  <option value="Elektrik">Elektrik</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  Fiyat
                </label>
                <input
                  type="text"
                  placeholder="Örn: 980.000 TL"
                  value={vPrice}
                  onChange={(e) => setVPrice(e.target.value)}
                  className="w-full min-h-[42px] px-3 rounded-[8px] border border-[#E0E4EA] text-[14px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                Ekspertiz / Hasar Kaydı
              </label>
              <input
                type="text"
                placeholder="Örn: Hatasız, boyasız, tramer kaydı yok"
                value={vDamage}
                onChange={(e) => setVDamage(e.target.value)}
                className="w-full min-h-[42px] px-3 rounded-[8px] border border-[#E0E4EA] text-[14px]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                Araç Görseli (URL veya Hazır Seçim)
              </label>
              <input
                type="text"
                value={vImage}
                onChange={(e) => setVImage(e.target.value)}
                className="w-full min-h-[40px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px]"
              />
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {[
                  { label: "Galeri Konsepti", url: "/assets/gapsan/gapsan-otomotiv-kart-konsept.webp" },
                  { label: "Lüks Galeri", url: "/assets/gapsan/gapsan-otomotiv-konsept.webp" },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setVImage(preset.url)}
                    className="text-[11px] px-2 py-0.5 rounded border border-[#E0E4EA] bg-[#F7F5EF] hover:bg-white text-[#111F35]"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-[#E0E4EA] text-[12px] text-[#182538]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={vEids}
                  onChange={(e) => setVEids(e.target.checked)}
                  className="accent-[#111F35]"
                />
                <span>EİDS Taşınmaz &amp; Taşıt Doğrulama Kapsamında</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={vAuth}
                  onChange={(e) => setVAuth(e.target.checked)}
                  className="accent-[#111F35]"
                />
                <span>İkinci El Motorlu Kara Taşıtı Ticareti Yetki Belgesi Onaylı (340 6225)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={vSource}
                  onChange={(e) => setVSource(e.target.checked)}
                  className="accent-[#111F35]"
                />
                <span>Ekspertiz ve Ruhsat Doğrulandı</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full min-h-[44px] rounded-[8px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-bold text-[14px] cursor-pointer transition-colors"
            >
              {role === "Yayıncı" ? "İlanı Canlıya Ekle" : "İlanı Taslak Olarak Ekle"}
            </button>
          </form>

          {/* Vehicle List */}
          <div className="lg:col-span-7 bg-white border border-[#E0E4EA] rounded-[10px] p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E0E4EA] pb-3">
              <h2 className="font-heading font-bold text-[18px] text-[#111F35]">
                Kayıtlı Araç İlanları ({vehicles.length})
              </h2>
              <Link
                href="/otomotiv"
                target="_blank"
                className="text-[12px] font-semibold text-[#111F35] hover:underline flex items-center gap-1"
              >
                <span>Otomotiv Sayfasını Gör</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {vehicles.length === 0 ? (
              <div className="p-8 text-center bg-[#F7F5EF] rounded-[8px] space-y-2">
                <Car className="w-8 h-8 text-[#536174] mx-auto" />
                <p className="text-[14px] font-semibold text-[#111F35]">
                  Henüz kayıtlı araç ilanı yok
                </p>
                <p className="text-[12px] text-[#536174]">
                  Soldaki formdan yeni bir araç eklediğinizde sitede anında listelenecektir.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {vehicles.map((v) => (
                  <div
                    key={v.id}
                    className="p-3.5 rounded-[10px] border border-[#E0E4EA] hover:border-[#D6A948] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-[6px] overflow-hidden bg-[#111F35] shrink-0">
                        <img
                          src={v.images[0] || "/assets/gapsan/gapsan-otomotiv-kart-konsept.webp"}
                          alt={v.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-[14px] text-[#111F35]">{v.title}</p>
                        <p className="text-[12px] text-[#536174]">
                          {v.year} &bull; {v.transmission} &bull;{" "}
                          {v.km ? `${v.km.toLocaleString("tr-TR")} km` : "Km belirtilmedi"}{" "}
                          &bull;{" "}
                          <strong className="text-[#111F35]">{v.price || "Fiyat Sorunuz"}</strong>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                              v.status === "Yayında"
                                ? "bg-emerald-100 text-emerald-800"
                                : v.status === "Taslak"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {v.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-center">
                      {(["Taslak", "Onay bekliyor", "Yayında", "Arşiv"] as PublishStatus[]).map(
                        (st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => updateVehicleStatus(v.id, st)}
                            className={`px-2 py-1 rounded text-[11px] font-semibold border cursor-pointer ${
                              v.status === st
                                ? "bg-[#111F35] text-white border-[#111F35]"
                                : "bg-[#F7F5EF] text-[#182538] border-[#E0E4EA] hover:bg-white"
                            }`}
                          >
                            {st}
                          </button>
                        )
                      )}

                      <button
                        type="button"
                        onClick={() => setEditingVehicle(v)}
                        className="p-1.5 text-[#111F35] hover:bg-[#F7F5EF] rounded border border-[#E0E4EA] cursor-pointer"
                        title="İlanı Düzenle"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`'${v.title}' ilanını silmek istediğinize emin misiniz?`)) {
                            setVehicles((prev) => prev.filter((x) => x.id !== v.id));
                            setNotice(`'${v.title}' silindi.`);
                          }
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded border border-red-200 cursor-pointer"
                        title="İlanı Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: İNŞAAT & GAYRİMENKUL İLANLARI */}
      {activeTab === "gayrimenkul" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Add Real Estate Form */}
          <form
            onSubmit={handleAddRealEstate}
            className="lg:col-span-5 bg-white border border-[#E0E4EA] rounded-[10px] p-5 space-y-3.5 shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-[#E0E4EA] pb-3">
              <h2 className="font-heading font-bold text-[17px] text-[#111F35] flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#D6A948]" />
                Yeni Taşınmaz İlanı Ekle
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#F7F5EF] text-[#111F35]">
                {role === "Yayıncı" ? "Doğrudan Yayında" : "Taslak"}
              </span>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                İlan Başlığı *
              </label>
              <input
                type="text"
                placeholder="Örn: Esenyurt Merkez 3+1 Sıfır Lüks Daire"
                value={rTitle}
                onChange={(e) => setRTitle(e.target.value)}
                required
                className="w-full min-h-[42px] px-3 rounded-[8px] border border-[#E0E4EA] text-[14px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  İşlem Türü
                </label>
                <select
                  value={rType}
                  onChange={(e) => setRType(e.target.value as "Satılık" | "Kiralık")}
                  className="w-full min-h-[42px] px-2.5 rounded-[8px] border border-[#E0E4EA] text-[14px]"
                >
                  <option value="Satılık">Satılık</option>
                  <option value="Kiralık">Kiralık</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  Taşınmaz Türü
                </label>
                <select
                  value={rPropType}
                  onChange={(e) =>
                    setRPropType(e.target.value as RealEstateListing["propertyType"])
                  }
                  className="w-full min-h-[42px] px-2.5 rounded-[8px] border border-[#E0E4EA] text-[14px]"
                >
                  <option value="Daire">Daire</option>
                  <option value="İş Yeri">İş Yeri</option>
                  <option value="Arsa">Arsa</option>
                  <option value="Villa">Villa</option>
                  <option value="Bina">Bina</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  İlçe *
                </label>
                <input
                  type="text"
                  placeholder="Esenyurt"
                  value={rDistrict}
                  onChange={(e) => setRDistrict(e.target.value)}
                  required
                  className="w-full min-h-[42px] px-2.5 rounded-[8px] border border-[#E0E4EA] text-[14px]"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  m²
                </label>
                <input
                  type="number"
                  placeholder="120"
                  value={rM2}
                  onChange={(e) => setRM2(e.target.value)}
                  className="w-full min-h-[42px] px-2.5 rounded-[8px] border border-[#E0E4EA] text-[14px]"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  Oda Sayısı
                </label>
                <input
                  type="text"
                  placeholder="3+1"
                  value={rRooms}
                  onChange={(e) => setRRooms(e.target.value)}
                  className="w-full min-h-[42px] px-2.5 rounded-[8px] border border-[#E0E4EA] text-[14px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                Fiyat
              </label>
              <input
                type="text"
                placeholder="Örn: 3.450.000 TL"
                value={rPrice}
                onChange={(e) => setRPrice(e.target.value)}
                className="w-full min-h-[42px] px-3 rounded-[8px] border border-[#E0E4EA] text-[14px]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                Açıklama
              </label>
              <textarea
                rows={2}
                placeholder="Örn: Metroya ve caddeye yakın, krediye uygun sıfır daire..."
                value={rDesc}
                onChange={(e) => setRDesc(e.target.value)}
                className="w-full p-2.5 rounded-[8px] border border-[#E0E4EA] text-[13px]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                Görsel URL
              </label>
              <input
                type="text"
                value={rImage}
                onChange={(e) => setRImage(e.target.value)}
                className="w-full min-h-[40px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px]"
              />
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {[
                  { label: "Modern Apartman", url: "/assets/gapsan/gapsan-gayrimenkul-konsept.webp" },
                  { label: "Rezidan / Proje", url: "/assets/gapsan/gapsan-og-gayrimenkul.webp" },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setRImage(preset.url)}
                    className="text-[11px] px-2 py-0.5 rounded border border-[#E0E4EA] bg-[#F7F5EF] hover:bg-white text-[#111F35]"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-[#E0E4EA] text-[12px] text-[#182538]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rEids}
                  onChange={(e) => setREids(e.target.checked)}
                  className="accent-[#111F35]"
                />
                <span>EİDS Taşınmaz Doğrulama Kapsamında</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rAuth}
                  onChange={(e) => setRAUTH(e.target.checked)}
                  className="accent-[#111F35]"
                />
                <span>Taşınmaz Ticareti Yetki Belgesi Onaylı (341 0913)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rSource}
                  onChange={(e) => setRSource(e.target.checked)}
                  className="accent-[#111F35]"
                />
                <span>Tapu &amp; Ruhsat Kayıtları Doğrulandı</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full min-h-[44px] rounded-[8px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-bold text-[14px] cursor-pointer transition-colors"
            >
              {role === "Yayıncı" ? "İlanı Canlıya Ekle" : "İlanı Taslak Olarak Ekle"}
            </button>
          </form>

          {/* Real Estate List */}
          <div className="lg:col-span-7 bg-white border border-[#E0E4EA] rounded-[10px] p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E0E4EA] pb-3">
              <h2 className="font-heading font-bold text-[18px] text-[#111F35]">
                Kayıtlı Taşınmaz İlanları ({realEstates.length})
              </h2>
              <Link
                href="/insaat"
                target="_blank"
                className="text-[12px] font-semibold text-[#111F35] hover:underline flex items-center gap-1"
              >
                <span>İnşaat / Emlak Sayfasını Gör</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {realEstates.length === 0 ? (
              <div className="p-8 text-center bg-[#F7F5EF] rounded-[8px] space-y-2">
                <Building2 className="w-8 h-8 text-[#536174] mx-auto" />
                <p className="text-[14px] font-semibold text-[#111F35]">
                  Henüz kayıtlı taşınmaz ilanı yok
                </p>
                <p className="text-[12px] text-[#536174]">
                  Soldaki formdan yeni bir satılık veya kiralık gayrimenkul ekleyebilirsiniz.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {realEstates.map((r) => (
                  <div
                    key={r.id}
                    className="p-3.5 rounded-[10px] border border-[#E0E4EA] hover:border-[#D6A948] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-[6px] overflow-hidden bg-[#111F35] shrink-0">
                        <img
                          src={r.images[0] || "/assets/gapsan/gapsan-gayrimenkul-konsept.webp"}
                          alt={r.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-[14px] text-[#111F35]">
                          {r.title} ({r.listingType})
                        </p>
                        <p className="text-[12px] text-[#536174]">
                          {r.district} &bull; {r.propertyType} &bull;{" "}
                          {r.areaM2 ? `${r.areaM2} m²` : ""} &bull; {r.rooms} &bull;{" "}
                          <strong className="text-[#111F35]">{r.price || "Fiyat Sorunuz"}</strong>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                              r.status === "Yayında"
                                ? "bg-emerald-100 text-emerald-800"
                                : r.status === "Taslak"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {r.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-center">
                      {(["Taslak", "Onay bekliyor", "Yayında", "Arşiv"] as PublishStatus[]).map(
                        (st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => updateRealEstateStatus(r.id, st)}
                            className={`px-2 py-1 rounded text-[11px] font-semibold border cursor-pointer ${
                              r.status === st
                                ? "bg-[#111F35] text-white border-[#111F35]"
                                : "bg-[#F7F5EF] text-[#182538] border-[#E0E4EA] hover:bg-white"
                            }`}
                          >
                            {st}
                          </button>
                        )
                      )}

                      <button
                        type="button"
                        onClick={() => setEditingRealEstate(r)}
                        className="p-1.5 text-[#111F35] hover:bg-[#F7F5EF] rounded border border-[#E0E4EA] cursor-pointer"
                        title="İlanı Düzenle"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`'${r.title}' ilanını silmek istediğinize emin misiniz?`)) {
                            setRealEstates((prev) => prev.filter((x) => x.id !== r.id));
                            setNotice(`'${r.title}' silindi.`);
                          }
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded border border-red-200 cursor-pointer"
                        title="İlanı Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: MANŞET / SLAYT YÖNETİMİ */}
      {activeTab === "slayt" && (
        <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E0E4EA] pb-4">
            <div>
              <h2 className="font-heading font-bold text-[19px] text-[#111F35]">
                Ana Sayfa Açılış Manşetleri (Hero Slaytları)
              </h2>
              <p className="text-[13px] text-[#536174]">
                Ziyaretçilerin ilk gördüğü ana manşet metinlerini, buton yazılarını ve odak ayarlarını buradan yönetebilirsiniz.
              </p>
            </div>
            <Link
              href="/"
              target="_blank"
              className="text-[13px] font-semibold text-[#111F35] hover:underline flex items-center gap-1.5"
            >
              <span>Canlı Sayfayı Gör</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {slides.map((s, idx) => (
              <div
                key={s.id}
                className="p-4 rounded-[10px] border border-[#E0E4EA] bg-[#F7F5EF]/50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[14px] text-[#111F35] bg-[#D6A948]/20 text-[#111F35] px-2.5 py-0.5 rounded">
                    Slayt {idx + 1}
                  </span>
                  <span className="text-[11px] text-[#536174]">{s.id}</span>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                    Ana Başlık
                  </label>
                  <input
                    type="text"
                    value={s.heading}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSlides((prev) =>
                        prev.map((x) => (x.id === s.id ? { ...x, heading: val } : x))
                      );
                    }}
                    className="w-full min-h-[40px] px-3 rounded-[6px] border border-[#E0E4EA] bg-white text-[13px] font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#182538] mb-1">
                      Buton Metni
                    </label>
                    <input
                      type="text"
                      value={s.ctaLabel}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSlides((prev) =>
                          prev.map((x) => (x.id === s.id ? { ...x, ctaLabel: val } : x))
                        );
                      }}
                      className="w-full min-h-[36px] px-2.5 rounded-[6px] border border-[#E0E4EA] bg-white text-[12px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#182538] mb-1">
                      Buton Linki
                    </label>
                    <input
                      type="text"
                      value={s.ctaHref}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSlides((prev) =>
                          prev.map((x) => (x.id === s.id ? { ...x, ctaHref: val } : x))
                        );
                      }}
                      className="w-full min-h-[36px] px-2.5 rounded-[6px] border border-[#E0E4EA] bg-white text-[12px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#182538] mb-1">
                    Konum / Alt Bilgi
                  </label>
                  <input
                    type="text"
                    value={s.location || ""}
                    placeholder="Esenyurt, İstanbul..."
                    onChange={(e) => {
                      const val = e.target.value;
                      setSlides((prev) =>
                        prev.map((x) => (x.id === s.id ? { ...x, location: val } : x))
                      );
                    }}
                    className="w-full min-h-[36px] px-2.5 rounded-[6px] border border-[#E0E4EA] bg-white text-[12px]"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-right">
            <button
              type="button"
              onClick={() => setNotice("Manşet ve slayt değişiklikleri kaydedildi.")}
              className="min-h-[42px] px-5 rounded-[8px] bg-[#111F35] text-white font-semibold text-[14px] inline-flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#D6A948]" />
              <span>Slayt Ayarlarını Kaydet</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: MÜŞTERİ YORUMLARI & DOĞRULAMA */}
      {activeTab === "yorum" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <form
            onSubmit={handleAddReview}
            className="lg:col-span-5 bg-white border border-[#E0E4EA] rounded-[10px] p-5 space-y-3.5 shadow-xs"
          >
            <h2 className="font-heading font-bold text-[17px] text-[#111F35]">
              Yorum ve Gizli Doğrulama Kaydı Ekle
            </h2>
            <p className="text-[12px] text-[#536174]">
              Ticaret Bakanlığı ve Tüketici Hakları gereğince yorumlar noter veya sözleşme işlem kaydıyla eşleştirilir.
            </p>

            <div>
              <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                Müşteri Adı / Rumuz *
              </label>
              <input
                type="text"
                placeholder="Örn: Ahmet K. veya Müşteri Adı"
                value={revAuthor}
                onChange={(e) => setRevAuthor(e.target.value)}
                required
                className="w-full min-h-[42px] px-3 rounded-[8px] border border-[#E0E4EA] text-[14px]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                Hizmet Alanı
              </label>
              <select
                value={revArea}
                onChange={(e) =>
                  setRevArea(e.target.value as "Otomotiv" | "Gayrimenkul" | "Sigorta")
                }
                className="w-full min-h-[42px] px-3 rounded-[8px] border border-[#E0E4EA] text-[14px]"
              >
                <option value="Otomotiv">Otomotiv</option>
                <option value="Gayrimenkul">İnşaat / Gayrimenkul</option>
                <option value="Sigorta">Sigorta</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                Yorum Metni *
              </label>
              <textarea
                placeholder="Müşterinin ilettiği memnuniyet mesajı..."
                value={revComment}
                onChange={(e) => setRevComment(e.target.value)}
                rows={3}
                required
                className="w-full p-2.5 rounded-[8px] border border-[#E0E4EA] text-[13px]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                Gizli Doğrulama Referansı (Panelde saklanır, dışa aktarılmaz) *
              </label>
              <input
                type="text"
                placeholder="Örn: Noter Sözleşme No: 2024/8492"
                value={revRef}
                onChange={(e) => setRevRef(e.target.value)}
                required
                className="w-full min-h-[42px] px-3 rounded-[8px] border border-[#E0E4EA] text-[14px]"
              />
            </div>

            <div className="space-y-1.5 pt-1 text-[12px] text-[#182538]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={revMatched}
                  onChange={(e) => setRevMatched(e.target.checked)}
                  className="accent-[#111F35]"
                />
                <span>Gerçek işlem kaydıyla doğrulandı</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={revPerm}
                  onChange={(e) => setRevPerm(e.target.checked)}
                  className="accent-[#111F35]"
                />
                <span>Müşteriden açık yayın izni alındı</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full min-h-[44px] rounded-[8px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-bold text-[14px] cursor-pointer transition-colors"
            >
              Yorumu Kaydet
            </button>
          </form>

          <div className="lg:col-span-7 bg-white border border-[#E0E4EA] rounded-[10px] p-5 space-y-3.5 shadow-xs">
            <h2 className="font-heading font-bold text-[18px] text-[#111F35]">
              Kayıtlı Yorumlar ({reviews.length})
            </h2>

            {reviews.length === 0 ? (
              <p className="text-[14px] text-[#536174]">Henüz kayıtlı müşteri yorumu bulunmuyor.</p>
            ) : (
              <div className="space-y-3">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="p-3.5 rounded-[10px] border border-[#E0E4EA] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[14px] text-[#111F35]">
                        {r.author} &bull; <span className="text-[#536174] font-normal">{r.area}</span>
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {r.status}
                        </span>
                        <button
                          type="button"
                          onClick={() => setReviews((prev) => prev.filter((x) => x.id !== r.id))}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[13px] text-[#182538] italic">“{r.comment}”</p>
                    <div className="text-[11px] text-[#536174] bg-[#F7F5EF] p-2 rounded">
                      🔒 <strong>Gizli Referans:</strong> {r.privateVerificationRef}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: KURUMSAL & İLETİŞİM AYARLARI */}
      {activeTab === "ayarlar" && (
        <form
          onSubmit={handleSaveSettings}
          className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-6 shadow-xs"
        >
          <div className="border-b border-[#E0E4EA] pb-4">
            <h2 className="font-heading font-bold text-[20px] text-[#111F35]">
              Kurumsal Kimlik, Telefonlar ve E-Posta Ayarları
            </h2>
            <p className="text-[13px] text-[#536174] mt-0.5">
              Tüm sitede, footer&apos;da ve iletişim sayfasında görünen bilgileri tek noktadan güncelleyin.
            </p>
          </div>

          {/* Temel Şirket Bilgileri */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                Şirket Resmi Unvanı
              </label>
              <input
                type="text"
                value={settingsForm.companyLegalName}
                onChange={(e) =>
                  setSettingsForm((prev) => ({ ...prev, companyLegalName: e.target.value }))
                }
                className="w-full min-h-[42px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                Yetkili / Şirket Müdürü
              </label>
              <input
                type="text"
                value={settingsForm.founderName}
                onChange={(e) =>
                  setSettingsForm((prev) => ({ ...prev, founderName: e.target.value }))
                }
                className="w-full min-h-[42px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                Resmi Adres
              </label>
              <input
                type="text"
                value={settingsForm.address}
                onChange={(e) =>
                  setSettingsForm((prev) => ({ ...prev, address: e.target.value }))
                }
                className="w-full min-h-[42px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px]"
              />
            </div>
          </div>

          {/* Telefon Numaraları */}
          <div className="border-t border-[#E0E4EA] pt-5">
            <h3 className="font-heading font-bold text-[16px] text-[#111F35] mb-3">
              Birim Telefon Hatları
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#536174] mb-1 uppercase">
                  Genel Santral
                </label>
                <input
                  type="text"
                  value={settingsForm.generalPhoneDisplay}
                  onChange={(e) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      generalPhoneDisplay: e.target.value,
                      generalPhoneTel: `tel:${e.target.value.replace(/[^0-9+]/g, "")}`,
                    }))
                  }
                  className="w-full min-h-[40px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px] font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#536174] mb-1 uppercase">
                  Otomotiv &amp; Kredi
                </label>
                <input
                  type="text"
                  value={settingsForm.units.otomotiv.phoneDisplay}
                  onChange={(e) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      units: {
                        ...prev.units,
                        otomotiv: {
                          ...prev.units.otomotiv,
                          phoneDisplay: e.target.value,
                          phoneTel: `tel:${e.target.value.replace(/[^0-9+]/g, "")}`,
                        },
                      },
                    }))
                  }
                  className="w-full min-h-[40px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px] font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#536174] mb-1 uppercase">
                  İnşaat / Gayrimenkul
                </label>
                <input
                  type="text"
                  value={settingsForm.units.gayrimenkul.phoneDisplay}
                  onChange={(e) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      units: {
                        ...prev.units,
                        gayrimenkul: {
                          ...prev.units.gayrimenkul,
                          phoneDisplay: e.target.value,
                          phoneTel: `tel:${e.target.value.replace(/[^0-9+]/g, "")}`,
                        },
                      },
                    }))
                  }
                  className="w-full min-h-[40px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px] font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#536174] mb-1 uppercase">
                  Sigorta Birimi (7/24)
                </label>
                <input
                  type="text"
                  value={settingsForm.units.sigorta.phoneDisplay}
                  onChange={(e) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      units: {
                        ...prev.units,
                        sigorta: {
                          ...prev.units.sigorta,
                          phoneDisplay: e.target.value,
                          phoneTel: `tel:${e.target.value.replace(/[^0-9+]/g, "")}`,
                        },
                      },
                    }))
                  }
                  className="w-full min-h-[40px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px] font-semibold"
                />
              </div>
            </div>
          </div>

          {/* E-Posta Adresleri */}
          <div className="border-t border-[#E0E4EA] pt-5">
            <h3 className="font-heading font-bold text-[16px] text-[#111F35] mb-3">
              Kurumsal E-Posta Adresleri
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#536174] mb-1 uppercase">
                  Genel / Yönetim
                </label>
                <input
                  type="email"
                  value={settingsForm.generalEmail}
                  onChange={(e) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      generalEmail: e.target.value,
                      emails: { ...prev.emails, general: e.target.value },
                    }))
                  }
                  className="w-full min-h-[40px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#536174] mb-1 uppercase">
                  Otomotiv E-Posta
                </label>
                <input
                  type="email"
                  value={settingsForm.otomotivEmail}
                  onChange={(e) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      otomotivEmail: e.target.value,
                      emails: { ...prev.emails, otomotiv: e.target.value },
                    }))
                  }
                  className="w-full min-h-[40px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#536174] mb-1 uppercase">
                  İnşaat E-Posta
                </label>
                <input
                  type="email"
                  value={settingsForm.gayrimenkulEmail}
                  onChange={(e) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      gayrimenkulEmail: e.target.value,
                      emails: { ...prev.emails, gayrimenkul: e.target.value },
                    }))
                  }
                  className="w-full min-h-[40px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#536174] mb-1 uppercase">
                  Sigorta E-Posta
                </label>
                <input
                  type="email"
                  value={settingsForm.insuranceEmail}
                  onChange={(e) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      insuranceEmail: e.target.value,
                      emails: { ...prev.emails, sigorta: e.target.value },
                    }))
                  }
                  className="w-full min-h-[40px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px]"
                />
              </div>
            </div>
          </div>

          {/* Sosyal Medya ve WhatsApp Kanalı */}
          <div className="border-t border-[#E0E4EA] pt-5">
            <h3 className="font-heading font-bold text-[16px] text-[#111F35] mb-3">
              Sosyal Medya &amp; WhatsApp Kanal Linkleri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#536174] mb-1">
                  WhatsApp Kanalı (Gapsan Otomotiv Senetli Satış Merkezi)
                </label>
                <input
                  type="text"
                  value={settingsForm.socialMedia.whatsappChannel}
                  onChange={(e) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      socialMedia: { ...prev.socialMedia, whatsappChannel: e.target.value },
                    }))
                  }
                  className="w-full min-h-[40px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#536174] mb-1">
                  Facebook Sayfa Linki
                </label>
                <input
                  type="text"
                  value={settingsForm.socialMedia.facebook}
                  onChange={(e) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      socialMedia: { ...prev.socialMedia, facebook: e.target.value },
                    }))
                  }
                  className="w-full min-h-[40px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#536174] mb-1">
                  Instagram Otomotiv
                </label>
                <input
                  type="text"
                  value={settingsForm.socialMedia.instagramOtomotiv}
                  onChange={(e) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      socialMedia: { ...prev.socialMedia, instagramOtomotiv: e.target.value },
                    }))
                  }
                  className="w-full min-h-[40px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#536174] mb-1">
                  TikTok Otomotiv
                </label>
                <input
                  type="text"
                  value={settingsForm.socialMedia.tiktokOtomotiv}
                  onChange={(e) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      socialMedia: { ...prev.socialMedia, tiktokOtomotiv: e.target.value },
                    }))
                  }
                  className="w-full min-h-[40px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#536174] mb-1">
                  Instagram Gayrimenkul / İnşaat
                </label>
                <input
                  type="text"
                  value={settingsForm.socialMedia.instagramGayrimenkul}
                  onChange={(e) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      socialMedia: { ...prev.socialMedia, instagramGayrimenkul: e.target.value },
                    }))
                  }
                  className="w-full min-h-[40px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#536174] mb-1">
                  TikTok Gayrimenkul / İnşaat
                </label>
                <input
                  type="text"
                  value={settingsForm.socialMedia.tiktokGayrimenkul}
                  onChange={(e) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      socialMedia: { ...prev.socialMedia, tiktokGayrimenkul: e.target.value },
                    }))
                  }
                  className="w-full min-h-[40px] px-3 rounded-[8px] border border-[#E0E4EA] text-[13px]"
                />
              </div>
            </div>
          </div>

          {/* Faaliyet Kapsamı Metni */}
          <div className="border-t border-[#E0E4EA] pt-5">
            <label
              htmlFor="const-scope"
              className="block text-[13px] font-semibold text-[#182538] mb-1.5"
            >
              Onaylı İnşaat &amp; Gayrimenkul Faaliyet Kapsamı Açıklaması
            </label>
            <textarea
              id="const-scope"
              rows={2}
              value={constructionApprovedScope}
              onChange={(e) => setConstructionApprovedScope(e.target.value)}
              className="w-full p-3 rounded-[8px] border border-[#E0E4EA] text-[13px]"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <p className="text-[13px] text-[#536174] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#D6A948]" />
              <span>Kaydedilen tüm ayarlar sitede derhal aktifleşir.</span>
            </p>
            <button
              type="submit"
              className="min-h-[44px] px-6 rounded-[8px] bg-[#111F35] hover:bg-[#1b2e4b] text-white font-bold text-[14px] inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Save className="w-4 h-4 text-[#D6A948]" />
              <span>Tüm Ayarları Kaydet</span>
            </button>
          </div>
        </form>
      )}

      {/* EDIT VEHICLE MODAL */}
      {editingVehicle && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-[12px] max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E0E4EA] pb-3">
              <h3 className="font-heading font-bold text-[18px] text-[#111F35]">
                Araç İlanını Düzenle
              </h3>
              <button
                type="button"
                onClick={() => setEditingVehicle(null)}
                className="text-[#536174] hover:text-[#111F35]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditVehicle} className="space-y-3">
              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  Başlık
                </label>
                <input
                  type="text"
                  value={editingVehicle.title}
                  onChange={(e) =>
                    setEditingVehicle({ ...editingVehicle, title: e.target.value })
                  }
                  required
                  className="w-full min-h-[40px] px-3 rounded border border-[#E0E4EA] text-[13px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                    Fiyat
                  </label>
                  <input
                    type="text"
                    value={editingVehicle.price || ""}
                    onChange={(e) =>
                      setEditingVehicle({ ...editingVehicle, price: e.target.value })
                    }
                    className="w-full min-h-[40px] px-3 rounded border border-[#E0E4EA] text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                    Kilometre
                  </label>
                  <input
                    type="number"
                    value={editingVehicle.km || ""}
                    onChange={(e) =>
                      setEditingVehicle({
                        ...editingVehicle,
                        km: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    className="w-full min-h-[40px] px-3 rounded border border-[#E0E4EA] text-[13px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  Ekspertiz / Hasar Kaydı
                </label>
                <input
                  type="text"
                  value={editingVehicle.damageInfo || ""}
                  onChange={(e) =>
                    setEditingVehicle({ ...editingVehicle, damageInfo: e.target.value })
                  }
                  className="w-full min-h-[40px] px-3 rounded border border-[#E0E4EA] text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  Görsel URL
                </label>
                <input
                  type="text"
                  value={editingVehicle.images[0] || ""}
                  onChange={(e) =>
                    setEditingVehicle({
                      ...editingVehicle,
                      images: [e.target.value],
                    })
                  }
                  className="w-full min-h-[40px] px-3 rounded border border-[#E0E4EA] text-[13px]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#E0E4EA]">
                <button
                  type="button"
                  onClick={() => setEditingVehicle(null)}
                  className="min-h-[40px] px-4 rounded border border-[#E0E4EA] text-[13px] font-semibold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="min-h-[40px] px-5 rounded bg-[#111F35] text-white text-[13px] font-semibold"
                >
                  Güncellemeyi Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT REAL ESTATE MODAL */}
      {editingRealEstate && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-[12px] max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E0E4EA] pb-3">
              <h3 className="font-heading font-bold text-[18px] text-[#111F35]">
                Taşınmaz İlanını Düzenle
              </h3>
              <button
                type="button"
                onClick={() => setEditingRealEstate(null)}
                className="text-[#536174] hover:text-[#111F35]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditRealEstate} className="space-y-3">
              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  Başlık
                </label>
                <input
                  type="text"
                  value={editingRealEstate.title}
                  onChange={(e) =>
                    setEditingRealEstate({ ...editingRealEstate, title: e.target.value })
                  }
                  required
                  className="w-full min-h-[40px] px-3 rounded border border-[#E0E4EA] text-[13px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                    Fiyat
                  </label>
                  <input
                    type="text"
                    value={editingRealEstate.price || ""}
                    onChange={(e) =>
                      setEditingRealEstate({ ...editingRealEstate, price: e.target.value })
                    }
                    className="w-full min-h-[40px] px-3 rounded border border-[#E0E4EA] text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                    m²
                  </label>
                  <input
                    type="number"
                    value={editingRealEstate.areaM2 || ""}
                    onChange={(e) =>
                      setEditingRealEstate({
                        ...editingRealEstate,
                        areaM2: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    className="w-full min-h-[40px] px-3 rounded border border-[#E0E4EA] text-[13px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                    Oda Sayısı
                  </label>
                  <input
                    type="text"
                    value={editingRealEstate.rooms}
                    onChange={(e) =>
                      setEditingRealEstate({ ...editingRealEstate, rooms: e.target.value })
                    }
                    className="w-full min-h-[40px] px-3 rounded border border-[#E0E4EA] text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                    İlçe
                  </label>
                  <input
                    type="text"
                    value={editingRealEstate.district}
                    onChange={(e) =>
                      setEditingRealEstate({ ...editingRealEstate, district: e.target.value })
                    }
                    className="w-full min-h-[40px] px-3 rounded border border-[#E0E4EA] text-[13px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  Açıklama
                </label>
                <textarea
                  rows={2}
                  value={editingRealEstate.description}
                  onChange={(e) =>
                    setEditingRealEstate({ ...editingRealEstate, description: e.target.value })
                  }
                  className="w-full p-2.5 rounded border border-[#E0E4EA] text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#182538] mb-1">
                  Görsel URL
                </label>
                <input
                  type="text"
                  value={editingRealEstate.images[0] || ""}
                  onChange={(e) =>
                    setEditingRealEstate({
                      ...editingRealEstate,
                      images: [e.target.value],
                    })
                  }
                  className="w-full min-h-[40px] px-3 rounded border border-[#E0E4EA] text-[13px]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#E0E4EA]">
                <button
                  type="button"
                  onClick={() => setEditingRealEstate(null)}
                  className="min-h-[40px] px-4 rounded border border-[#E0E4EA] text-[13px] font-semibold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="min-h-[40px] px-5 rounded bg-[#111F35] text-white text-[13px] font-semibold"
                >
                  Güncellemeyi Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
