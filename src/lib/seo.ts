import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export interface ConstructMetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function constructMetadata({
  title,
  description,
  path = "",
  image,
}: ConstructMetadataOptions): Metadata {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const canonicalUrl = `${siteConfig.url}${cleanPath}`;
  const ogImageUrl = image || `${siteConfig.url}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImageUrl],
    },
  };
}
