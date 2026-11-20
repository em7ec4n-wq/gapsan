"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import {
  CONTACT_CONFIG,
  ContactConfig,
  ConstructionProject,
  CustomerReview,
  DEMO_VEHICLE_LISTING,
  HeroSlideConfig,
  INITIAL_CONSTRUCTION_PROJECTS,
  INITIAL_HERO_SLIDES,
  INITIAL_REAL_ESTATE_LISTINGS,
  INITIAL_REVIEWS,
  INITIAL_VEHICLE_LISTINGS,
  RealEstateListing,
  VehicleListing,
} from "./gapsan-data";

export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  decided: boolean;
}

export interface GapsanStoreState {
  hydrated: boolean;
  previewMode: boolean;
  slides: HeroSlideConfig[];
  vehicles: VehicleListing[];
  demoVehicle: VehicleListing;
  realEstates: RealEstateListing[];
  projects: ConstructionProject[];
  reviews: CustomerReview[];
  contact: ContactConfig;
  constructionApprovedScope: string;
  cookiePreferences: CookiePreferences;
  cookieModalOpen: boolean;
}

interface GapsanStoreContextValue extends GapsanStoreState {
  setPreviewMode: (val: boolean) => void;
  setSlides: React.Dispatch<React.SetStateAction<HeroSlideConfig[]>>;
  setVehicles: React.Dispatch<React.SetStateAction<VehicleListing[]>>;
  setRealEstates: React.Dispatch<React.SetStateAction<RealEstateListing[]>>;
  setProjects: React.Dispatch<React.SetStateAction<ConstructionProject[]>>;
  setReviews: React.Dispatch<React.SetStateAction<CustomerReview[]>>;
  setContact: React.Dispatch<React.SetStateAction<ContactConfig>>;
  setConstructionApprovedScope: React.Dispatch<React.SetStateAction<string>>;
  saveCookiePreferences: (
    prefs: Omit<CookiePreferences, "necessary" | "decided">
  ) => void;
  setCookieModalOpen: (open: boolean) => void;
  resetStore: () => void;
}

const STORAGE_KEY = "gapsan_cms_state_v5";
const COOKIE_STORAGE_KEY = "gapsan_cookie_prefs_v1";

const DEFAULT_COOKIE_PREFS: CookiePreferences = {
  necessary: true,
  analytics: false,
  advertising: false,
  decided: false,
};

const DEFAULT_CONSTRUCTION_SCOPE =
  "İnşaat ve gayrimenkul birimimiz bünyesinde konut ve ticari alan geliştirme, taahhüt ve proje danışmanlığı faaliyetleri işletme onaylı kapsam dahilinde yürütülmektedir.";

const GapsanStoreContext = createContext<GapsanStoreContextValue | null>(null);

function sanitizeParsedContact(rawContact: Partial<ContactConfig>): ContactConfig {
  return {
    ...CONTACT_CONFIG,
    ...rawContact,
    address:
      rawContact.address && !rawContact.address.includes("Yeşil Alan")
        ? rawContact.address
        : CONTACT_CONFIG.address,
    generalEmail:
      rawContact.generalEmail &&
      !rawContact.generalEmail.includes("gapsansirketler")
        ? rawContact.generalEmail
        : CONTACT_CONFIG.generalEmail,
    insuranceEmail:
      rawContact.insuranceEmail || CONTACT_CONFIG.insuranceEmail,
    otomotivEmail:
      rawContact.otomotivEmail || CONTACT_CONFIG.otomotivEmail,
    gayrimenkulEmail:
      rawContact.gayrimenkulEmail || CONTACT_CONFIG.gayrimenkulEmail,
    emails: {
      ...CONTACT_CONFIG.emails,
      ...(rawContact.emails || {}),
    },
    socialMedia: {
      ...CONTACT_CONFIG.socialMedia,
      ...(rawContact.socialMedia || {}),
    },
    units: {
      otomotiv: {
        ...CONTACT_CONFIG.units.otomotiv,
        ...(rawContact.units?.otomotiv || {}),
      },
      gayrimenkul: {
        ...CONTACT_CONFIG.units.gayrimenkul,
        ...(rawContact.units?.gayrimenkul || {}),
      },
      sigorta: {
        ...CONTACT_CONFIG.units.sigorta,
        ...(rawContact.units?.sigorta || {}),
      },
    },
  };
}

export function GapsanStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [previewMode, setPreviewModeState] = useState<boolean>(true);
  const [slides, setSlidesState] = useState<HeroSlideConfig[]>(INITIAL_HERO_SLIDES);
  const [vehicles, setVehiclesState] = useState<VehicleListing[]>(
    INITIAL_VEHICLE_LISTINGS
  );
  const [realEstates, setRealEstatesState] = useState<RealEstateListing[]>(
    INITIAL_REAL_ESTATE_LISTINGS
  );
  const [projects, setProjectsState] = useState<ConstructionProject[]>(
    INITIAL_CONSTRUCTION_PROJECTS
  );
  const [reviews, setReviewsState] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [contact, setContactState] = useState<ContactConfig>(CONTACT_CONFIG);
  const [constructionApprovedScope, setConstructionApprovedScopeState] =
    useState<string>(DEFAULT_CONSTRUCTION_SCOPE);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(
    DEFAULT_COOKIE_PREFS
  );
  const [cookieModalOpen, setCookieModalOpen] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  const isDirtyRef = useRef<boolean>(false);
  const updatedAtRef = useRef<number>(0);

  const applyParsedState = useCallback((parsed: Record<string, unknown>) => {
    if (typeof parsed.updatedAt === "number") {
      updatedAtRef.current = parsed.updatedAt;
    }
    if (typeof parsed.previewMode === "boolean") {
      setPreviewModeState(parsed.previewMode);
    }
    if (Array.isArray(parsed.slides) && parsed.slides.length > 0) {
      const hasLegacyCopy = (parsed.slides as HeroSlideConfig[]).some(
        (s) =>
          s.heading?.toLowerCase().includes("gayrimenkul") ||
          s.ctaHref === "/gayrimenkul"
      );
      setSlidesState(hasLegacyCopy ? INITIAL_HERO_SLIDES : (parsed.slides as HeroSlideConfig[]));
    }
    if (Array.isArray(parsed.vehicles) && parsed.vehicles.length > 0) {
      setVehiclesState(parsed.vehicles as VehicleListing[]);
    }
    if (Array.isArray(parsed.realEstates) && parsed.realEstates.length > 0) {
      setRealEstatesState(parsed.realEstates as RealEstateListing[]);
    }
    if (Array.isArray(parsed.projects) && parsed.projects.length > 0) {
      setProjectsState(parsed.projects as ConstructionProject[]);
    }
    if (Array.isArray(parsed.reviews)) {
      setReviewsState(parsed.reviews as CustomerReview[]);
    }
    if (parsed.contact && typeof parsed.contact === "object") {
      setContactState(sanitizeParsedContact(parsed.contact as Partial<ContactConfig>));
    }
    if (typeof parsed.constructionApprovedScope === "string") {
      setConstructionApprovedScopeState(parsed.constructionApprovedScope);
    }
  }, []);

  useEffect(() => {
    let localTimestamp = 0;
    let localVehiclesCount = 0;
    let localRealEstatesCount = 0;

    try {
      ["gapsan_cms_state_v1", "gapsan_cms_state_v2", "gapsan_cms_state_v3"].forEach(
        (legacyKey) => {
          try {
            localStorage.removeItem(legacyKey);
          } catch {
            // ignore
          }
        }
      );

      const savedV5 = localStorage.getItem(STORAGE_KEY);
      if (savedV5) {
        const parsed = JSON.parse(savedV5);
        localTimestamp = typeof parsed.updatedAt === "number" ? parsed.updatedAt : 0;
        localVehiclesCount = Array.isArray(parsed.vehicles) ? parsed.vehicles.length : 0;
        localRealEstatesCount = Array.isArray(parsed.realEstates) ? parsed.realEstates.length : 0;
        applyParsedState(parsed);
      } else {
        // Migrate any user-created items from v4 and merge with the new demo listings
        const savedV4 = localStorage.getItem("gapsan_cms_state_v4");
        if (savedV4) {
          const parsedV4 = JSON.parse(savedV4);
          const v4Vehicles: VehicleListing[] = Array.isArray(parsedV4.vehicles)
            ? parsedV4.vehicles
            : [];
          const v4RealEstates: RealEstateListing[] = Array.isArray(parsedV4.realEstates)
            ? parsedV4.realEstates
            : [];
          const mergedVehicles = [
            ...v4Vehicles,
            ...INITIAL_VEHICLE_LISTINGS.filter(
              (initV) => !v4Vehicles.some((x) => x.id === initV.id)
            ),
          ];
          const mergedRealEstates = [
            ...v4RealEstates,
            ...INITIAL_REAL_ESTATE_LISTINGS.filter(
              (initR) => !v4RealEstates.some((x) => x.id === initR.id)
            ),
          ];
          applyParsedState({
            ...parsedV4,
            vehicles: mergedVehicles,
            realEstates: mergedRealEstates,
            projects: INITIAL_CONSTRUCTION_PROJECTS,
          });
          localStorage.removeItem("gapsan_cms_state_v4");
        }
      }

      const savedCookies = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (savedCookies) {
        const parsedCookies = JSON.parse(savedCookies);
        setCookiePreferences({
          necessary: true,
          analytics: Boolean(parsedCookies.analytics),
          advertising: Boolean(parsedCookies.advertising),
          decided: Boolean(parsedCookies.decided),
        });
      }
    } catch {
      // ignore local storage errors
    } finally {
      setHydrated(true);
    }

    // Fetch live shared state from cloud API
    fetch("/api/cms", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!json?.data || isDirtyRef.current) return;
        const cloudData = json.data;
        const cloudTimestamp =
          typeof cloudData.updatedAt === "number" ? cloudData.updatedAt : 0;
        const cloudVehiclesCount = Array.isArray(cloudData.vehicles)
          ? cloudData.vehicles.length
          : 0;
        const cloudRealEstatesCount = Array.isArray(cloudData.realEstates)
          ? cloudData.realEstates.length
          : 0;

        if (
          cloudTimestamp >= localTimestamp ||
          (localVehiclesCount === 0 && cloudVehiclesCount > 0) ||
          (localRealEstatesCount === 0 && cloudRealEstatesCount > 0)
        ) {
          applyParsedState(cloudData);
        }
      })
      .catch(() => {
        // ignore network error
      });
  }, [applyParsedState]);

  useEffect(() => {
    if (!hydrated) return;
    const payload = {
      updatedAt: updatedAtRef.current || Date.now(),
      previewMode,
      slides,
      vehicles,
      realEstates,
      projects,
      reviews,
      contact,
      constructionApprovedScope,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore storage write errors
    }

    if (!isDirtyRef.current) return;

    const timer = setTimeout(() => {
      fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {
        // ignore
      });
    }, 350);

    return () => clearTimeout(timer);
  }, [
    hydrated,
    previewMode,
    slides,
    vehicles,
    realEstates,
    projects,
    reviews,
    contact,
    constructionApprovedScope,
  ]);

  const markDirty = useCallback(() => {
    isDirtyRef.current = true;
    updatedAtRef.current = Date.now();
  }, []);

  const setPreviewMode = useCallback(
    (val: boolean) => {
      markDirty();
      setPreviewModeState(val);
    },
    [markDirty]
  );

  const setSlides: React.Dispatch<React.SetStateAction<HeroSlideConfig[]>> =
    useCallback(
      (action) => {
        markDirty();
        setSlidesState(action);
      },
      [markDirty]
    );

  const setVehicles: React.Dispatch<React.SetStateAction<VehicleListing[]>> =
    useCallback(
      (action) => {
        markDirty();
        setVehiclesState(action);
      },
      [markDirty]
    );

  const setRealEstates: React.Dispatch<React.SetStateAction<RealEstateListing[]>> =
    useCallback(
      (action) => {
        markDirty();
        setRealEstatesState(action);
      },
      [markDirty]
    );

  const setProjects: React.Dispatch<React.SetStateAction<ConstructionProject[]>> =
    useCallback(
      (action) => {
        markDirty();
        setProjectsState(action);
      },
      [markDirty]
    );

  const setReviews: React.Dispatch<React.SetStateAction<CustomerReview[]>> =
    useCallback(
      (action) => {
        markDirty();
        setReviewsState(action);
      },
      [markDirty]
    );

  const setContact: React.Dispatch<React.SetStateAction<ContactConfig>> =
    useCallback(
      (action) => {
        markDirty();
        setContactState(action);
      },
      [markDirty]
    );

  const setConstructionApprovedScope: React.Dispatch<React.SetStateAction<string>> =
    useCallback(
      (action) => {
        markDirty();
        setConstructionApprovedScopeState(action);
      },
      [markDirty]
    );

  const saveCookiePreferences = useCallback(
    (prefs: Omit<CookiePreferences, "necessary" | "decided">) => {
      const next: CookiePreferences = {
        necessary: true,
        analytics: prefs.analytics,
        advertising: prefs.advertising,
        decided: true,
      };
      setCookiePreferences(next);
      setCookieModalOpen(false);
      try {
        localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
    },
    []
  );

  const resetStore = useCallback(() => {
    markDirty();
    setPreviewModeState(true);
    setSlidesState(INITIAL_HERO_SLIDES);
    setVehiclesState(INITIAL_VEHICLE_LISTINGS);
    setRealEstatesState(INITIAL_REAL_ESTATE_LISTINGS);
    setProjectsState(INITIAL_CONSTRUCTION_PROJECTS);
    setReviewsState(INITIAL_REVIEWS);
    setContactState(CONTACT_CONFIG);
    setConstructionApprovedScopeState(DEFAULT_CONSTRUCTION_SCOPE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, [markDirty]);

  return (
    <GapsanStoreContext.Provider
      value={{
        hydrated,
        previewMode,
        setPreviewMode,
        slides,
        setSlides,
        vehicles,
        demoVehicle: DEMO_VEHICLE_LISTING,
        setVehicles,
        realEstates,
        setRealEstates,
        projects,
        setProjects,
        reviews,
        setReviews,
        contact,
        setContact,
        constructionApprovedScope,
        setConstructionApprovedScope,
        cookiePreferences,
        saveCookiePreferences,
        cookieModalOpen,
        setCookieModalOpen,
        resetStore,
      }}
    >
      {children}
    </GapsanStoreContext.Provider>
  );
}

export function useGapsanStore() {
  const ctx = useContext(GapsanStoreContext);
  if (!ctx) {
    throw new Error("useGapsanStore must be used within GapsanStoreProvider");
  }
  return ctx;
}
