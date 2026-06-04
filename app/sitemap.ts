import type { MetadataRoute } from "next";
import { seoPages } from "@/lib/seo-pages";

const baseUrl = "https://www.kelelitsolution.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/services",
    "/work",
    "/about",
    "/contact",
    "/request-proposal",
    "/privacy",
    "/terms",
  ];
  const paths = [...staticPaths, ...seoPages.map((page) => page.path)];

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
