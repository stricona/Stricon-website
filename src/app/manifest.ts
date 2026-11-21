import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.legalName,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F6F1",
    theme_color: "#494B98",
    icons: [
      {
        src: "/images/logo/symbol.jpg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
