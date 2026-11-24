export interface Industry {
  name: string;
  slug: string;
  location: string;
}

export const industries: Industry[] = [
  { name: "Health care centers", slug: "health-care-centers", location: "Hyderabad" },
  { name: "IT", slug: "it", location: "Hyderabad" },
  { name: "ITES", slug: "ites", location: "Hyderabad" },
  { name: "Hotels", slug: "hotels", location: "Hyderabad" },
  { name: "Commercial", slug: "commercial", location: "Hyderabad" },
  { name: "Manufacturing", slug: "manufacturing", location: "Hyderabad" },
  {
    name: "Large residential apartments and villa complexes",
    slug: "residential-apartments-villas",
    location: "Hyderabad",
  },
];

export const industriesStatement =
  "We have well-trained personnel deployed at Health care centers, IT, ITES, Hotels, Commercial, Manufacturing and large residential apartments and villa complexes in Hyderabad.";
