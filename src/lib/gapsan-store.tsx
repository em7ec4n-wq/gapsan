"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
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
  saveCookiePreferences: (prefs: Omit<CookiePreferences, "necessary" | "decided">) => void;
  setCookieModalOpen: (open: boolean) => void;
  resetStore: () => void;
}

const STORAGE_KEY = "gapsan_cms_state_v1";
const COOKIE_STORAGE_KEY = "gapsan_cookie_prefs_v1";

const DEFAULT_COOKIE_PREFS: CookiePreferences = {
  necessary: true,
  analytics: false,
  advertising: false,
  decided: false,
};

const DEFAULT_CONSTRUCTION_SCOPE =
  "Gayrimenkul birimimiz bünyesinde konut ve ticari alan geliştirme, tadilat ve proje danışmanlığı faaliyetleri işletme onaylı kapsam dahilinde yürütülmektedir.";

const GapsanStoreContext = createContext<GapsanStoreContextValue | null>(null);

export function GapsanStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [previewMode, setPreviewMode] = useState<boolean>(true);
  const [slides, setSlides] = useState<HeroSlideConfig[]>(INITIAL_HERO_SLIDES);
  const [vehicles, setVehicles] = useState<VehicleListing[]>(
    INITIAL_VEHICLE_LISTINGS
  );
  const [realEstates, setRealEstates] = useState<RealEstateListing[]>(
    INITIAL_REAL_ESTATE_LISTINGS
  );
  const [projects, setProjects] = useState<ConstructionProject[]>(
    INITIAL_CONSTRUCTION_PROJECTS
  );
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [contact, setContact] = useState<ContactConfig>(CONTACT_CONFIG);
  const [constructionApprovedScope, setConstructionApprovedScope] =
    useState<string>(DEFAULT_CONSTRUCTION_SCOPE);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(
    DEFAULT_COOKIE_PREFS
  );
  const [cookieModalOpen, setCookieModalOpen] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.previewMode === "boolean")
          setPreviewMode(parsed.previewMode);
        if (Array.isArray(parsed.slides) && parsed.slides.length > 0)
          setSlides(parsed.slides);
        if (Array.isArray(parsed.vehicles)) setVehicles(parsed.vehicles);
        if (Array.isArray(parsed.realEstates))
          setRealEstates(parsed.realEstates);
        if (Array.isArray(parsed.projects)) setProjects(parsed.projects);
        if (Array.isArray(parsed.reviews)) setReviews(parsed.reviews);
        if (parsed.contact) setContact(parsed.contact);
        if (typeof parsed.constructionApprovedScope === "string")
          setConstructionApprovedScope(parsed.constructionApprovedScope);
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
      // ignore storage read errors
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          previewMode,
          slides,
          vehicles,
          realEstates,
          projects,
          reviews,
          contact,
          constructionApprovedScope,
        })
      );
    } catch {
      // ignore storage write errors
    }
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
    setPreviewMode(true);
    setSlides(INITIAL_HERO_SLIDES);
    setVehicles(INITIAL_VEHICLE_LISTINGS);
    setRealEstates(INITIAL_REAL_ESTATE_LISTINGS);
    setProjects(INITIAL_CONSTRUCTION_PROJECTS);
    setReviews(INITIAL_REVIEWS);
    setContact(CONTACT_CONFIG);
    setConstructionApprovedScope(DEFAULT_CONSTRUCTION_SCOPE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <GapsanStoreContext.Provider
      value={{
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
