import { NavigationConfig } from "@/types/navigation";

export const navigation: NavigationConfig = {
  mainNav: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Services", href: "/services" },
    { title: "Careers", href: "/careers" },
    { title: "Contact", href: "/contact" },
  ],
  cta: {
    title: "Get a Quote",
    href: "/contact",
  },
};
