import type { MetadataRoute } from "next";
import { kits } from "@/data/kits";

const SITE_URL = "https://rashidmegamartv0-1.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/shop`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/kits`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-and-conditions`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const kitPages: MetadataRoute.Sitemap = kits
    .filter((kit) => kit.isAvailable)
    .map((kit) => ({
      url: `${SITE_URL}/kits/${encodeURIComponent(kit.id)}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...publicPages, ...kitPages];
}
