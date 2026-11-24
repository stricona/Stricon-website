import { Client } from "@/types/client";

/**
 * CLIENT DATA:
 * Logos extracted from slide 7 of STRICON_Profile.pptx.
 * Crown Brewing is kept as displayApproved: false until confirmed by user.
 */
export const clients: Client[] = [
  {
    name: "Syneos Health",
    logo: "/images/clients/syneos-health.png",
    displayApproved: true,
  },
  {
    name: "Sub-K",
    logo: "/images/clients/sub-k.png",
    displayApproved: true,
  },
  {
    name: "ZLTECH",
    logo: "/images/clients/zltech.png",
    displayApproved: true,
  },
  {
    name: "Intouch CX",
    logo: "/images/clients/intouch-cx.png",
    displayApproved: true,
  },
  {
    name: "Head Digital Works",
    logo: "/images/clients/head-digital-works.png",
    displayApproved: true,
  },
  {
    name: "Diebold Nixdorf",
    logo: "/images/clients/diebold-nixdorf.png",
    displayApproved: true,
  },
  {
    name: "Maphar Constructions",
    logo: "/images/clients/maphar-constructions.png",
    displayApproved: true,
  },
  {
    name: "MarketTools",
    logo: "/images/clients/market-tools.png",
    displayApproved: true,
  },
  {
    name: "Hilton Hotels & Resorts",
    logo: "/images/clients/hilton-hotels-and-resorts.png",
    displayApproved: true,
  },
  {
    name: "Mann India Technologies",
    logo: "/images/clients/mann-india-technologies.png",
    displayApproved: true,
  },
  {
    name: "Total Environment",
    logo: "/images/clients/total-environment.png",
    displayApproved: true,
  },
  {
    name: "TechProjects",
    logo: "/images/clients/tech-projects.png",
    displayApproved: true,
  },
  {
    name: "Lyric",
    logo: "/images/clients/lyric.png",
    displayApproved: true,
  },
  {
    name: "Oteemo",
    logo: "/images/clients/oteemo.png",
    displayApproved: true,
  },
  {
    name: "Beghou",
    logo: "/images/clients/beghou.png",
    displayApproved: true,
  },
  {
    name: "Pon Pure Chemicals",
    logo: "/images/clients/pon-pure-chemicals.png",
    displayApproved: true,
  },
  {
    name: "Crown Brewing",
    logo: "/images/clients/crown-brewing.png",
    displayApproved: false, // Pending explicit confirmation
  },
  {
    name: "Bharathi Cement",
    logo: "/images/clients/bharathi-cement.png",
    displayApproved: true,
  },
];

/**
 * Approved sentence permitted for use regarding industry deployments
 */
export const approvedDeploymentSentence =
  "We have well-trained personnel deployed at Health care centers, IT, ITES, Hotels, Commercial, Manufacturing and large residential apartments and villa complexes in Hyderabad.";
