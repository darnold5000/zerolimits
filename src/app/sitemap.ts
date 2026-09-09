import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

const routes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/our-facilities", changeFrequency: "monthly", priority: 0.9 },
  { path: "/our-coaches", changeFrequency: "monthly", priority: 0.8 },
  { path: "/schedule-training", changeFrequency: "weekly", priority: 0.9 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE.url}${path}`,
    changeFrequency,
    priority,
  }));
}
