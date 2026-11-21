export interface Industry {
  name: string;
  slug: string;
  location: string;
}

export const industries: Industry[] = [
  { name: "Healthcare centres", slug: "healthcare-centres", location: "Hyderabad" },
  { name: "IT", slug: "it", location: "Hyderabad" },
  { name: "ITES", slug: "ites", location: "Hyderabad" },
  { name: "Hotels", slug: "hotels", location: "Hyderabad" },
  { name: "Commercial", slug: "commercial", location: "Hyderabad" },
  { name: "Manufacturing", slug: "manufacturing", location: "Hyderabad" },
  { name: "Large residential apartments and villa complexes", slug: "residential-apartments-villas", location: "Hyderabad" },
];

export const industriesStatement =
  "We have well-trained personnel deployed at healthcare centres, IT, ITES, hotels, commercial, manufacturing and large residential apartments and villa complexes in Hyderabad.";
