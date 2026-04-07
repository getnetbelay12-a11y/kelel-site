import type { MetadataRoute } from "next";

const baseUrl = "https://kelelitsolution.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/services", "/work", "/about", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
