import { NavigationConfig } from "@/types/navigation";
import { hasGalleryPhotos } from "@/lib/gallery";

export function getMainNav() {
  if (hasGalleryPhotos()) {
    return [
      { title: "Home", href: "/" },
      { title: "About", href: "/about" },
      { title: "Services", href: "/services" },
      { title: "Gallery", href: "/gallery" },
      { title: "Careers", href: "/careers" },
      { title: "Contact", href: "/contact" },
    ];
  }
  return [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Services", href: "/services" },
    { title: "Careers", href: "/careers" },
    { title: "Contact", href: "/contact" },
  ];
}

export const navigation: NavigationConfig = {
  get mainNav() {
    return getMainNav();
  },
  cta: {
    title: "Get a Quote",
    href: "/contact",
  },
};
