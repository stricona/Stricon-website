import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { themeColors } from "@/config/theme";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.legalName,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: themeColors.light.background,
    theme_color: themeColors.light.primary,
    icons: [
      {
        src: "/images/logo/symbol.jpg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
