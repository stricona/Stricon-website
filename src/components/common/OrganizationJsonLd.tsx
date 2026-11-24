import { company } from "@/data/company";

export function OrganizationJsonLd() {
  const baseUrl = company.contact.website || "https://www.stricon.in";
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: company.legalName,
    alternateName: company.brandName,
    url: company.contact.website,
    logo: `${company.contact.website}/images/logo/emblem.jpg`,
    foundingDate: company.establishedYear.toString(),
    founder: {
      "@type": "Person",
      name: company.founder.name,
      jobTitle: company.founder.role,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: company.registeredOffice.addressLine,
      addressLocality: company.registeredOffice.city,
      addressRegion: company.registeredOffice.state,
      postalCode: company.registeredOffice.pincode,
      addressCountry: "IN",
    },
    telephone: company.contact.phoneDisplay,
    email: company.contact.email,
    areaServed: {
      "@type": "City",
      name: "Hyderabad",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
