import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/gapsan-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/otomotiv",
    "/gayrimenkul",
    "/gayrimenkul/satilik",
    "/gayrimenkul/kiralik",
    "/gayrimenkul/projeler",
    "/sigorta",
    "/kurumsal",
    "/kurumsal/galeri",
    "/kurumsal/yorum-dogrulama",
    "/iletisim",
    "/yasal-bilgilendirme",
    "/kvkk-aydinlatma",
    "/cerez-politikasi",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date("2026-11-19"),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
