export interface HomeContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    trustChips: string[];
    founderLine: string;
    ctaPrimary: {
      label: string;
      href: string;
    };
    ctaSecondary: {
      label: string;
      href: string;
    };
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    ctaPrimary: {
      label: string;
      href: string;
    };
    ctaSecondary: {
      label: string;
      href: string;
    };
  };
}

export const homeContent: HomeContent = {
  hero: {
    eyebrow: "Facility Management & Security Services",
    title: "Professional Security & Facility Management Services in Hyderabad",
    description:
      "Integrated facility management, trained security personnel, and mechanised cleaning solutions delivered with operational discipline and full statutory compliance.",
    trustChips: [
      "PSARA Licensed Provider",
      "Self-Delivery Model",
      "Trained In-House Teams",
      "100% Statutory Compliance",
    ],
    founderLine:
      "Led by Managing Director R Vishnu Murthy, a veteran with deep domain experience in facility management and security operations.",
    ctaPrimary: {
      label: "Get a Quote",
      href: "/contact",
    },
    ctaSecondary: {
      label: "Explore Services",
      href: "/services",
    },
  },
  finalCta: {
    eyebrow: "Partner with STRICON",
    title: "Ready to Upgrade Your Facility & Security Operations?",
    description:
      "Connect with our leadership team for a site assessment, bundled services evaluation, and a transparent commercial proposal tailored to your facility.",
    ctaPrimary: {
      label: "Request a Proposal",
      href: "/contact",
    },
    ctaSecondary: {
      label: "Enquire on WhatsApp",
      href: "#whatsapp", // will use whatsappUrl helper
    },
  },
};
