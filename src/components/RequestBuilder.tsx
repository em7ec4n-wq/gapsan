"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Car,
  Building2,
  ShieldCheck,
  ChevronRight,
  Copy,
  Check,
  Phone,
  MessageCircle,
  Edit3,
  AlertCircle,
  Info,
} from "lucide-react";
import {
  APPROVED_INSURANCE_TYPES,
  BusinessArea,
  REAL_ESTATE_REQUEST_TYPES,
  SITE_URL,
  VEHICLE_REQUEST_TYPES,
} from "@/lib/gapsan-data";
import { useGapsanStore } from "@/lib/gapsan-store";

interface RequestBuilderProps {
  initialArea?: BusinessArea;
  lockedArea?: BusinessArea;
  sectionId?: string;
  compactHeader?: boolean;
}

const SESSION_KEY = "gapsan_request_session_v1";

export default function RequestBuilder({
  initialArea = "otomotiv",
  lockedArea,
  sectionId = "talep",
  compactHeader = false,
}: RequestBuilderProps) {
  const searchParams = useSearchParams();
  const { previewMode, vehicles, demoVehicle, realEstates, contact } =
    useGapsanStore();

  const publishedVehicles = useMemo(
    () => vehicles.filter((v) => v.status === "Yayında" && v.isAvailable),
    [vehicles]
  );

  const publishedRealEstates = useMemo(
    () => realEstates.filter((r) => r.status === "Yayında" && r.isAvailable),
    [realEstates]
  );

  // Determine initial demo state on home page when previewMode is true and no query params
  const hasQueryArea = Boolean(searchParams.get("alan"));
  const hasQueryIlan = Boolean(searchParams.get("ilan"));

  const [area, setArea] = useState<BusinessArea>(lockedArea ?? initialArea);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(
    !lockedArea && previewMode && !hasQueryArea && !hasQueryIlan
  );

  // Form fields
  const [vehicleRequestType, setVehicleRequestType] = useState<string>(
    !lockedArea && previewMode && !hasQueryArea && !hasQueryIlan
      ? "Araç alımı"
      : ""
  );
  const [selectedVehicleSlug, setSelectedVehicleSlug] = useState<string>(
    !lockedArea && previewMode && !hasQueryArea && !hasQueryIlan
      ? demoVehicle.slug
      : ""
  );
  const [brandModel, setBrandModel] = useState<string>("");
  const [modelYear, setModelYear] = useState<string>("");
  const [mileage, setMileage] = useState<string>("");

  const [realEstateType, setRealEstateType] = useState<string>("");
  const [selectedRealEstateSlug, setSelectedRealEstateSlug] =
    useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [areaM2, setAreaM2] = useState<string>("");

  const [insuranceType, setInsuranceType] = useState<string>("");

  // Summary & validation state
  const [summaryOpen, setSummaryOpen] = useState<boolean>(
    !lockedArea && previewMode && !hasQueryArea && !hasQueryIlan
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [demoModalOpen, setDemoModalOpen] = useState<boolean>(false);

  const summaryRef = useRef<HTMLDivElement>(null);
  const inputsRef = useRef<HTMLDivElement>(null);

  // Sync from URL query params (?alan=otomotiv&ilan=slug)
  useEffect(() => {
    const qArea = searchParams.get("alan") as BusinessArea | null;
    const qIlan = searchParams.get("ilan");

    if (qArea && ["otomotiv", "gayrimenkul", "sigorta"].includes(qArea)) {
      if (!lockedArea) {
        setArea(qArea);
        setIsDemoMode(false);
        setSummaryOpen(false);
      }
      if (qArea === "otomotiv" && qIlan) {
        setVehicleRequestType("Araç alımı");
        setSelectedVehicleSlug(qIlan);
      } else if (qArea === "gayrimenkul" && qIlan) {
        setSelectedRealEstateSlug(qIlan);
        const found = publishedRealEstates.find((r) => r.slug === qIlan);
        if (found) {
          setRealEstateType(found.listingType);
          setDistrict(found.district);
          if (found.areaM2) setAreaM2(String(found.areaM2));
        }
      }
      return;
    }

    // Restore minimal session state (only business line, request type, listing id)
    if (!lockedArea) {
      try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (
            parsed.area &&
            ["otomotiv", "gayrimenkul", "sigorta"].includes(parsed.area)
          ) {
            setArea(parsed.area);
            setIsDemoMode(false);
            setSummaryOpen(false);
            if (parsed.area === "otomotiv") {
              setVehicleRequestType(parsed.requestType || "");
              setSelectedVehicleSlug(parsed.listingId || "");
            } else if (parsed.area === "gayrimenkul") {
              setRealEstateType(parsed.requestType || "");
              setSelectedRealEstateSlug(parsed.listingId || "");
            } else if (parsed.area === "sigorta") {
              setInsuranceType(parsed.requestType || "");
            }
          }
        }
      } catch {
        // ignore
      }
    }
  }, [searchParams, lockedArea, publishedRealEstates]);

  // Persist only business line, request type, and listing ID in sessionStorage
  const saveMinimalSession = (
    nextArea: BusinessArea,
    nextRequestType: string,
    nextListingId: string
  ) => {
    try {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          area: nextArea,
          requestType: nextRequestType,
          listingId: nextListingId,
        })
      );
    } catch {
      // ignore
    }
  };

  const invalidateSummary = () => {
    setIsDemoMode(false);
    setSummaryOpen(false);
    setErrors([]);
    setCopied(false);
    setDemoModalOpen(false);
  };

  const handleTabChange = (nextArea: BusinessArea) => {
    if (lockedArea) return;
    setArea(nextArea);
    invalidateSummary();
    saveMinimalSession(nextArea, "", "");
  };

  // Validate form
  const validate = (): string[] => {
    const nextErrors: string[] = [];
    const maxYear = new Date().getFullYear() + 1;

    if (area === "otomotiv") {
      if (!vehicleRequestType) {
        nextErrors.push("Lütfen talep türünü seçin.");
      }
      if (
        vehicleRequestType === "Araç satışı" ||
        vehicleRequestType === "Takas"
      ) {
        const trimmedBrand = brandModel.trim();
        if (trimmedBrand.length < 2 || trimmedBrand.length > 80) {
          nextErrors.push("Lütfen marka ve model girin (2–80 karakter).");
        }
        const yearNum = Number(modelYear);
        if (
          !modelYear.trim() ||
          !/^\d{4}$/.test(modelYear.trim()) ||
          yearNum < 1900 ||
          yearNum > maxYear
        ) {
          nextErrors.push("Geçerli bir model yılı girin.");
        }
        if (mileage.trim() !== "") {
          const kmNum = Number(mileage.trim());
          if (!Number.isInteger(kmNum) || kmNum < 0) {
            nextErrors.push(
              "Kilometre sıfır veya daha büyük bir tam sayı olmalı."
            );
          }
        }
      }
    } else if (area === "gayrimenkul") {
      if (!realEstateType) {
        nextErrors.push("Lütfen talep türünü seçin.");
      }
      const trimmedDist = district.trim();
      if (trimmedDist.length < 2 || trimmedDist.length > 60) {
        nextErrors.push("Lütfen ilçe girin.");
      }
      if (areaM2.trim() !== "") {
        const m2Num = Number(areaM2.trim());
        if (Number.isNaN(m2Num) || m2Num <= 0) {
          nextErrors.push("Metrekare sıfırdan büyük olmalı.");
        }
      }
    } else if (area === "sigorta") {
      if (!insuranceType) {
        nextErrors.push("Lütfen talep türünü seçin.");
      }
    }

    return nextErrors;
  };

  const handleShowSummary = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setSummaryOpen(false);
      return;
    }

    setErrors([]);
    setIsDemoMode(false);
    setSummaryOpen(true);

    const reqType =
      area === "otomotiv"
        ? vehicleRequestType
        : area === "gayrimenkul"
        ? realEstateType
        : insuranceType;
    const listingId =
      area === "otomotiv"
        ? selectedVehicleSlug
        : area === "gayrimenkul"
        ? selectedRealEstateSlug
        : "";
    saveMinimalSession(area, reqType, listingId);

    setTimeout(() => {
      summaryRef.current?.focus();
    }, 30);
  };

  const handleEditSelections = () => {
    setSummaryOpen(false);
    setDemoModalOpen(false);
    setTimeout(() => {
      inputsRef.current?.focus();
    }, 30);
  };

  // Build exact message string
  const selectedVehicleObj = useMemo(() => {
    if (!selectedVehicleSlug) return null;
    if (selectedVehicleSlug === demoVehicle.slug) return demoVehicle;
    return publishedVehicles.find((v) => v.slug === selectedVehicleSlug) ?? null;
  }, [selectedVehicleSlug, demoVehicle, publishedVehicles]);

  const selectedRealEstateObj = useMemo(() => {
    if (!selectedRealEstateSlug) return null;
    return (
      publishedRealEstates.find((r) => r.slug === selectedRealEstateSlug) ?? null
    );
  }, [selectedRealEstateSlug, publishedRealEstates]);

  const generatedMessage = useMemo(() => {
    if (area === "otomotiv") {
      const parts: string[] = [];
      if (selectedVehicleObj) {
        if (selectedVehicleObj.isExample || selectedVehicleObj.status !== "Yayında") {
          parts.push(selectedVehicleObj.title);
        } else {
          parts.push(
            `${selectedVehicleObj.title} (${SITE_URL}/otomotiv/ilan/${selectedVehicleObj.slug})`
          );
        }
      }
      const vehicleDetails: string[] = [];
      if (brandModel.trim()) vehicleDetails.push(brandModel.trim());
      if (modelYear.trim()) vehicleDetails.push(modelYear.trim());
      if (mileage.trim()) vehicleDetails.push(`${mileage.trim()} km`);
      if (vehicleDetails.length > 0) {
        parts.push(vehicleDetails.join(", "));
      }

      const middle = parts.length > 0 ? ` ${parts.join(" - ")}.` : "";
      return `Merhaba Gapşan Otomotiv, ${
        vehicleRequestType || "Araç alımı"
      } hakkında bilgi rica ediyorum.${middle} Güncel bilgi verebilir misiniz?`;
    }

    if (area === "gayrimenkul") {
      const extras: string[] = [];
      if (areaM2.trim()) extras.push(`${areaM2.trim()} m² tercihi`);
      if (
        selectedRealEstateObj &&
        selectedRealEstateObj.status === "Yayında" &&
        !selectedRealEstateObj.isExample
      ) {
        extras.push(
          `${selectedRealEstateObj.title} (${SITE_URL}/gayrimenkul/ilan/${selectedRealEstateObj.slug})`
        );
      }
      const extraText = extras.length > 0 ? ` ${extras.join(" - ")}.` : "";
      return `Merhaba Gapşan Gayrimenkul, ${district.trim()} bölgesinde ${realEstateType} seçeneklerle ilgileniyorum.${extraText} Bilgi alabilir miyim?`;
    }

    return `Merhaba Gapşan Sigorta, ${insuranceType} için teklif süreci hakkında bilgi rica ediyorum.`;
  }, [
    area,
    vehicleRequestType,
    selectedVehicleObj,
    brandModel,
    modelYear,
    mileage,
    district,
    realEstateType,
    areaM2,
    selectedRealEstateObj,
    insuranceType,
  ]);

  const unitInfo = contact.units[area];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <section
      id={sectionId}
      className="gapsan-container py-10 max-[768px]:py-7"
      aria-labelledby={`${sectionId}-heading`}
    >
      <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-6 md:p-8 shadow-sm">
        {!compactHeader && (
          <div className="mb-6">
            <h2
              id={`${sectionId}-heading`}
              className="gapsan-h2 text-[#111F35]"
            >
              Talebinizi Oluşturun
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 55% (~7 cols on 12-col grid) */}
          <div
            ref={inputsRef}
            tabIndex={-1}
            className="lg:col-span-7 focus-visible:outline-none"
          >
            {/* Tabs */}
            {!lockedArea && (
              <div
                className="grid grid-cols-3 gap-2.5 mb-5"
                role="tablist"
                aria-label="İş kolu seçimi"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={area === "otomotiv"}
                  onClick={() => handleTabChange("otomotiv")}
                  className={`min-h-[44px] px-2 sm:px-3 rounded-[10px] border text-[12px] sm:text-[14px] font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-colors cursor-pointer ${
                    area === "otomotiv"
                      ? "bg-[#111F35] text-white border-[#111F35]"
                      : "bg-[#F7F5EF] text-[#182538] border-[#E0E4EA] hover:bg-white"
                  }`}
                >
                  <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
                  <span>Otomotiv</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={area === "gayrimenkul"}
                  onClick={() => handleTabChange("gayrimenkul")}
                  className={`min-h-[44px] px-2 sm:px-3 rounded-[10px] border text-[12px] sm:text-[14px] font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-colors cursor-pointer ${
                    area === "gayrimenkul"
                      ? "bg-[#111F35] text-white border-[#111F35]"
                      : "bg-[#F7F5EF] text-[#182538] border-[#E0E4EA] hover:bg-white"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
                  <span>Gayrimenkul</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={area === "sigorta"}
                  onClick={() => handleTabChange("sigorta")}
                  className={`min-h-[44px] px-2 sm:px-3 rounded-[10px] border text-[12px] sm:text-[14px] font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-colors cursor-pointer ${
                    area === "sigorta"
                      ? "bg-[#111F35] text-white border-[#111F35]"
                      : "bg-[#F7F5EF] text-[#182538] border-[#E0E4EA] hover:bg-white"
                  }`}
                >
                  <ShieldCheck
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Sigorta</span>
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleShowSummary} noValidate className="space-y-4">
              {area === "otomotiv" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`${sectionId}-ot-type`}
                        className="block text-[13px] font-semibold text-[#182538] mb-1.5"
                      >
                        Talep Türü *
                      </label>
                      <select
                        id={`${sectionId}-ot-type`}
                        value={vehicleRequestType}
                        onChange={(e) => {
                          setVehicleRequestType(e.target.value);
                          invalidateSummary();
                        }}
                        className="w-full min-h-[44px] px-3.5 rounded-[10px] border border-[#E0E4EA] bg-white text-[#182538] text-[15px]"
                      >
                        <option value="">Talep türü seçin</option>
                        {VEHICLE_REQUEST_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    {vehicleRequestType === "Araç alımı" ||
                    vehicleRequestType === "" ? (
                      <div>
                        <label
                          htmlFor={`${sectionId}-ot-listing`}
                          className="block text-[13px] font-semibold text-[#182538] mb-1.5"
                        >
                          İlan Seçimi (İsteğe bağlı)
                        </label>
                        <select
                          id={`${sectionId}-ot-listing`}
                          value={selectedVehicleSlug}
                          onChange={(e) => {
                            setSelectedVehicleSlug(e.target.value);
                            invalidateSummary();
                          }}
                          className="w-full min-h-[44px] px-3.5 rounded-[10px] border border-[#E0E4EA] bg-white text-[#182538] text-[15px]"
                        >
                          <option value="">Genel araç alım talebi</option>
                          {publishedVehicles.map((v) => (
                            <option key={v.id} value={v.slug}>
                              {v.title}
                            </option>
                          ))}
                          {previewMode && (
                            <option value={demoVehicle.slug}>
                              {demoVehicle.title} (Örnek)
                            </option>
                          )}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label
                          htmlFor={`${sectionId}-ot-brand`}
                          className="block text-[13px] font-semibold text-[#182538] mb-1.5"
                        >
                          Marka ve Model *
                        </label>
                        <input
                          id={`${sectionId}-ot-brand`}
                          type="text"
                          value={brandModel}
                          onChange={(e) => {
                            setBrandModel(e.target.value);
                            invalidateSummary();
                          }}
                          placeholder="Örn: Volkswagen Passat"
                          maxLength={80}
                          className="w-full min-h-[44px] px-3.5 rounded-[10px] border border-[#E0E4EA] bg-white text-[#182538] text-[15px]"
                        />
                      </div>
                    )}
                  </div>

                  {(vehicleRequestType === "Araç satışı" ||
                    vehicleRequestType === "Takas") && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor={`${sectionId}-ot-year`}
                          className="block text-[13px] font-semibold text-[#182538] mb-1.5"
                        >
                          Model Yılı *
                        </label>
                        <input
                          id={`${sectionId}-ot-year`}
                          type="number"
                          inputMode="numeric"
                          value={modelYear}
                          onChange={(e) => {
                            setModelYear(e.target.value);
                            invalidateSummary();
                          }}
                          placeholder="Örn: 2017"
                          className="w-full min-h-[44px] px-3.5 rounded-[10px] border border-[#E0E4EA] bg-white text-[#182538] text-[15px]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`${sectionId}-ot-km`}
                          className="block text-[13px] font-semibold text-[#182538] mb-1.5"
                        >
                          Kilometre (İsteğe bağlı)
                        </label>
                        <input
                          id={`${sectionId}-ot-km`}
                          type="number"
                          inputMode="numeric"
                          value={mileage}
                          onChange={(e) => {
                            setMileage(e.target.value);
                            invalidateSummary();
                          }}
                          placeholder="Örn: 125000"
                          className="w-full min-h-[44px] px-3.5 rounded-[10px] border border-[#E0E4EA] bg-white text-[#182538] text-[15px]"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {area === "gayrimenkul" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`${sectionId}-re-type`}
                        className="block text-[13px] font-semibold text-[#182538] mb-1.5"
                      >
                        İşlem Türü *
                      </label>
                      <select
                        id={`${sectionId}-re-type`}
                        value={realEstateType}
                        onChange={(e) => {
                          setRealEstateType(e.target.value);
                          invalidateSummary();
                        }}
                        className="w-full min-h-[44px] px-3.5 rounded-[10px] border border-[#E0E4EA] bg-white text-[#182538] text-[15px]"
                      >
                        <option value="">İşlem türü seçin</option>
                        {REAL_ESTATE_REQUEST_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor={`${sectionId}-re-district`}
                        className="block text-[13px] font-semibold text-[#182538] mb-1.5"
                      >
                        İlçe *
                      </label>
                      <input
                        id={`${sectionId}-re-district`}
                        type="text"
                        value={district}
                        onChange={(e) => {
                          setDistrict(e.target.value);
                          invalidateSummary();
                        }}
                        placeholder="Örn: Esenyurt"
                        maxLength={60}
                        className="w-full min-h-[44px] px-3.5 rounded-[10px] border border-[#E0E4EA] bg-white text-[#182538] text-[15px]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`${sectionId}-re-m2`}
                        className="block text-[13px] font-semibold text-[#182538] mb-1.5"
                      >
                        Metrekare Tercihi (İsteğe bağlı)
                      </label>
                      <input
                        id={`${sectionId}-re-m2`}
                        type="number"
                        inputMode="numeric"
                        value={areaM2}
                        onChange={(e) => {
                          setAreaM2(e.target.value);
                          invalidateSummary();
                        }}
                        placeholder="Örn: 110"
                        className="w-full min-h-[44px] px-3.5 rounded-[10px] border border-[#E0E4EA] bg-white text-[#182538] text-[15px]"
                      />
                    </div>
                    {publishedRealEstates.length > 0 && (
                      <div>
                        <label
                          htmlFor={`${sectionId}-re-listing`}
                          className="block text-[13px] font-semibold text-[#182538] mb-1.5"
                        >
                          İlan Seçimi (İsteğe bağlı)
                        </label>
                        <select
                          id={`${sectionId}-re-listing`}
                          value={selectedRealEstateSlug}
                          onChange={(e) => {
                            setSelectedRealEstateSlug(e.target.value);
                            invalidateSummary();
                          }}
                          className="w-full min-h-[44px] px-3.5 rounded-[10px] border border-[#E0E4EA] bg-white text-[#182538] text-[15px]"
                        >
                          <option value="">Genel gayrimenkul talebi</option>
                          {publishedRealEstates.map((r) => (
                            <option key={r.id} value={r.slug}>
                              {r.title} ({r.district})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </>
              )}

              {area === "sigorta" && (
                <div>
                  <label
                    htmlFor={`${sectionId}-ins-type`}
                    className="block text-[13px] font-semibold text-[#182538] mb-1.5"
                  >
                    Sigorta Türü *
                  </label>
                  <select
                    id={`${sectionId}-ins-type`}
                    value={insuranceType}
                    onChange={(e) => {
                      setInsuranceType(e.target.value);
                      invalidateSummary();
                    }}
                    className="w-full min-h-[44px] px-3.5 rounded-[10px] border border-[#E0E4EA] bg-white text-[#182538] text-[15px]"
                  >
                    <option value="">Sigorta türü seçin</option>
                    {APPROVED_INSURANCE_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-[12px] text-[#536174]">
                    Ön talep aşamasında kimlik numarası, plaka veya sağlık
                    bilgisi istenmez.
                  </p>
                </div>
              )}

              {errors.length > 0 && (
                <div
                  role="alert"
                  className="p-3.5 rounded-[10px] bg-red-50 border border-red-200 text-red-800 text-[14px] space-y-1"
                >
                  {errors.map((err, i) => (
                    <p key={i} className="flex items-center gap-2">
                      <AlertCircle
                        className="w-4 h-4 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{err}</span>
                    </p>
                  ))}
                </div>
              )}

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 rounded-[10px] bg-[#111F35] hover:bg-[#1b2e4b] text-white font-semibold text-[15px] transition-colors cursor-pointer"
                >
                  <span>Özeti Gör</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </form>

            {/* KVKK & WhatsApp Transition Info */}
            <p className="mt-4 text-[12px] text-[#536174] flex items-start gap-1.5 leading-relaxed">
              <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#111F35]" aria-hidden="true" />
              <span>
                Talep özetiniz yalnızca ilgili birime iletilmek üzere
                hazırlanır; onaylı hatlarda WhatsApp uygulamasına geçiş yapılır.{" "}
                <Link
                  href="/kvkk-aydinlatma"
                  className="text-[#111F35] underline font-medium"
                >
                  KVKK Aydınlatma Metni
                </Link>
              </span>
            </p>
          </div>

          {/* Right Column: 45% (~5 cols) Navy Result Panel */}
          <div
            ref={summaryRef}
            tabIndex={-1}
            aria-live="polite"
            className="lg:col-span-5 bg-[#111F35] text-white rounded-[10px] p-5 md:p-6 focus-visible:outline-[#D6A948]"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="font-heading font-bold text-[20px] text-white">
                Talep Özeti
              </h3>
              {isDemoMode && (
                <span className="px-2.5 py-0.5 rounded bg-[#D6A948]/20 border border-[#D6A948]/50 text-[#D6A948] text-[12px] font-semibold">
                  Örnek
                </span>
              )}
            </div>

            {summaryOpen ? (
              <div className="space-y-4">
                <div className="space-y-2 text-[14px] text-white/90 border-b border-white/15 pb-4">
                  {area === "otomotiv" && (
                    <>
                      <p className="flex items-center gap-2">
                        <Car
                          className="w-4 h-4 text-[#D6A948] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{vehicleRequestType || "Araç alımı"}</span>
                      </p>
                      {selectedVehicleObj && (
                        <p className="font-medium text-white">
                          {selectedVehicleObj.title}
                        </p>
                      )}
                      {(brandModel.trim() || modelYear.trim()) && (
                        <p>
                          {[
                            brandModel.trim(),
                            modelYear.trim(),
                            mileage.trim() ? `${mileage.trim()} km` : "",
                          ]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                      )}
                    </>
                  )}

                  {area === "gayrimenkul" && (
                    <>
                      <p className="flex items-center gap-2">
                        <Building2
                          className="w-4 h-4 text-[#D6A948] shrink-0"
                          aria-hidden="true"
                        />
                        <span>
                          {realEstateType} — {district}
                        </span>
                      </p>
                      {areaM2.trim() && <p>Tercih: {areaM2.trim()} m²</p>}
                      {selectedRealEstateObj && (
                        <p className="font-medium text-white">
                          {selectedRealEstateObj.title}
                        </p>
                      )}
                    </>
                  )}

                  {area === "sigorta" && (
                    <p className="flex items-center gap-2">
                      <ShieldCheck
                        className="w-4 h-4 text-[#D6A948] shrink-0"
                        aria-hidden="true"
                      />
                      <span>{insuranceType} Sigortası Talebi</span>
                    </p>
                  )}
                </div>

                {isDemoMode ? (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setDemoModalOpen((prev) => !prev)}
                      className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-semibold text-[15px] transition-colors cursor-pointer"
                    >
                      <span>Fiyat Teklifi İste</span>
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>

                    {demoModalOpen && (
                      <div className="p-3.5 rounded-[10px] bg-white/10 border border-white/15 text-[13px] text-white/90 space-y-2">
                        <p className="font-semibold text-[#D6A948]">
                          Örnek Mesaj Taslağı
                        </p>
                        <p className="leading-relaxed">{generatedMessage}</p>
                        <div className="pt-1 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={handleCopy}
                            className="inline-flex items-center gap-1.5 min-h-[38px] px-3 rounded bg-white text-[#111F35] font-semibold text-[12px] cursor-pointer"
                          >
                            {copied ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>{copied ? "Kopyalandı" : "Özeti Kopyala"}</span>
                          </button>
                          <a
                            href={unitInfo.phoneTel}
                            className="inline-flex items-center gap-1.5 min-h-[38px] px-3 rounded border border-white/30 text-white font-medium text-[12px]"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Birimi Ara ({unitInfo.phoneDisplay})</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 rounded-[10px] bg-white/10 border border-white/15 text-[13px] text-white/90 leading-relaxed">
                      {generatedMessage}
                    </div>

                    {unitInfo.whatsappApproved ? (
                      <a
                        href={`https://wa.me/${
                          unitInfo.whatsappNumber
                        }?text=${encodeURIComponent(generatedMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-semibold text-[15px] transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>WhatsApp ile İlet</span>
                      </a>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={handleCopy}
                          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 rounded-[10px] bg-[#D6A948] hover:bg-[#c59836] text-[#111F35] font-semibold text-[14px] cursor-pointer"
                        >
                          {copied ? (
                            <Check className="w-4 h-4" aria-hidden="true" />
                          ) : (
                            <Copy className="w-4 h-4" aria-hidden="true" />
                          )}
                          <span>{copied ? "Kopyalandı" : "Özeti Kopyala"}</span>
                        </button>
                        <a
                          href={unitInfo.phoneTel}
                          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 rounded-[10px] border border-white/30 hover:bg-white/10 text-white font-semibold text-[14px]"
                        >
                          <Phone className="w-4 h-4" aria-hidden="true" />
                          <span>Birimi Ara</span>
                        </a>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleEditSelections}
                      className="inline-flex items-center gap-1.5 text-[13px] text-white/80 hover:text-white underline underline-offset-4 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Seçimleri Düzenle</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-4 text-[14px] text-white/75 space-y-3">
                <p>
                  Sol taraftan iş kolu ve talep detaylarını seçip{" "}
                  <strong className="text-white">“Özeti Gör”</strong> butonuna
                  tıkladığınızda talep özetiniz burada hazırlanır.
                </p>
                <p className="text-[12px] text-white/60">
                  Birim hattı: {unitInfo.phoneDisplay}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
