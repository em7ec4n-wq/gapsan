import React from "react";
import type { Metadata } from "next";
import YonetimClient from "@/components/YonetimClient";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: {
    index: false,
    follow: false,
  },
};

export default function YonetimPage() {
  return <YonetimClient />;
}
