import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kelel IT Solution",
    short_name: "Kelel IT",
    description:
      "Kelel IT Solution helps organizations modernize operations, strengthen digital infrastructure, and launch dependable software and web platforms.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3efe7",
    theme_color: "#1d4b42",
    icons: [
      {
        src: "/icon.jpg",
        sizes: "384x384",
        type: "image/jpeg",
      },
      {
        src: "/apple-icon.jpg",
        sizes: "384x384",
        type: "image/jpeg",
      },
    ],
  };
}
