import { Client } from "@/types/client";

/**
 * CLIENT DATA NOTE:
 * Do not render clients anywhere until displayApproved is true AND a logo file exists.
 * Spellings to be verified by stakeholder.
 */
export const clients: Client[] = [
  { name: "Syneos Health", logo: null, displayApproved: false },
  { name: "Sub-K", logo: null, displayApproved: false },
  { name: "ZLTECH", logo: null, displayApproved: false },
  { name: "Intouch CX", logo: null, displayApproved: false },
  { name: "Head Digital Works", logo: null, displayApproved: false },
  { name: "Diebold Nixdorf", logo: null, displayApproved: false },
  { name: "Maphar Constructions Pvt Ltd", logo: null, displayApproved: false },
  { name: "MarketTools", logo: null, displayApproved: false },
  { name: "Hilton Hotels & Resorts", logo: null, displayApproved: false },
  { name: "Mann India Technologies", logo: null, displayApproved: false },
  { name: "Total Environment", logo: null, displayApproved: false },
  { name: "TechProjects", logo: null, displayApproved: false },
  { name: "Lyric", logo: null, displayApproved: false },
  { name: "Oteemo", logo: null, displayApproved: false },
  { name: "Beghou", logo: null, displayApproved: false },
  { name: "Pon Pure Chemicals", logo: null, displayApproved: false },
  { name: "Crown Brewing", logo: null, displayApproved: false },
  { name: "Bharathi Cement", logo: null, displayApproved: false },
];

/**
 * Approved sentence permitted for later use regarding industry deployments
 */
export const approvedDeploymentSentence =
  "We have well-trained personnel deployed at healthcare centres, IT, ITES, hotels, commercial, manufacturing and large residential apartments and villa complexes in Hyderabad.";
