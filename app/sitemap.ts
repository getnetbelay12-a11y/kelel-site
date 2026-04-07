import type { MetadataRoute } from "next";

const baseUrl = "https://kelelitsolution.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/services", "/platforms", "/work", "/about", "/contact", "/resources", "/trust"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
