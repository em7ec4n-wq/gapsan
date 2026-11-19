"use client";

import React, { useState } from "react";
import {
  Lock,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Eye,
  RotateCcw,
  Trash2,
  Shield,
} from "lucide-react";
import { useGapsanStore } from "@/lib/gapsan-store";
import {
  PublishStatus,
  RealEstateListing,
  VehicleListing,
} from "@/lib/gapsan-data";

type AdminRole = "Düzenleyici" | "Yayıncı";
type AdminTab = "arac" | "gayrimenkul" | "slayt" | "yorum" | "ayarlar";

const DEMO_PIN = "1998"; // Panel erişim kodu

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

  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState<AdminRole>("Yayıncı");
  const [pinInput, setPinInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("arac");
  const [notice, setNotice] = useState("");

  // New Vehicle Form
  const [vTitle, setVTitle] = useState("");
  const [vBrand, setVBrand] = useState("");
  const [vModel, setVModel] = useState("");
  const [vYear, setVYear] = useState("");
  const [vTrans, setVTrans] = useState<VehicleListing["transmission"]>("Otomatik");
  const [vKm, setVKm] = useState("");
  const [vPrice, setVPrice] = useState("");
  const [vFuel, setVFuel] = useState("Dizel");
  const [vEids, setVEids] = useState(false);
  const [vAuth, setVAuth] = useState(false);
  const [vSource, setVSource] = useState(false);

  // New Real Estate Form
  const [rTitle, setRTitle] = useState("");
  const [rType, setRType] = useState<"Satılık" | "Kiralık">("Satılık");
  const [rPropType, setRPropType] =
    useState<RealEstateListing["propertyType"]>("Daire");
  const [rDistrict, setRDistrict] = useState("Esenyurt");
  const [rM2, setRM2] = useState("");
  const [rPrice, setRPrice] = useState("");
  const [rRooms, setRRooms] = useState("3+1");
  const [rEids, setREids] = useState(false);
  const [rAuth, setRAuth] = useState(false);
  const [rSource, setRSource] = useState(false);

  // New Review Form
  const [revAuthor, setRevAuthor] = useState("");
  const [revArea, setRevArea] = useState<"Otomotiv" | "Gayrimenkul" | "Sigorta">(
    "Otomotiv"
  );
  const [revComment, setRevComment] = useState("");
  const [revRef, setRevRef] = useState("");
  const [revMatched, setRevMatched] = useState(true);
  const [revPerm, setRevPerm] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() !== DEMO_PIN) {
      setAuthError("Geçersiz yönetim erişim kodu.");
      return;
    }
    setAuthError("");
    setAuthenticated(true);
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
      setNotice("Araç başlığı ve marka zorunludur.");
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
      damageInfo: "Onaylı ekspertiz kaydı",
      stockInfo: "Müsait",
      description: `${vTitle.trim()} - GAPSAN Otomotiv portföy ilanı.`,
      images: ["/assets/gapsan/gapsan-otomotiv-kart-konsept.webp"],
      status: "Taslak",
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
    setNotice("Araç ilanı 'Taslak' olarak eklendi.");
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
        "İlan yetkisi, EİDS kapsamı, kaynak ve aktiflik doğrulanmadan canlı yayın açılamaz."
      );
      return;
    }
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: nextStatus } : v))
    );
    setNotice(`İlan durumu '${nextStatus}' olarak güncellendi.`);
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
      description: `${rDistrict.trim()} bölgesinde ${rType.toLowerCase()} ${rPropType.toLowerCase()}.`,
      images: ["/assets/gapsan/gapsan-gayrimenkul-konsept.webp"],
      status: "Taslak",
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
    setNotice("Gayrimenkul ilanı 'Taslak' olarak eklendi.");
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
        "İlan yetkisi, EİDS kapsamı, kaynak ve aktiflik doğrulanmadan canlı yayın açılamaz."
      );
      return;
    }
    setRealEstates((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: nextStatus } : r))
    );
    setNotice(`Gayrimenkul ilanı '${nextStatus}' olarak güncellendi.`);
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
        status: role === "Yayıncı" && revMatched && revPerm ? "Yayında" : "Onay bekliyor",
        privateVerificationRef: revRef.trim(),
      },
      ...prev,
    ]);
    setRevAuthor("");
    setRevComment("");
    setRevRef("");
    setNotice("Müşteri yorumu ve gizli doğrulama kaydı eklendi.");
  };

  if (!authenticated) {
    return (
      <div className="gapsan-container py-16 max-w-md mx-auto">
        <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 md:p-8 space-y-5 shadow-sm">
          <div className="flex items-center gap-2.5 text-[#111F35]">
            <Lock className="w-6 h-6 text-[#D6A948]" />
            <h1 className="font-heading font-bold text-[24px]">
              Yönetim Paneli
            </h1>
          </div>
          <p className="text-[14px] text-[#536174]">
            Bu alan yalnızca yetkili Düzenleyici ve Yayıncı rolleri içindir.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-role"
                className="block text-[13px] font-semibold text-[#182538] mb-1"
              >
                Rol Seçimi
              </label>
              <select
                id="admin-role"
                value={role}
                onChange={(e) => setRole(e.target.value as AdminRole)}
                className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] bg-white text-[14px]"
              >
                <option value="Düzenleyici">Düzenleyici (Taslak / Onaya Gönder)</option>
                <option value="Yayıncı">Yayıncı (Onay / Canlı Yayın / Arşiv)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="admin-pin"
                className="block text-[13px] font-semibold text-[#182538] mb-1"
              >
                Erişim Kodu
              </label>
              <input
                id="admin-pin"
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Erişim kodunu girin (1998)"
                className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] bg-white text-[14px]"
              />
            </div>

            {authError && (
              <p role="alert" className="text-[13px] text-red-700">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full min-h-[44px] rounded-[10px] bg-[#111F35] hover:bg-[#1b2e4b] text-white font-semibold text-[15px] cursor-pointer"
            >
              Panele Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="gapsan-container py-10 space-y-6">
      <div className="bg-[#111F35] text-white rounded-[10px] p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#D6A948] text-[13px] font-semibold">
            <Shield className="w-4 h-4" />
            <span>Aktif Rol: {role}</span>
          </div>
          <h1 className="font-heading font-bold text-[26px] mt-1">
            GAPSAN Yayın ve İçerik Kontrol Paneli
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="min-h-[44px] px-4 rounded-[10px] bg-white/10 border border-white/25 text-white text-[13px] font-semibold flex items-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-[#D6A948]" />
            <span>
              Mod: {previewMode ? "Önizleme (Demo Açık)" : "Canlı Mod"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              resetStore();
              setNotice("Tüm panel verileri varsayılana sıfırlandı.");
            }}
            className="min-h-[44px] px-4 rounded-[10px] bg-white/10 border border-white/25 text-white text-[13px] font-semibold flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {notice && (
        <div
          role="status"
          className="p-4 rounded-[10px] bg-white border border-[#D6A948] text-[#111F35] text-[14px] flex items-center gap-2"
        >
          <AlertTriangle className="w-4 h-4 text-[#D6A948] shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "arac", label: "Araç İlanları" },
          { id: "gayrimenkul", label: "Gayrimenkul İlanları" },
          { id: "slayt", label: "Slayt ve Odak" },
          { id: "yorum", label: "Yorumlar & Doğrulama" },
          { id: "ayarlar", label: "İletişim & WhatsApp" },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id as AdminTab)}
            className={`min-h-[44px] px-4 rounded-[10px] text-[14px] font-semibold border cursor-pointer ${
              activeTab === t.id
                ? "bg-[#111F35] text-white border-[#111F35]"
                : "bg-white text-[#182538] border-[#E0E4EA]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Araç İlanları */}
      {activeTab === "arac" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <form
            onSubmit={handleAddVehicle}
            className="lg:col-span-5 bg-white border border-[#E0E4EA] rounded-[10px] p-5 space-y-3"
          >
            <h2 className="font-heading font-bold text-[18px] text-[#111F35] flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#D6A948]" />
              Yeni Araç İlanı Ekle
            </h2>
            <input
              type="text"
              placeholder="Başlık (Örn: 2020 Renault Megane)"
              value={vTitle}
              onChange={(e) => setVTitle(e.target.value)}
              className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Marka"
                value={vBrand}
                onChange={(e) => setVBrand(e.target.value)}
                className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
              />
              <input
                type="text"
                placeholder="Model"
                value={vModel}
                onChange={(e) => setVModel(e.target.value)}
                className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="Yıl"
                value={vYear}
                onChange={(e) => setVYear(e.target.value)}
                className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
              />
              <select
                value={vTrans}
                onChange={(e) =>
                  setVTrans(e.target.value as VehicleListing["transmission"])
                }
                className="w-full min-h-[44px] px-2 rounded-[10px] border border-[#E0E4EA] text-[14px]"
              >
                <option value="Otomatik">Otomatik</option>
                <option value="Manuel">Manuel</option>
                <option value="Yarı Otomatik">Yarı Otomatik</option>
              </select>
              <input
                type="number"
                placeholder="Km"
                value={vKm}
                onChange={(e) => setVKm(e.target.value)}
                className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Yakıt"
                value={vFuel}
                onChange={(e) => setVFuel(e.target.value)}
                className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
              />
              <input
                type="text"
                placeholder="Fiyat (Örn: 980.000 TL)"
                value={vPrice}
                onChange={(e) => setVPrice(e.target.value)}
                className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
              />
            </div>
            <div className="space-y-1.5 pt-2 text-[13px] text-[#182538]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={vEids}
                  onChange={(e) => setVEids(e.target.checked)}
                />
                EİDS kapsamı doğrulandı
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={vAuth}
                  onChange={(e) => setVAuth(e.target.checked)}
                />
                İlan yetkisi doğrulandı
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={vSource}
                  onChange={(e) => setVSource(e.target.checked)}
                />
                Kaynak ve görsel izni doğrulandı
              </label>
            </div>
            <button
              type="submit"
              className="w-full min-h-[44px] rounded-[10px] bg-[#D6A948] text-[#111F35] font-semibold text-[14px] cursor-pointer"
            >
              Taslak Olarak Kaydet
            </button>
          </form>

          <div className="lg:col-span-7 bg-white border border-[#E0E4EA] rounded-[10px] p-5 space-y-3">
            <h2 className="font-heading font-bold text-[18px] text-[#111F35]">
              Kayıtlı Araç İlanları ({vehicles.length})
            </h2>
            {vehicles.length === 0 ? (
              <p className="text-[14px] text-[#536174]">
                Henüz eklenmiş canlı araç ilanı yok. Soldaki formdan yeni ilan
                ekleyebilirsiniz.
              </p>
            ) : (
              <div className="space-y-3">
                {vehicles.map((v) => (
                  <div
                    key={v.id}
                    className="p-4 rounded-[10px] border border-[#E0E4EA] flex flex-wrap items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-semibold text-[#111F35]">{v.title}</p>
                      <p className="text-[12px] text-[#536174]">
                        Durum: <strong>{v.status}</strong> &bull;{" "}
                        {v.eidsVerified && v.authorizationVerified && v.sourceVerified
                          ? "Yayın şartları tamam"
                          : "Yetki/EİDS/Kaynak doğrulaması eksik"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(
                        [
                          "Taslak",
                          "Onay bekliyor",
                          "Yayında",
                          "Arşiv",
                        ] as PublishStatus[]
                      ).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => updateVehicleStatus(v.id, st)}
                          className={`px-2.5 py-1 rounded text-[12px] font-semibold border cursor-pointer ${
                            v.status === st
                              ? "bg-[#111F35] text-white border-[#111F35]"
                              : "bg-[#F7F5EF] text-[#182538] border-[#E0E4EA]"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setVehicles((prev) => prev.filter((x) => x.id !== v.id))
                        }
                        aria-label="Sil"
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Gayrimenkul */}
      {activeTab === "gayrimenkul" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <form
            onSubmit={handleAddRealEstate}
            className="lg:col-span-5 bg-white border border-[#E0E4EA] rounded-[10px] p-5 space-y-3"
          >
            <h2 className="font-heading font-bold text-[18px] text-[#111F35] flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#D6A948]" />
              Yeni Gayrimenkul İlanı Ekle
            </h2>
            <input
              type="text"
              placeholder="Başlık (Örn: Esenyurt Merkez 3+1 Daire)"
              value={rTitle}
              onChange={(e) => setRTitle(e.target.value)}
              className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
            />
            <div className="grid grid-cols-2 gap-2">
              <select
                value={rType}
                onChange={(e) =>
                  setRType(e.target.value as "Satılık" | "Kiralık")
                }
                className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
              >
                <option value="Satılık">Satılık</option>
                <option value="Kiralık">Kiralık</option>
              </select>
              <select
                value={rPropType}
                onChange={(e) =>
                  setRPropType(
                    e.target.value as RealEstateListing["propertyType"]
                  )
                }
                className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
              >
                <option value="Daire">Daire</option>
                <option value="İş Yeri">İş Yeri</option>
                <option value="Arsa">Arsa</option>
                <option value="Villa">Villa</option>
                <option value="Bina">Bina</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="İlçe"
                value={rDistrict}
                onChange={(e) => setRDistrict(e.target.value)}
                className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
              />
              <input
                type="number"
                placeholder="m²"
                value={rM2}
                onChange={(e) => setRM2(e.target.value)}
                className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
              />
              <input
                type="text"
                placeholder="Oda"
                value={rRooms}
                onChange={(e) => setRRooms(e.target.value)}
                className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
              />
            </div>
            <input
              type="text"
              placeholder="Fiyat (Örn: 3.450.000 TL)"
              value={rPrice}
              onChange={(e) => setRPrice(e.target.value)}
              className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
            />
            <div className="space-y-1.5 pt-2 text-[13px] text-[#182538]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rEids}
                  onChange={(e) => setREids(e.target.checked)}
                />
                EİDS kapsamı doğrulandı
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rAuth}
                  onChange={(e) => setRAuth(e.target.checked)}
                />
                İlan yetkisi doğrulandı
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rSource}
                  onChange={(e) => setRSource(e.target.checked)}
                />
                Kaynak ve görsel izni doğrulandı
              </label>
            </div>
            <button
              type="submit"
              className="w-full min-h-[44px] rounded-[10px] bg-[#D6A948] text-[#111F35] font-semibold text-[14px] cursor-pointer"
            >
              Taslak Olarak Kaydet
            </button>
          </form>

          <div className="lg:col-span-7 bg-white border border-[#E0E4EA] rounded-[10px] p-5 space-y-3">
            <h2 className="font-heading font-bold text-[18px] text-[#111F35]">
              Kayıtlı Gayrimenkul İlanları ({realEstates.length})
            </h2>
            {realEstates.length === 0 ? (
              <p className="text-[14px] text-[#536174]">
                Henüz eklenmiş canlı gayrimenkul ilanı yok.
              </p>
            ) : (
              <div className="space-y-3">
                {realEstates.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 rounded-[10px] border border-[#E0E4EA] flex flex-wrap items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-semibold text-[#111F35]">
                        {r.title} ({r.listingType})
                      </p>
                      <p className="text-[12px] text-[#536174]">
                        Durum: <strong>{r.status}</strong> &bull; {r.district}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(
                        [
                          "Taslak",
                          "Onay bekliyor",
                          "Yayında",
                          "Arşiv",
                        ] as PublishStatus[]
                      ).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => updateRealEstateStatus(r.id, st)}
                          className={`px-2.5 py-1 rounded text-[12px] font-semibold border cursor-pointer ${
                            r.status === st
                              ? "bg-[#111F35] text-white border-[#111F35]"
                              : "bg-[#F7F5EF] text-[#182538] border-[#E0E4EA]"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setRealEstates((prev) =>
                            prev.filter((x) => x.id !== r.id)
                          )
                        }
                        aria-label="Sil"
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Slayt ve Odak */}
      {activeTab === "slayt" && (
        <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-5 space-y-4">
          <h2 className="font-heading font-bold text-[18px] text-[#111F35]">
            Açılış Slaytları ve Odak Noktaları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {slides.map((s, idx) => (
              <div
                key={s.id}
                className="p-4 rounded-[10px] border border-[#E0E4EA] space-y-2"
              >
                <p className="font-semibold text-[14px] text-[#111F35]">
                  Slayt {idx + 1}
                </p>
                <input
                  type="text"
                  value={s.heading}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSlides((prev) =>
                      prev.map((x) =>
                        x.id === s.id ? { ...x, heading: val } : x
                      )
                    );
                  }}
                  className="w-full min-h-[40px] px-2.5 rounded border border-[#E0E4EA] text-[13px]"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={s.desktopFocus}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSlides((prev) =>
                        prev.map((x) =>
                          x.id === s.id ? { ...x, desktopFocus: val } : x
                        )
                      );
                    }}
                    placeholder="Masaüstü odak"
                    className="w-full min-h-[38px] px-2 rounded border border-[#E0E4EA] text-[12px]"
                  />
                  <input
                    type="text"
                    value={s.mobileFocus}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSlides((prev) =>
                        prev.map((x) =>
                          x.id === s.id ? { ...x, mobileFocus: val } : x
                        )
                      );
                    }}
                    placeholder="Mobil odak"
                    className="w-full min-h-[38px] px-2 rounded border border-[#E0E4EA] text-[12px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Yorumlar & Gizli Doğrulama */}
      {activeTab === "yorum" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <form
            onSubmit={handleAddReview}
            className="lg:col-span-5 bg-white border border-[#E0E4EA] rounded-[10px] p-5 space-y-3"
          >
            <h2 className="font-heading font-bold text-[18px] text-[#111F35]">
              Yorum ve Doğrulama Kaydı Ekle
            </h2>
            <input
              type="text"
              placeholder="Müşteri Adı / Baş Harf"
              value={revAuthor}
              onChange={(e) => setRevAuthor(e.target.value)}
              className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
            />
            <select
              value={revArea}
              onChange={(e) =>
                setRevArea(
                  e.target.value as "Otomotiv" | "Gayrimenkul" | "Sigorta"
                )
              }
              className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
            >
              <option value="Otomotiv">Otomotiv</option>
              <option value="Gayrimenkul">Gayrimenkul</option>
              <option value="Sigorta">Sigorta</option>
            </select>
            <textarea
              placeholder="Müşteri yorumu"
              value={revComment}
              onChange={(e) => setRevComment(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
            />
            <input
              type="text"
              placeholder="Gizli Doğrulama Ref (Panelde kalır)"
              value={revRef}
              onChange={(e) => setRevRef(e.target.value)}
              className="w-full min-h-[44px] px-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
            />
            <label className="flex items-center gap-2 text-[13px]">
              <input
                type="checkbox"
                checked={revMatched}
                onChange={(e) => setRevMatched(e.target.checked)}
              />
              İşlemle eşleştirildi
            </label>
            <label className="flex items-center gap-2 text-[13px]">
              <input
                type="checkbox"
                checked={revPerm}
                onChange={(e) => setRevPerm(e.target.checked)}
              />
              Yayın izni alındı
            </label>
            <button
              type="submit"
              className="w-full min-h-[44px] rounded-[10px] bg-[#D6A948] text-[#111F35] font-semibold text-[14px] cursor-pointer"
            >
              Yorumu Kaydet
            </button>
          </form>

          <div className="lg:col-span-7 bg-white border border-[#E0E4EA] rounded-[10px] p-5 space-y-3">
            <h2 className="font-heading font-bold text-[18px] text-[#111F35]">
              Kayıtlı Yorumlar ve Gizli Doğrulama Referansları
            </h2>
            {reviews.length === 0 ? (
              <p className="text-[14px] text-[#536174]">
                Henüz kayıtlı yorum bulunmuyor.
              </p>
            ) : (
              reviews.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-[10px] border border-[#E0E4EA] space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[#111F35]">
                      {r.author} ({r.area})
                    </p>
                    <span className="text-[12px] font-semibold px-2 py-0.5 rounded bg-[#F7F5EF]">
                      {r.status}
                    </span>
                  </div>
                  <p className="text-[14px] text-[#536174]">“{r.comment}”</p>
                  <p className="text-[12px] text-[#182538] bg-[#F7F5EF] px-2.5 py-1 rounded">
                    Gizli Panel Kaydı: {r.privateVerificationRef}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 5: İletişim & WhatsApp */}
      {activeTab === "ayarlar" && (
        <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 space-y-5">
          <h2 className="font-heading font-bold text-[18px] text-[#111F35]">
            Birim WhatsApp Onayları ve İnşaat Kapsamı
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(["otomotiv", "gayrimenkul", "sigorta"] as const).map((unit) => (
              <label
                key={unit}
                className="p-4 rounded-[10px] border border-[#E0E4EA] flex items-center justify-between cursor-pointer"
              >
                <div>
                  <p className="font-semibold capitalize text-[#111F35]">
                    {unit} WhatsApp
                  </p>
                  <p className="text-[12px] text-[#536174]">
                    {contact.units[unit].phoneDisplay}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={contact.units[unit].whatsappApproved}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setContact((prev) => ({
                      ...prev,
                      units: {
                        ...prev.units,
                        [unit]: {
                          ...prev.units[unit],
                          whatsappApproved: checked,
                        },
                      },
                    }));
                  }}
                  className="w-5 h-5 accent-[#111F35]"
                />
              </label>
            ))}
          </div>

          <div>
            <label
              htmlFor="const-scope"
              className="block text-[13px] font-semibold text-[#182538] mb-1.5"
            >
              Onaylı İnşaat Faaliyet Kapsamı Metni
            </label>
            <textarea
              id="const-scope"
              rows={3}
              value={constructionApprovedScope}
              onChange={(e) => setConstructionApprovedScope(e.target.value)}
              className="w-full p-3 rounded-[10px] border border-[#E0E4EA] text-[14px]"
            />
          </div>

          <p className="text-[13px] text-[#536174] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D6A948]" />
            Değişiklikler anında tarayıcı oturumuna kaydedilir.
          </p>
        </div>
      )}
    </div>
  );
}
