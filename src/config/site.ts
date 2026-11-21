import { company } from "@/data/company";
import { navigation } from "@/data/navigation";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.stricon.in";

export const phoneHref = `tel:+91${company.contact.phone}`;
export const whatsappUrl = `https://wa.me/91${company.contact.whatsapp}?text=${encodeURIComponent(
  "Hello STRICON, I would like to enquire about your services."
)}`;

export const siteConfig = {
  name: company.brandName,
  legalName: company.legalName,
  description: company.description,
  url: siteUrl,
  ogImage: `${siteUrl}/images/logo/emblem.jpg`,
  locale: "en-IN",
  phoneHref,
  whatsappUrl,
  links: {
    website: company.contact.website,
    email: company.contact.email,
    phone: company.contact.phone,
    phoneDisplay: company.contact.phoneDisplay,
    whatsapp: company.contact.whatsapp,
    whatsappDisplay: company.contact.whatsappDisplay,
  },
  address: company.registeredOffice.fullAddress,
  workingHours: company.workingHours.display,
  mainNav: navigation.mainNav,
  cta: navigation.cta,
};

export type SiteConfig = typeof siteConfig;
