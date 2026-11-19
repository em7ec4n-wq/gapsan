import React, { Suspense } from "react";
import type { Metadata } from "next";
import HeroSlider from "@/components/HeroSlider";
import RequestBuilder from "@/components/RequestBuilder";
import {
  ActivityAreasSection,
  FaqSection,
  FeaturedListingSection,
  HowItWorksSection,
  ListingGuideSection,
  ReachGapsanSection,
  ReviewsSection,
  ServiceShowcaseSection,
} from "@/components/HomeSections";

export const metadata: Metadata = {
  title: "GAPSAN Şirketler Grubu | Otomotiv, Gayrimenkul ve Sigorta",
  description:
    "Esenyurt, İstanbul merkezli GAPSAN Şirketler Grubu ile araç alım-satım ve takas, satılık-kiralık gayrimenkul ve sigorta taleplerinizi hızlıca oluşturun.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: ["/assets/gapsan/gapsan-og-genel.webp"],
  },
};

export default function HomePage() {
  return (
    <div>
      <HeroSlider />

      <Suspense
        fallback={
          <div className="gapsan-container py-10">
            <div className="bg-white border border-[#E0E4EA] rounded-[10px] p-8 h-[280px]" />
          </div>
        }
      >
        <RequestBuilder />
      </Suspense>

      <ActivityAreasSection />
      <ListingGuideSection />
      <FeaturedListingSection />
      <ServiceShowcaseSection />
      <HowItWorksSection />
      <ReviewsSection />
      <FaqSection />
      <ReachGapsanSection />
    </div>
  );
}
